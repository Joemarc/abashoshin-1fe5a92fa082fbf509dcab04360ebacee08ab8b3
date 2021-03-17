import {
  GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS,
  UPDATE_ME_SUCCESS,
  UPDATE_PHONE_AND_NOTIFICATIONS_FAILURE,
  UPDATE_PHONE_AND_NOTIFICATIONS_REQUEST,
  UPDATE_PHONE_AND_NOTIFICATIONS_SUCCESS
} from '../../actions';

const initialState = {
  user: null,
  isLoading: false,
  error: null
};

export default function(state = initialState, action) {
  let reducer;
  switch(action.type) {
    case GET_USER_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case GET_USER_SUCCESS:
      reducer = {
        ...state,
        isLoading: false,
        user: action.payload
      };
      break;
    case GET_USER_FAILURE:
      reducer = {
        ...state,
        isLoading: false,
        error: action.payload
      };
      break;
    case UPDATE_ME_SUCCESS: {
      const user = Object.assign(state.user, action.payload);
      reducer = {
        ...state,
        user,
        error: action.payload
      };
      break;
    }
    case UPDATE_PHONE_AND_NOTIFICATIONS_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case UPDATE_PHONE_AND_NOTIFICATIONS_SUCCESS:
      reducer = {
        ...state,
        isLoading: false
      };
      break;
    case UPDATE_PHONE_AND_NOTIFICATIONS_FAILURE:
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
