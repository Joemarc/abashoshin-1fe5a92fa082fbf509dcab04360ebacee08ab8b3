import {
  GET_ARTICLE_REQUEST, GET_ARTICLE_SUCCESS, GET_ARTICLE_FAILURE,
} from '../../actions';

const initialState = {
  article: null,
  isLoading: false,
  error: null
};

export default function(state = initialState, action) {
  let reducer;

  switch(action.type) {
    case GET_ARTICLE_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case GET_ARTICLE_SUCCESS:
      reducer = {
        ...state,
        article: action.payload,
        isLoading: false
      };
      break;
    case GET_ARTICLE_FAILURE:
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
