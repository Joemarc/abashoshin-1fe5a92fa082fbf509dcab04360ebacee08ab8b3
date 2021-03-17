import {
  SWITCH_SUBSCRIPTION_REQUEST, SWITCH_SUBSCRIPTION_SUCCESS, SWITCH_SUBSCRIPTION_FAILURE
} from '../../actions';

const initialState = {
  isLoading: false,
  error: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SWITCH_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case SWITCH_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case SWITCH_SUBSCRIPTION_FAILURE: {
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
