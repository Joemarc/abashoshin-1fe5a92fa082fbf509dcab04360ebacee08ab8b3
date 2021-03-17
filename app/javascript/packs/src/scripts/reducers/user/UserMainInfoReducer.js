import {
  GET_MAIN_INFO_REQUEST, GET_MAIN_INFO_SUCCESS, GET_MAIN_INFO_FAILURE
} from '../../actions';

const initialState = {
  isLoading: false,
  info: null,
  error: null
};

export default function(state = initialState, action) {
  let reducer;

  switch(action.type) {
    case GET_MAIN_INFO_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case GET_MAIN_INFO_SUCCESS:
      reducer = {
        ...state,
        isLoading: false,
        info: action.payload
      };
      break;
    case GET_MAIN_INFO_FAILURE:
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
