import {
  RECOMMENDATIONS_LOAD,
  RECOMMENDATIONS_CLEAR,
  RECOMMENDATIONS_SET_AUTOPLAY,
  RECOMMENDATIONS_SET_LOADING,
  RECOMMENDATIONS_HIDE,
  RECOMMENDATIONS_SHOW,
} from '../actions/recommendations'

const initialState = {
  songs: [],
  sourceTrackId: null,
  autoplay: true,
  loading: false,
  visible: false,
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
    default:
      return previousState
  }
}
