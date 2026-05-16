import {
  RECOMMENDATIONS_LOAD,
  RECOMMENDATIONS_CLEAR,
  RECOMMENDATIONS_SET_AUTOPLAY,
  RECOMMENDATIONS_SET_LOADING,
  RECOMMENDATIONS_HIDE,
  RECOMMENDATIONS_SHOW,
  RECOMMENDATIONS_REFRESH,
  RECOMMENDATIONS_CONSUME,
  RECOMMENDATIONS_APPEND,
} from '../actions/recommendations'

const initialState = {
  songs: [],
  sourceTrackId: null,
  autoplay: true,
  loading: false,
  visible: false,
  refreshCounter: 0,
}

export const recommendationReducer = (
  previousState = initialState,
  { type, data },
) => {
  switch (type) {
    case RECOMMENDATIONS_LOAD:
      return {
        ...previousState,
        songs: data.songs,
        sourceTrackId: data.sourceTrackId,
        loading: false,
        visible: true,
      }
    case RECOMMENDATIONS_CLEAR:
      return {
        ...previousState,
        songs: [],
        sourceTrackId: null,
        loading: false,
        visible: false,
      }
    case RECOMMENDATIONS_SET_AUTOPLAY:
      return {
        ...previousState,
        autoplay: data.enabled,
      }
    case RECOMMENDATIONS_SET_LOADING:
      return {
        ...previousState,
        loading: data.loading,
      }
    case RECOMMENDATIONS_HIDE:
      return {
        ...previousState,
        visible: false,
      }
    case RECOMMENDATIONS_SHOW:
      return {
        ...previousState,
        visible: true,
      }
    case RECOMMENDATIONS_REFRESH:
      return {
        ...previousState,
        refreshCounter: previousState.refreshCounter + 1,
        loading: true,
      }
    case RECOMMENDATIONS_CONSUME:
      return {
        ...previousState,
        songs: previousState.songs.filter((s) => s.id !== data.songId),
      }
    case RECOMMENDATIONS_APPEND: {
      const existingIds = new Set(previousState.songs.map((s) => s.id))
      const newSongs = data.songs.filter((s) => !existingIds.has(s.id))
      return {
        ...previousState,
        songs: [...previousState.songs, ...newSongs],
        loading: false,
      }
    }
    default:
      return previousState
  }
}
