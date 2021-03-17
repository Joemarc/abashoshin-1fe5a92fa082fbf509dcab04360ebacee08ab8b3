import {
  GET_COMMENTS_REQUEST, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILURE,
  CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS,
  LOAD_MORE_COMMENTS_FAILURE, LOAD_MORE_COMMENTS_REQUEST, LOAD_MORE_COMMENTS_SUCCESS, SET_RESPONSE_HEADERS,
  UPDATE_COMMENT_FAILURE, UPDATE_COMMENT_REQUEST, UPDATE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_REQUEST
} from '../../actions';

const initialState = {
  comments: [],
  isLoading: false,
  isLoadingCreate: false,
  isLoadingUpdate: false,
  isLoadingDelete: false,
  isLoadingMore: false,
  currentPage: 1,
  pagesCount: 0,
  isLastPage: true,
  error: null
};

export default function(state = initialState, action) {
  let reducer;

  switch(action.type) {
    case GET_COMMENTS_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case GET_COMMENTS_SUCCESS:
      reducer = {
        ...state,
        comments: action.payload,
        isLoading: false,
        isLastPage: state.currentPage >= state.pagesCount
      };
      break;
    case GET_COMMENTS_FAILURE:
      reducer = {
        ...state,
        isLoading: false,
        error: action.payload
      };
      break;
    case CREATE_COMMENT_REQUEST:
      reducer = {
        ...state,
        isLoadingCreate: true
      };
      break;
    case CREATE_COMMENT_SUCCESS:
      reducer = {
        ...state,
        comments: [...state.comments, action.payload],
        isLoadingCreate: false
      };
      break;
    case CREATE_COMMENT_FAILURE:
      reducer = {
        ...state,
        isLoadingCreate: false,
        error: action.payload
      };
      break;
    case UPDATE_COMMENT_REQUEST:
      reducer = {
        ...state,
        isLoadingUpdate: true
      };
      break;
    case UPDATE_COMMENT_SUCCESS: {
      const comments = [...state.comments].slice();
      let comment = comments.filter(c => c.id === action.payload.id)[0];
      if (comment) comment = Object.assign(comment, { body: action.payload.body });
      reducer = {
        ...state,
        comments,
        isLoadingUpdate: false
      };
      break;
    }
    case UPDATE_COMMENT_FAILURE:
      reducer = {
        ...state,
        isLoadingUpdate: false,
        error: action.payload
      };
      break;
    case DELETE_COMMENT_REQUEST:
      reducer = {
        ...state,
        isLoadingDelete: true
      };
      break;
    case DELETE_COMMENT_SUCCESS: {
      const newState = { ...state };
      const newArray = newState.comments.slice();
      const position = newArray.indexOf(action.payload);
      newArray.splice(position, 1);
      reducer = {
        ...state,
        comments: newArray,
        isLoadingDelete: false
      };
      break;
    }
    case DELETE_COMMENT_FAILURE:
      reducer = {
        ...state,
        isLoadingDelete: false,
        error: action.payload
      };
      break;
    case LOAD_MORE_COMMENTS_REQUEST:
      reducer = {
        ...state,
        isLoadingMore: true
      };
      break;
    case LOAD_MORE_COMMENTS_SUCCESS: {
      const currentPage = state.currentPage + 1;
      reducer = {
        ...state,
        isLoadingMore: false,
        comments: [...state.comments, ...action.payload],
        isLastPage: currentPage >= state.pagesCount,
        currentPage
      };
      break;
    }
    case LOAD_MORE_COMMENTS_FAILURE:
      reducer = {
        ...state,
        isLoadingMore: false,
        error: action.payload
      };
      break;
    case SET_RESPONSE_HEADERS:
      reducer = {
        ...state,
        pagesCount: parseInt(action.payload.pages_count, 10)
      };
      break;
    default:
      reducer = state;
  }
  return reducer;
}
