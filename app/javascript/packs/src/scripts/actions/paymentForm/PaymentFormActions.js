import {
  UPDATE_PAYMENT_FORM_CARD_NUMBER, UPDATE_PAYMENT_FORM_EXPIRATION, UPDATE_PAYMENT_FORM_CVC
} from './PaymentFormTypes';

export function updatePaymentFormCardNumber(disabled) {
  return {
    type: UPDATE_PAYMENT_FORM_CARD_NUMBER,
    payload: disabled
  };
}

export function updatePaymentFormExpiration(disabled) {
  return {
    type: UPDATE_PAYMENT_FORM_EXPIRATION,
    payload: disabled
  };
}

export function updatePaymentFormCVC(disabled) {
  return {
    type: UPDATE_PAYMENT_FORM_CVC,
    payload: disabled
  };
}