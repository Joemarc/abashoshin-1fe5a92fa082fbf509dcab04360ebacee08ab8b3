import {
  CALCULATE_PRORATION_REQUEST, CALCULATE_PRORATION_SUCCESS, CALCULATE_PRORATION_FAILURE
} from '../../actions';

const initialState = {
  proration: null,
  isLoading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case CALCULATE_PRORATION_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case CALCULATE_PRORATION_SUCCESS:
      return {
        ...state,
        proration: action.payload,
        isLoading: false
      };
    case CALCULATE_PRORATION_FAILURE: {
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
