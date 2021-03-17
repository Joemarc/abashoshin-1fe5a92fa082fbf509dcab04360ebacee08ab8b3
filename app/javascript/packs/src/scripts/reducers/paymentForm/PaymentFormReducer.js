import {
  UPDATE_PAYMENT_FORM_CARD_NUMBER, UPDATE_PAYMENT_FORM_EXPIRATION, UPDATE_PAYMENT_FORM_CVC
} from '../../actions';

const initialState = {
  cardNumberDisabled: true,
  expirationDisabled: true,
  cvcDisabled: true,
  paymentFormDisabled: true
};

export default function(state = initialState, action) {
  switch(action.type) {
    case UPDATE_PAYMENT_FORM_CARD_NUMBER:
      return {
        ...state,
        cardNumberDisabled: action.payload,
        paymentFormDisabled: state.expirationDisabled || state.cvcDisabled || action.payload
      };
    case UPDATE_PAYMENT_FORM_EXPIRATION:
      return {
        ...state,
        expirationDisabled: action.payload,
        paymentFormDisabled: state.cardNumberDisabled || state.cvcDisabled || action.payload
      };
    case UPDATE_PAYMENT_FORM_CVC:
      return {
        ...state,
        cvcDisabled: action.payload,
        paymentFormDisabled: state.cardNumberDisabled || state.expirationDisabled || action.payload
      };
    default:
      return state;
  }
}
