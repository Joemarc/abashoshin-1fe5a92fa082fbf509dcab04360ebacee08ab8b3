import {
  GET_ARTICLES_FAILURE, GET_ARTICLES_REQUEST, GET_ARTICLES_SUCCESS,
  LOAD_MORE_ARTICLES_FAILURE, LOAD_MORE_ARTICLES_REQUEST, LOAD_MORE_ARTICLES_SUCCESS,
  LOAD_MORE_RESOURCE_ARTICLES_FAILURE, LOAD_MORE_RESOURCE_ARTICLES_REQUEST, LOAD_MORE_RESOURCE_ARTICLES_SUCCESS,
  RESET_ARTICLES, SET_RESPONSE_HEADERS, GET_TOP_ARTICLE_REQUEST, GET_TOP_ARTICLE_SUCCESS, GET_TOP_ARTICLE_FAILURE,
  GET_HEAD_ARTICLES_FAILURE, GET_HEAD_ARTICLES_REQUEST, GET_HEAD_ARTICLES_SUCCESS
} from '../../actions';

const initialState = {
  isLoading: false,
  isHeadLoading: false,
  isLoadingMore: false,
  articles: [],
  headArticles: [],
  topArticle: null,
  isLoadingTopArticle: false,
  error: null,
  currentPage: 1,
  pagesCount: 0,
  isLastPage: true,
};

export default function(state = initialState, action) {
  let reducer;
  switch(action.type) {
    case GET_ARTICLES_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case GET_ARTICLES_SUCCESS:
      reducer = {
        ...state,
        isLastPage: state.currentPage >= state.pagesCount,
        articles: action.payload,
        isLoading: false
      };
      break;
    case GET_ARTICLES_FAILURE:
      reducer = {
        ...state,
        isLoading: false,
        error: action.payload
      };
      break;
    case GET_HEAD_ARTICLES_REQUEST:
      reducer = {
        ...state,
        isHeadLoading: true
      };
      break;
    case GET_HEAD_ARTICLES_SUCCESS:
      reducer = {
        ...state,
        headArticles: action.payload,
        isHeadLoading: false
      };
      break;
    case GET_HEAD_ARTICLES_FAILURE:
      reducer = {
        ...state,
        isHeadLoading: false,
        error: action.payload
      };
      break;
    case GET_TOP_ARTICLE_REQUEST:
      reducer = {
        ...state,
        isLoadingTopArticle: true
      };
      break;
    case GET_TOP_ARTICLE_SUCCESS:
      reducer = {
        ...state,
        topArticle: action.payload,
        isLoadingTopArticle: false
      };
      break;
    case GET_TOP_ARTICLE_FAILURE:
      reducer = {
        ...state,
        isLoadingTopArticle: false,
        error: action.payload
      };
      break;
    case LOAD_MORE_ARTICLES_REQUEST:
      reducer = {
        ...state,
        isLoadingMore: true
      };
      break;
    case LOAD_MORE_ARTICLES_SUCCESS: {
      const currentPage = state.currentPage + 1;
      reducer = {
        ...state,
        isLoadingMore: false,
        articles: [...state.articles, ...action.payload],
        isLastPage: currentPage >= state.pagesCount,
        currentPage
      };
      break;
    }
    case LOAD_MORE_ARTICLES_FAILURE:
      reducer = {
        ...state,
        isLoadingMore: false,
        error: action.payload
      };
      break;
    case LOAD_MORE_RESOURCE_ARTICLES_REQUEST:
      reducer = {
        ...state,
        isLoadingMore: true
      };
      break;
    case LOAD_MORE_RESOURCE_ARTICLES_SUCCESS: {
      const currentPage = state.currentPage + 1;
      reducer = {
        ...state,
        isLoadingMore: false,
        error: null,
        articles: [...state.articles, ...action.payload],
        isLastPage: currentPage >= state.pagesCount,
        currentPage
      };
      break;
    }
    case LOAD_MORE_RESOURCE_ARTICLES_FAILURE:
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
    case RESET_ARTICLES:
      reducer = initialState;
      break;
    default:
      reducer = state;
  }
  return reducer;
}
