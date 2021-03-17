import {
  GET_ME_FAILURE, GET_ME_REQUEST, GET_ME_SUCCESS,
  GET_USER_EDIT_REQUEST, GET_USER_EDIT_SUCCESS, GET_USER_EDIT_FAILURE,
  UPDATE_ME_REQUEST, UPDATE_ME_SUCCESS, UPDATE_ME_FAILURE,
  GET_USER_INFO_FOR_EDIT_REQUEST, GET_USER_INFO_FOR_EDIT_SUCCESS, GET_USER_INFO_FOR_EDIT_FAILURE
} from '../../actions';

const initialState = {
  isLoading: false,
  user: null,
  error: null,
  userEdit: null,
  isLoadingEdit: false,
  isLoadingUpdateMe: false,
  userInfo: null,
  isLoadingInfo: false
};

export default function(state = initialState, action) {
  let reducer;
  switch(action.type) {
    case GET_ME_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case GET_ME_SUCCESS:
      reducer = {
        ...state,
        isLoading: false,
        user: action.payload
      };
      break;
    case GET_ME_FAILURE:
      reducer = {
        ...state,
        isLoading: false,
        error: action.payload
      };
      break;
    case GET_USER_EDIT_REQUEST:
      reducer = {
        ...state,
        isLoadingEdit: true
      };
      break;
    case GET_USER_EDIT_SUCCESS:
      reducer = {
        ...state,
        isLoadingEdit: false,
        userEdit: action.payload
      };
      break;
    case GET_USER_EDIT_FAILURE:
      reducer = {
        ...state,
        isLoadingEdit: false,
        error: action.payload
      };
      break;
    case UPDATE_ME_REQUEST:
      reducer = {
        ...state,
        isLoadingUpdateMe: true
      };
      break;
    case UPDATE_ME_SUCCESS:
      reducer = {
        ...state,
        isLoadingUpdateMe: false
      };
      break;
    case UPDATE_ME_FAILURE:
      reducer = {
        ...state,
        isLoadingUpdateMe: false,
        error: action.payload
      };
      break;
    case GET_USER_INFO_FOR_EDIT_REQUEST:
      reducer = {
        ...state,
        isLoadingInfo: true
      };
      break;
    case GET_USER_INFO_FOR_EDIT_SUCCESS:
      reducer = {
        ...state,
        isLoadingInfo: false,
        userInfo: action.payload
      };
      break;
    case GET_USER_INFO_FOR_EDIT_FAILURE:
      reducer = {
        ...state,
        isLoadingInfo: false,
        error: action.payload
      };
      break;
    default:
      reducer = state;
  }
  return reducer;
}
