import React from 'react';
import { CardCvcElement } from 'react-stripe-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from '../../../../../src/styles/modules/PaymentForm.module.scss';
import { updatePaymentFormCVC } from '../../../../../src/scripts/actions';
import { elementClasses, elementStyles } from '../paymentFormElementsStyle';

const PaymentFormElementsCVC = ({ updatePaymentFormCVC: updatePaymentFormCVCAction }) => {
  const handleChange = e => {
    updatePaymentFormCVCAction(!e.complete);
  };

  return (
    <div className={`${styles.paymentForm_Field} ${styles.paymentForm_Field__HalfWidth}`}>
      <CardCvcElement style={elementStyles} classes={elementClasses} id="payment-form-elements-cvc"
                      onChange={handleChange} />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="payment-form-elements-cvc" className={styles.paymentForm_Label}>CVC</label>
      <div className={styles.paymentForm_Baseline} />
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updatePaymentFormCVC }, dispatch);
}

export default connect(null, mapDispatchToProps)(PaymentFormElementsCVC);