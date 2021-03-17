import {
  GET_VIDEOS_FAILURE, GET_VIDEOS_REQUEST, GET_VIDEOS_SUCCESS,
  LOAD_MORE_VIDEOS_FAILURE, LOAD_MORE_VIDEOS_REQUEST, LOAD_MORE_VIDEOS_SUCCESS,
  LOAD_MORE_RESOURCE_VIDEOS_FAILURE, LOAD_MORE_RESOURCE_VIDEOS_REQUEST, LOAD_MORE_RESOURCE_VIDEOS_SUCCESS,
  RESET_VIDEOS, SET_RESPONSE_HEADERS
} from '../../actions';

const initialState = {
  isLoading: false,
  isLoadingMore: false,
  isLoadingDelete: false,
  videosList: [],
  error: null,
  currentPage: 1,
  pagesCount: 0,
  isLastPage: true,
};

export default function(state = initialState, action) {
  let reducer;
  switch(action.type) {
    case GET_VIDEOS_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case GET_VIDEOS_SUCCESS:
      reducer = {
        ...state,
        isLastPage: state.currentPage >= state.pagesCount,
        videosList: action.payload,
        isLoading: false
      };
      break;
    case GET_VIDEOS_FAILURE:
      reducer = {
        ...state,
        isLoading: false,
        error: action.payload
      };
      break;
    case LOAD_MORE_VIDEOS_REQUEST:
      reducer = {
        ...state,
        isLoadingMore: true
      };
      break;
    case LOAD_MORE_VIDEOS_SUCCESS: {
      const currentPage = state.currentPage + 1;
      reducer = {
        ...state,
        isLoadingMore: false,
        videosList: [...state.videos, ...action.payload],
        isLastPage: currentPage >= state.pagesCount,
        currentPage
      };
      break;
    }
    case LOAD_MORE_VIDEOS_FAILURE:
      reducer = {
        ...state,
        isLoadingMore: false,
        error: action.payload
      };
      break;
    case LOAD_MORE_RESOURCE_VIDEOS_REQUEST:
      reducer = {
        ...state,
        isLoadingMore: true
      };
      break;
    case LOAD_MORE_RESOURCE_VIDEOS_SUCCESS: {
      const currentPage = state.currentPage + 1;
      reducer = {
        ...state,
        isLoadingMore: false,
        error: null,
        videosList: [...state.videos, ...action.payload],
        isLastPage: currentPage >= state.pagesCount,
        currentPage
      };
      break;
    }
    case LOAD_MORE_RESOURCE_VIDEOS_FAILURE:
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
    case RESET_VIDEOS:
      reducer = initialState;
      break;
    default:
      reducer = state;
  }
  return reducer;
}
