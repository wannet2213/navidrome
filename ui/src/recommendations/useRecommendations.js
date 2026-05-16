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
const REFILL_THRESHOLD = 10
const SIMILAR_SONGS_COUNT = 20
const TOP_SONGS_COUNT = 15
const RANDOM_SONGS_COUNT = 15
const INITIAL_DEBOUNCE_MS = 400
const REFILL_DEBOUNCE_MS = 200

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

const scoreSong = (song, currentSong) => {
  let score = 0
  if (currentSong) {
    if (song.genre && currentSong.genre && song.genre === currentSong.genre) {
      score += 30
    }
    if (song.artistId && song.artistId === currentSong.artistId) {
      score -= 50
    }
    if (song.albumId && song.albumId === currentSong.albumId) {
      score -= 80
    }
  }
  if (song.starred) score += 20
  if (song.playCount > 0) score += Math.min(song.playCount, 10) * 2
  if (song.rating && song.rating > 0) score += song.rating * 3
  return score
}

const sortByRelevance = (songs, currentSong) => {
  return [...songs]
    .map((song) => ({ song, score: scoreSong(song, currentSong) }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.song)
}

const shuffleTopPortion = (songs) => {
  if (songs.length <= DISPLAY_LIMIT) return songs
  const cutoff = Math.floor(songs.length * 0.6)
  const topPortion = shuffleArray(songs.slice(0, cutoff))
  const rest = songs.slice(cutoff)
  return [...topPortion, ...rest]
}

const processSongs = (songs, songId, currentSong) => {
  songs = deduplicateById(songs)
  songs = songs.filter((s) => s.id !== songId)
  songs = songs.filter(validateSong)
  songs = sortByRelevance(songs, currentSong)
  songs = shuffleTopPortion(songs)
  songs = songs.slice(0, POOL_SIZE)
  songs = songs.map(mapReplayGain)
  return songs
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
  const refreshCounter = useSelector(
    (state) => state.recommendations?.refreshCounter || 0,
  )
  const poolLength = useSelector(
    (state) => state.recommendations?.songs?.length || 0,
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

  const fetchAndLoad = useCallback(
    async (songId, song) => {
      if (!songId) return
      dispatch(setRecommendationsLoading(true))
      try {
        const raw = await fetchSongBatch(songId, song)
        const processed = processSongs(raw, songId, currentSongRef.current)
        dispatch(loadRecommendations(processed, songId))
      } catch {
        dispatch(loadRecommendations([], songId))
      }
    },
    [dispatch],
  )

  const fetchAndAppend = useCallback(
    async (songId, song, existingCount) => {
      if (!songId || isRefillingRef.current) return
      isRefillingRef.current = true
      try {
        const raw = await fetchSongBatch(songId, song)
        const needed = POOL_SIZE - existingCount
        const processed = processSongs(raw, songId, currentSongRef.current)
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
    if (poolLength === 0 || poolLength >= REFILL_THRESHOLD) return
    if (isRefillingRef.current) return
    if (!trackId) return
    if (refillTimeoutRef.current) clearTimeout(refillTimeoutRef.current)
    const song = currentSong
    refillTimeoutRef.current = setTimeout(() => {
      fetchAndAppend(trackId, song, poolLength)
    }, REFILL_DEBOUNCE_MS)
    return () => {
      if (refillTimeoutRef.current) clearTimeout(refillTimeoutRef.current)
    }
  }, [poolLength, trackId, currentSong, fetchAndAppend])

  return {
    fetchRecommendations: fetchAndLoad,
  }
}

export default useRecommendations
