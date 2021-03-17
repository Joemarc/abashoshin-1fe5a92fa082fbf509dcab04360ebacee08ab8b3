import React from 'react';
import { CardExpiryElement } from 'react-stripe-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from '../../../../../src/styles/modules/PaymentForm.module.scss';
import { updatePaymentFormExpiration } from '../../../../../src/scripts/actions';
import { elementClasses, elementStyles } from '../paymentFormElementsStyle';

const PaymentFormElementsExpiration = ({ updatePaymentFormExpiration: updatePaymentFormExpirationAction }) => {
  const handleChange = e => {
    updatePaymentFormExpirationAction(!e.complete || typeof e.error !== 'undefined');
  };

  return (
    <div className={`${styles.paymentForm_Field} ${styles.paymentForm_Field__HalfWidth}`}>
      <CardExpiryElement style={elementStyles} classes={elementClasses} id="payment-form-elements-expiration"
                         onChange={handleChange} />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="payment-form-elements-expiration" className={styles.paymentForm_Label}>Expiration</label>
      <div className={styles.paymentForm_Baseline} />
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updatePaymentFormExpiration }, dispatch);
}

export default connect(null, mapDispatchToProps)(PaymentFormElementsExpiration);