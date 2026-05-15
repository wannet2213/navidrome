import { useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import subsonic from '../subsonic'
import {
  loadRecommendations,
  clearRecommendations,
  setRecommendationsLoading,
  showRecommendations,
} from '../actions/recommendations'
import { addTracks, playTracks } from '../actions'

const MAX_RECOMMENDATIONS = 20

const useRecommendations = () => {
  const dispatch = useDispatch()
  const playerState = useSelector((state) => state.player)
  const recommendations = useSelector((state) => state.recommendations)
  const currentTrack = playerState.current
  const prevTrackIdRef = useRef(null)
  const fetchTimeoutRef = useRef(null)

  const fetchSimilarSongs = useCallback(
    async (songId) => {
      if (!songId) return
      dispatch(setRecommendationsLoading(true))
      try {
        const response = await subsonic.getSimilarSongs2(songId, MAX_RECOMMENDATIONS)
        const data = response.json
        let songs = data?.similarSongs2?.song || data?.similarSongs?.song || []

        if (songs.length === 0 && currentTrack?.song?.artist) {
          const topResponse = await subsonic.getTopSongs(currentTrack.song.artist, MAX_RECOMMENDATIONS)
          const topData = topResponse.json
          songs = topData?.topSongs?.song || []
        }

        songs = songs.filter((s) => s.id !== songId)
        dispatch(loadRecommendations(songs, songId))
      } catch (e) {
        console.error('Failed to fetch recommendations:', e)
        dispatch(setRecommendationsLoading(false))
      }
    },
    [dispatch, currentTrack],
  )

  useEffect(() => {
    const trackId = currentTrack?.trackId
    if (
      trackId &&
      !currentTrack?.isRadio &&
      trackId !== prevTrackIdRef.current
    ) {
      prevTrackIdRef.current = trackId
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current)
      }
      fetchTimeoutRef.current = setTimeout(() => {
        fetchSimilarSongs(trackId)
      }, 1500)
    }

    if (!trackId) {
      prevTrackIdRef.current = null
    }

    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current)
      }
    }
  }, [currentTrack?.trackId, currentTrack?.isRadio, fetchSimilarSongs])

  const playRecommended = useCallback(
    (song) => {
      const data = { [song.id]: song }
      dispatch(playTracks(data, [song.id], song.id))
    },
    [dispatch],
  )

  const addRecommendedToQueue = useCallback(
    (song) => {
      const data = { [song.id]: song }
      dispatch(addTracks(data, [song.id]))
    },
    [dispatch],
  )

  const playFirstRecommendation = useCallback(() => {
    if (recommendations?.songs?.length > 0 && recommendations.autoplay) {
      const first = recommendations.songs[0]
      playRecommended(first)
    }
  }, [recommendations, playRecommended])

  return {
    recommendations,
    playRecommended,
    addRecommendedToQueue,
    playFirstRecommendation,
    fetchSimilarSongs,
  }
}

export default useRecommendations
