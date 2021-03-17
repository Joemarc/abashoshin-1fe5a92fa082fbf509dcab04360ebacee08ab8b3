import {
  GET_VIDEO_REQUEST, GET_VIDEO_SUCCESS, GET_VIDEO_FAILURE,
} from '../../actions';

const initialState = {
  video: null,
  isLoading: false,
  error: null
};

export default function(state = initialState, action) {
  let reducer;

  switch(action.type) {
    case GET_VIDEO_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case GET_VIDEO_SUCCESS:
      reducer = {
        ...state,
        video: action.payload,
        isLoading: false
      };
      break;
    case GET_VIDEO_FAILURE:
      reducer = {
        ...state,
        isLoading: false,
        error: action.payload
      };
      break;
    default:
      reducer = state;
  }
  return reducer;
}
