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
      stripe ?
        <div className={styles.paymentFormContainer}>
          <form className={styles.paymentForm}>
            <CreditCardElementsNumber />
            <div className={`${styles.paymentForm_Row} ${styles.paymentForm_Row__Halves}`}>
              <CreditCardElementsExpiration />
              <CreditCardElementsCVC />
            </div>

            <button className={styles.paymentForm_ButtonSubmit} type="submit" onClick={this.handlePay}
                    disabled={!stripe || paymentFormDisabled || submitting}>
              {submitting ? <span>Paiement en cours... <i className="fas fa-spinner fa-spin" /></span> : submitText}
            </button>
          </form>

          <div className={styles.paymentForm_Secure}>
            <a href="https://stripe.com" target="_blank" rel="noopener noreferrer nofollow"
               className={styles.paymentForm_Secure_Link}>
              <img src={securePayment} alt="" className={styles.paymentForm_Secure_Image} />
            </a>
          </div>
        </div> : <PaymentFormLoader />
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