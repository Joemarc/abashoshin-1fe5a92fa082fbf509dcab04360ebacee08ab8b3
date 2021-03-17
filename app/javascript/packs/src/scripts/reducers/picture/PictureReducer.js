import {
  UPLOAD_PICTURE_REQUEST, UPLOAD_PICTURE_SUCCESS, UPLOAD_PICTURE_FAILURE,
  DELETE_PICTURE_REQUEST, DELETE_PICTURE_SUCCESS, DELETE_PICTURE_FAILURE,
  SET_INTERCEPTOR_UPLOAD_PROGRESS
} from '../../actions';

const initialState = {
  logo: null,
  cover: null,
  picture: null,
  isLoadingDelete: false,
  uploadProgress: 0,
  pictures: [],
  isLoading: false,
  error: null
};

export default function(state = initialState, action) {
  let reducer;
  switch(action.type) {
    case UPLOAD_PICTURE_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case UPLOAD_PICTURE_SUCCESS: {
      reducer = {
        ...state,
        picture: action.payload,
        isLoading: false
      };
      break;
    }
    case UPLOAD_PICTURE_FAILURE:
      reducer = {
        ...state,
        isLoading: false,
        error: action.payload
      };
      break;

    case DELETE_PICTURE_REQUEST:
      reducer = {
        ...state,
        isLoadingDelete: true
      };
      break;
    case DELETE_PICTURE_SUCCESS: {
      reducer = {
        ...state,
        picture: null,
        isLoadingDelete: false
      };
      break;
    }
    case DELETE_PICTURE_FAILURE:
      reducer = {
        ...state,
        isLoadingDelete: false,
        error: action.payload
      };
      break;
    case SET_INTERCEPTOR_UPLOAD_PROGRESS:
      reducer = {
        ...state,
        uploadProgress: action.payload
      };
      break;

    default:
      reducer = state;
  }
  return reducer;
}
