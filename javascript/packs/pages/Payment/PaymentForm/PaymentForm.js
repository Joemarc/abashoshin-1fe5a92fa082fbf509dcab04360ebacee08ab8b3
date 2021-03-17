import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';
import { connect } from 'react-redux';

import styles from '../../../src/styles/modules/PaymentForm.module.scss';
import CreditCardElementsNumber from './Elements/Number/PaymentFormElementsNumber';
import CreditCardElementsExpiration from './Elements/Expiration/PaymentFormElementsExpiration';
import CreditCardElementsCVC from './Elements/CVC/PaymentFormElementsCVC';
import securePayment from './secure-payment.svg';
import PaymentFormLoader from './Loader/PaymentFormLoader';

class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { termsChecked: false };
  }

  handlePay = e => {
    const { pay, stripe } = this.props;
    e.preventDefault();
    pay(stripe);
  };

  render() {
    const { termsChecked } = this.state;
    const { stripe, paymentFormDisabled, submitText, submitting } = this.props;

    return (
      <div>test</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    paymentFormDisabled: state.paymentFormReducer.paymentFormDisabled,
    paymentFormCardNumberDisabled: state.paymentFormReducer.cardNumberDisabled,
    paymentFormExpirationDisabled: state.paymentFormReducer.expirationDisabled,
    paymentFormCVCDisabled: state.paymentFormReducer.cvcDisabled
  };
}

export default injectStripe(connect(mapStateToProps)(PaymentForm));