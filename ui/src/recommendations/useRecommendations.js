import { useEffect, useRef, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import subsonic from '../subsonic'
import {
  loadRecommendations,
  appendRecommendations,
  setRecommendationsLoading,
} from '../actions/recommendations'

const POOL_SIZE = 14
const DISPLAY_LIMIT = 7
const SIMILAR_SONGS_COUNT = 20
const TOP_SONGS_COUNT = 15
const RANDOM_SONGS_COUNT = 15
const INITIAL_DEBOUNCE_MS = 400
const REFILL_DEBOUNCE_MS = 100

const unwrap = (response) => {
  const data = response.json?.['subsonic-response']
  if (!data) {
    throw new Error('Invalid Subsonic response')
  }
  if (data.status !== 'ok') {
    throw new Error(`Subsonic error: ${data.error?.message || 'Unknown'}`)
  }
  return data
}

const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = temp
  }
  return shuffled
}

const mapReplayGain = (song) => {
  const { replayGain: rg } = song
  if (!rg) return song
  return {
    ...song,
    ...(rg.albumGain !== undefined && { rgAlbumGain: rg.albumGain }),
    ...(rg.albumPeak !== undefined && { rgAlbumPeak: rg.albumPeak }),
    ...(rg.trackGain !== undefined && { rgTrackGain: rg.trackGain }),
    ...(rg.trackPeak !== undefined && { rgTrackPeak: rg.trackPeak }),
  }
}

const deduplicateById = (songs) => {
  const seen = new Set()
  return songs.filter((s) => {
    if (seen.has(s.id)) return false
    seen.add(s.id)
    return true
  })
}

const validateSong = (song) => {
  if (!song || !song.id || !song.title) return false
  return true
}

const processSongs = (songs, songId, excludeIds) => {
  songs = deduplicateById(songs)
  songs = songs.filter((s) => s.id !== songId)
  songs = songs.filter(validateSong)
  if (excludeIds) {
    songs = songs.filter((s) => !excludeIds.has(s.id))
  }
  songs = shuffleArray(songs)
  songs = songs.slice(0, POOL_SIZE)
  songs = songs.map(mapReplayGain)
  return songs
}

const processSongsForRefill = (songs, songId, excludeIds) => {
  songs = songs.filter((s) => s.id !== songId)
  songs = songs.filter(validateSong)
  songs = songs.filter((s) => !excludeIds.has(s.id))
  songs = shuffleArray(songs)
  return songs.map(mapReplayGain)
}

const fetchSongBatch = async (songId, song) => {
  let songs = []

  try {
    const response = await subsonic.getSimilarSongs2(
      songId,
      SIMILAR_SONGS_COUNT,
    )
    const data = unwrap(response)
    songs = data.similarSongs2?.song || []
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[Rec] getSimilarSongs2:', e.message)
  }

  if (songs.length < POOL_SIZE && song?.artist) {
    try {
      const resp = await subsonic.getTopSongs(song.artist, TOP_SONGS_COUNT)
      const d = unwrap(resp)
      songs = [...songs, ...(d.topSongs?.song || [])]
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[Rec] getTopSongs:', e.message)
    }
  }

  if (songs.length < POOL_SIZE && song?.genre) {
    try {
      const resp = await subsonic.getRandomSongs(RANDOM_SONGS_COUNT, song.genre)
      const d = unwrap(resp)
      songs = [...songs, ...(d.randomSongs?.song || [])]
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[Rec] getRandomSongs(genre):', e.message)
    }
  }

  if (songs.length < POOL_SIZE) {
    try {
      const resp = await subsonic.getRandomSongs(RANDOM_SONGS_COUNT)
      const d = unwrap(resp)
      songs = [...songs, ...(d.randomSongs?.song || [])]
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[Rec] getRandomSongs:', e.message)
    }
  }

  if (songs.length < DISPLAY_LIMIT) {
    try {
      const resp = await subsonic.getStarred2()
      const d = unwrap(resp)
      const starred = d.starred2?.song || []
      songs = [...songs, ...shuffleArray(starred).slice(0, RANDOM_SONGS_COUNT)]
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[Rec] getStarred2:', e.message)
    }
  }

  return songs
}

