import { useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import subsonic from '../subsonic'
import {
  loadRecommendations,
  setRecommendationsLoading,
} from '../actions/recommendations'

const MAX_RECOMMENDATIONS = 20
const MIN_RECOMMENDATIONS = 5
const SIMILAR_SONGS_COUNT = 50
const TOP_SONGS_COUNT = 30
const RANDOM_SONGS_COUNT = 40

const unwrap = (response) => {
  const data = response.json?.['subsonic-response']
  if (!data) {
    throw new Error('Invalid Subsonic response: missing subsonic-response')
  }
  if (data.status !== 'ok') {
    throw new Error(
      `Subsonic error: ${data.error?.message || 'Unknown'} (Code: ${data.error?.code || '?'})`,
    )
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
    if (song.artist && song.artist === currentSong.artist) {
      score += 5
    }
  }

  if (song.starred) {
    score += 20
  }
  if (song.playCount > 0) {
    score += Math.min(song.playCount, 10) * 2
  }
  if (song.rating && song.rating > 0) {
    score += song.rating * 3
  }

  return score
}

const sortByRelevance = (songs, currentSong) => {
  return [...songs]
    .map((song) => ({ song, score: scoreSong(song, currentSong) }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.song)
}

const shuffleTopPortion = (songs, portion = 0.6) => {
  if (songs.length <= MIN_RECOMMENDATIONS) return songs
  const cutoff = Math.floor(songs.length * portion)
  const topPortion = shuffleArray(songs.slice(0, cutoff))
  const rest = songs.slice(cutoff)
  return [...topPortion, ...rest]
}

const validateSong = (song) => {
  if (!song || !song.id) return false
  if (!song.title) return false
  return true
}

const useRecommendations = () => {
  const dispatch = useDispatch()
  const currentTrack = useSelector((state) => state.player.current)
  const refreshCounter = useSelector((state) => state.recommendations?.refreshCounter || 0)
  const prevTrackIdRef = useRef(null)
  const fetchTimeoutRef = useRef(null)
  const currentSongRef = useRef(null)
  const lastRefreshFetchedRef = useRef(0)

  currentSongRef.current = currentTrack?.song || null

  const fetchRecommendationsForSong = useCallback(
    async (songId, song) => {
      if (!songId) return

      dispatch(setRecommendationsLoading(true))

      let songs = []

      try {
        const response = await subsonic.getSimilarSongs2(songId, SIMILAR_SONGS_COUNT)
        const data = unwrap(response)
        songs = data.similarSongs2?.song || []
      } catch (e) {
        console.warn('[Recommendations] getSimilarSongs2 failed:', e.message)
      }

      if (songs.length < MIN_RECOMMENDATIONS && song?.artist) {
        try {
          const topResponse = await subsonic.getTopSongs(song.artist, TOP_SONGS_COUNT)
          const topData = unwrap(topResponse)
          const topSongs = topData.topSongs?.song || []
          songs = [...songs, ...topSongs]
        } catch (e) {
          console.warn('[Recommendations] getTopSongs failed:', e.message)
        }
      }

      if (songs.length < MIN_RECOMMENDATIONS) {
        try {
          if (song?.genre) {
            const response = await subsonic.getRandomSongs(RANDOM_SONGS_COUNT, song.genre)
            const data = unwrap(response)
            const randomSongs = data.randomSongs?.song || []
            songs = [...songs, ...randomSongs]
          }
        } catch (e) {
          console.warn('[Recommendations] getRandomSongs(genre) failed:', e.message)
        }
      }

      if (songs.length < MIN_RECOMMENDATIONS) {
        try {
          const response = await subsonic.getRandomSongs(RANDOM_SONGS_COUNT)
          const data = unwrap(response)
          const randomSongs = data.randomSongs?.song || []
          songs = [...songs, ...randomSongs]
        } catch (e) {
          console.warn('[Recommendations] getRandomSongs failed:', e.message)
        }
      }

      if (songs.length < MIN_RECOMMENDATIONS) {
        try {
          const response = await subsonic.getStarred2()
          const data = unwrap(response)
          const starredSongs = data.starred2?.song || []
          songs = [...songs, ...shuffleArray(starredSongs).slice(0, RANDOM_SONGS_COUNT)]
        } catch (e) {
          console.warn('[Recommendations] getStarred2 failed:', e.message)
        }
      }

      songs = deduplicateById(songs)

      songs = songs.filter((s) => s.id !== songId)

      songs = songs.filter(validateSong)

      const currentSong = currentSongRef.current
      songs = sortByRelevance(songs, currentSong)

      songs = shuffleTopPortion(songs)

      songs = songs.slice(0, MAX_RECOMMENDATIONS)

      songs = songs.map(mapReplayGain)

      if (songs.length === 0) {
        console.warn('[Recommendations] No valid recommendations found for', songId)
      }

      dispatch(loadRecommendations(songs, songId))
    },
    [dispatch],
  )

  useEffect(() => {
    const trackId = currentTrack?.trackId
    const isRadio = currentTrack?.isRadio

    if (trackId && !isRadio && trackId !== prevTrackIdRef.current) {
      prevTrackIdRef.current = trackId

      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current)
      }

      const song = currentTrack?.song || null
      fetchTimeoutRef.current = setTimeout(() => {
        fetchRecommendationsForSong(trackId, song).catch((err) => {
          console.error('[Recommendations] Fetch failed:', err)
          dispatch(loadRecommendations([], trackId))
        })
      }, 1200)
    }

    if (!trackId) {
      prevTrackIdRef.current = null
    }

    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current)
      }
    }
  }, [currentTrack?.trackId, currentTrack?.isRadio, fetchRecommendationsForSong])

  useEffect(() => {
    if (refreshCounter <= 0) return
    if (refreshCounter === lastRefreshFetchedRef.current) return

    lastRefreshFetchedRef.current = refreshCounter

    const trackId = currentTrack?.trackId
    if (!trackId) return

    const song = currentTrack?.song || null
    fetchRecommendationsForSong(trackId, song).catch((err) => {
      console.error('[Recommendations] Refresh failed:', err)
      dispatch(loadRecommendations([], trackId))
    })
  }, [refreshCounter, currentTrack?.trackId, currentTrack?.song, fetchRecommendationsForSong, dispatch])

  return {
    fetchRecommendations: fetchRecommendationsForSong,
  }
}

export default useRecommendations
