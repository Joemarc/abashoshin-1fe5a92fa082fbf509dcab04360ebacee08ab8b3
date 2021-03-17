import {
  GET_CURRENT_SUBSCRIPTION_REQUEST, GET_CURRENT_SUBSCRIPTION_SUCCESS, GET_CURRENT_SUBSCRIPTION_FAILURE
} from '../../actions';

const initialState = {
  subscription: null,
  isLoading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_CURRENT_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_CURRENT_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscription: action.payload,
        isLoading: false
      };
    case GET_CURRENT_SUBSCRIPTION_FAILURE: {
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
