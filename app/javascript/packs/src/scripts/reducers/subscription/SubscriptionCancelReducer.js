import { CANCEL_SUBSCRIPTION_REQUEST, CANCEL_SUBSCRIPTION_SUCCESS, CANCEL_SUBSCRIPTION_FAILURE } from '../../actions';

const initialState = {
  cancelled: false,
  isLoading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case CANCEL_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case CANCEL_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        cancelled: true,
        isLoading: false
      };
    case CANCEL_SUBSCRIPTION_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
}
