import { VALIDATE_TOKEN_REQUEST, VALIDATE_TOKEN_SUCCESS, VALIDATE_TOKEN_FAILURE } from '../../actions';

const initialState = {
  isLoading: false,
  user: null,
  error: null
};

export default function(state = initialState, action) {
  let reducer;
  switch(action.type) {
    case VALIDATE_TOKEN_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case VALIDATE_TOKEN_SUCCESS:
      reducer = {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload
      };
      break;
    case VALIDATE_TOKEN_FAILURE:
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
