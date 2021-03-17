import { GET_INVOICES_REQUEST, GET_INVOICES_SUCCESS, GET_INVOICES_FAILURE } from '../../actions';

const initialState = {
  invoices: null,
  isLoading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_INVOICES_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: action.payload,
        isLoading: false
      };
    case GET_INVOICES_FAILURE: {
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
