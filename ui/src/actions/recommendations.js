export const RECOMMENDATIONS_LOAD = 'RECOMMENDATIONS_LOAD'
export const RECOMMENDATIONS_CLEAR = 'RECOMMENDATIONS_CLEAR'
export const RECOMMENDATIONS_SET_AUTOPLAY = 'RECOMMENDATIONS_SET_AUTOPLAY'
export const RECOMMENDATIONS_SET_LOADING = 'RECOMMENDATIONS_SET_LOADING'
export const RECOMMENDATIONS_HIDE = 'RECOMMENDATIONS_HIDE'
export const RECOMMENDATIONS_SHOW = 'RECOMMENDATIONS_SHOW'
export const RECOMMENDATIONS_REFRESH = 'RECOMMENDATIONS_REFRESH'

export const loadRecommendations = (songs, sourceTrackId) => ({
  type: RECOMMENDATIONS_LOAD,
  data: { songs, sourceTrackId },
})

export const clearRecommendations = () => ({
  type: RECOMMENDATIONS_CLEAR,
})

export const setAutoplayRecommendations = (enabled) => ({
  type: RECOMMENDATIONS_SET_AUTOPLAY,
  data: { enabled },
})

export const setRecommendationsLoading = (loading) => ({
  type: RECOMMENDATIONS_SET_LOADING,
  data: { loading },
})

export const hideRecommendations = () => ({
  type: RECOMMENDATIONS_HIDE,
})

export const showRecommendations = () => ({
  type: RECOMMENDATIONS_SHOW,
})

export const refreshRecommendations = () => ({
  type: RECOMMENDATIONS_REFRESH,
})