const useRecommendations = () => {
  const dispatch = useDispatch()
  const currentTrack = useSelector((state) => state.player.current)
  const playerQueue = useSelector((state) => state.player.queue)
  const refreshCounter = useSelector(
    (state) => state.recommendations?.refreshCounter || 0,
  )
  const poolLength = useSelector(
    (state) => state.recommendations?.songs?.length || 0,
  )
  const poolSongIds = useSelector((state) =>
    (state.recommendations?.songs || []).map((s) => s.id),
  )

  const prevTrackIdRef = useRef(null)
  const fetchTimeoutRef = useRef(null)
  const currentSongRef = useRef(null)
  const lastRefreshFetchedRef = useRef(0)
  const isRefillingRef = useRef(false)
  const refillTimeoutRef = useRef(null)

  const trackId = currentTrack?.trackId
  const isRadio = currentTrack?.isRadio
  const currentSong = currentTrack?.song || null

  currentSongRef.current = currentSong

  const trackIdForRefresh = useMemo(
    () => currentTrack?.trackId,
    [currentTrack?.trackId],
  )
  const songForRefresh = useMemo(
    () => currentTrack?.song || null,
    [currentTrack?.song],
  )

  const queueIdSet = useMemo(() => {
    const set = new Set()
    const queue = playerQueue || []
    queue.forEach((item) => {
      const id = item.trackId || (item.song && item.song.id) || item.id
      if (id) set.add(id)
    })
    return set
  }, [playerQueue])

  const excludeIds = useMemo(() => {
    const set = new Set(queueIdSet)
    poolSongIds.forEach((id) => set.add(id))
    return set
  }, [queueIdSet, poolSongIds])

  const fetchAndLoad = useCallback(
    async (songId, song) => {
      if (!songId) return
      dispatch(setRecommendationsLoading(true))
      try {
        const raw = await fetchSongBatch(songId, song)
        const processed = processSongs(raw, songId, queueIdSet)
        dispatch(loadRecommendations(processed, songId))
      } catch {
        dispatch(loadRecommendations([], songId))
      }
    },
    [dispatch, queueIdSet],
  )

  const fetchAndAppend = useCallback(
    async (songId, song, currentExcludeIds, needed) => {
      if (!songId || isRefillingRef.current) return
      isRefillingRef.current = true
      try {
        const raw = await fetchSongBatch(songId, song)
        const processed = processSongsForRefill(raw, songId, currentExcludeIds)
        dispatch(appendRecommendations(processed.slice(0, needed)))
      } catch {
        // silent
      } finally {
        isRefillingRef.current = false
      }
    },
    [dispatch],
  )

  useEffect(() => {
    if (trackId && !isRadio && trackId !== prevTrackIdRef.current) {
      prevTrackIdRef.current = trackId
      if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current)
      const song = currentSong
      fetchTimeoutRef.current = setTimeout(() => {
        fetchAndLoad(trackId, song)
      }, INITIAL_DEBOUNCE_MS)
    }
    if (!trackId) {
      prevTrackIdRef.current = null
    }
    return () => {
      if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current)
    }
  }, [trackId, isRadio, currentSong, fetchAndLoad])

  useEffect(() => {
    if (refreshCounter <= 0) return
    if (refreshCounter === lastRefreshFetchedRef.current) return
    lastRefreshFetchedRef.current = refreshCounter
    if (!trackIdForRefresh) return
    fetchAndLoad(trackIdForRefresh, songForRefresh)
  }, [refreshCounter, trackIdForRefresh, songForRefresh, fetchAndLoad])

  useEffect(() => {
    if (poolLength >= POOL_SIZE) return
    if (isRefillingRef.current) return
    if (!trackId) return
    if (refillTimeoutRef.current) clearTimeout(refillTimeoutRef.current)
    const song = currentSong
    const needed = POOL_SIZE - poolLength
    refillTimeoutRef.current = setTimeout(() => {
      fetchAndAppend(trackId, song, excludeIds, needed)
    }, REFILL_DEBOUNCE_MS)
    return () => {
      if (refillTimeoutRef.current) clearTimeout(refillTimeoutRef.current)
    }
  }, [poolLength, trackId, currentSong, excludeIds, fetchAndAppend])

  return {
    fetchRecommendations: fetchAndLoad,
  }
}

export default useRecommendations
