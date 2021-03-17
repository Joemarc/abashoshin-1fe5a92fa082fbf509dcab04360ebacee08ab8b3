import {
  SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE,
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
  SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE,
  OAUTH_CONNECT_REQUEST, OAUTH_CONNECT_SUCCESS, OAUTH_CONNECT_FAILURE
} from '../../actions';

const initialState = {
  isLoading: false,
  user: null,
  error: null
};

export default function(state = initialState, action) {
  let reducer;
  switch(action.type) {
    case SIGN_IN_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case SIGN_IN_SUCCESS:
      reducer = {
        ...state,
        isLoading: false,
        user: action.payload
      };
      break;
    case SIGN_IN_FAILURE:
      reducer = {
        ...state,
        isLoading: false,
        error: action.payload
      };
      break;
    case SIGN_UP_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case SIGN_UP_SUCCESS:
      reducer = {
        ...state,
        isLoading: false,
        user: action.payload
      };
      break;
    case SIGN_UP_FAILURE:
      reducer = {
        ...state,
        isLoading: false,
        error: action.payload
      };
      break;
    case SIGN_OUT_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case SIGN_OUT_SUCCESS:
      reducer = {
        ...state,
        isLoading: false
      };
      break;
    case SIGN_OUT_FAILURE:
      reducer = {
        ...state,
        isLoading: false,
        error: action.payload
      };
      break;
    case OAUTH_CONNECT_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case OAUTH_CONNECT_SUCCESS:
      reducer = {
        ...state,
        isLoading: false,
        user: action.payload
      };
      break;
    case OAUTH_CONNECT_FAILURE:
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
