import { CREATE_SUBSCRIPTION_FAILURE, CREATE_SUBSCRIPTION_REQUEST, CREATE_SUBSCRIPTION_SUCCESS } from '../../actions';

const initialState = {
  subscription: null,
  isLoading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case CREATE_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case CREATE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscription: action.payload,
        isLoading: false
      };
    case CREATE_SUBSCRIPTION_FAILURE: {
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
