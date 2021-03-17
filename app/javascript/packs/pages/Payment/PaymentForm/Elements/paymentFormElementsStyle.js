import styles from '../../../../src/styles/modules/PaymentForm.module.scss';

export const elementStyles = {
  base: {
    color: '#32325D;',
    fontWeight: 500,
    fontSize: '16px',
    fontSmoothing: 'antialiased',

    '::placeholder': {
      color: '#CFD7DF;'
    },
    ':-webkit-autofill': {
      color: '#e39f48'
    }
  },
  invalid: {
    color: '#E25950',

    '::placeholder': {
      color: '#FFCCA5'
    }
  }
};

export const elementClasses = {
  base: `StripeElement ${styles.paymentForm_Input}`,
  focus: `StripeElement--focus ${styles.paymentForm_Input__Focused}`,
  empty: `StripeElement--empty ${styles.paymentForm_Input__Empty}`,
  invalid: `StripeElement--invalid ${styles.paymentForm_Input__Invalid}`
};