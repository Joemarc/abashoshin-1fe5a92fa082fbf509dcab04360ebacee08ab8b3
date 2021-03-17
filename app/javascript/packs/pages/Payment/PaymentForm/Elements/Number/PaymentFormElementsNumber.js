import React, { Component } from 'react';
import { CardNumberElement } from 'react-stripe-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from '../../../../../src/styles/modules/PaymentForm.module.scss';
import './PaymentFormElementsNumber.scss';
import { updatePaymentFormCardNumber } from '../../../../../src/scripts/actions';
import { elementClasses, elementStyles } from '../paymentFormElementsStyle';

const cardBrandToPfClass = {
  visa: 'pf-visa',
  mastercard: 'pf-mastercard',
  amex: 'pf-american-express',
  discover: 'pf-discover',
  diners: 'pf-diners',
  jcb: 'pf-jcb',
  unknown: 'pf-credit-card'
};

class PaymentFormElementsNumber extends Component {
  setBrandIcon = brand => {
    const brandIconElement = document.getElementById('brand-icon');
    let pfClass = 'pf-credit-card';
    if (brand in cardBrandToPfClass) {
      pfClass = cardBrandToPfClass[brand];
    }
    for (let i = brandIconElement.classList.length - 1; i >= 0; i -= 1) {
      brandIconElement.classList.remove(brandIconElement.classList[i]);
    }
    brandIconElement.classList.add('pf');
    brandIconElement.classList.add(pfClass);
  };

  handleChange = e => {
    const { updatePaymentFormCardNumber: updatePaymentFormCardNumberAction } = this.props;
    this.updateBrandIcon(e);
    updatePaymentFormCardNumberAction(!e.complete);
  };

  updateBrandIcon = e => {
    if (e.brand) {
      this.setBrandIcon(e.brand);
    }
  };

  render() {
    return (
      <div className={styles.paymentForm_Row}>
        <div className={styles.paymentForm_Field}>
          <CardNumberElement style={elementStyles} classes={elementClasses} id="payment-form-elements-number"
                             onChange={this.handleChange} />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="payment-form-elements-number" className={styles.paymentForm_Label}>Numéro de carte</label>
          <div className={styles.paymentForm_Baseline} />
          <span className={styles.paymentForm_Input_Brand}><i className="pf pf-credit-card" id="brand-icon" /></span>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updatePaymentFormCardNumber }, dispatch);
}

export default connect(null, mapDispatchToProps)(PaymentFormElementsNumber);