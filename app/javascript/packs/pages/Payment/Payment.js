import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import PaymentForm from "./PaymentForm/PaymentForm";
import displayToast from "../../utils/toastMessage";
import {bindActionCreators} from "redux";
import {createSubscription, validateToken} from "../../src/scripts/actions";
import {connect} from "react-redux";
import * as qs from "query-string";

import "./Payment.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

class Payment extends Component {
  componentDidMount() {
    const {validateToken: validateTokenAction} = this.props;

    validateTokenAction()
  }

  handleSubmit = stripe => {
    const { createSubscription: createSubscriptionAction } = this.props;
    const planId = qs.parse(this.props.location.search).plan_id

    stripe.createToken().then(result => {
      if (result.token) {
        createSubscriptionAction({
          stripe_token: result.token.id,
          plan_id: planId
        }).then(s => {
          const subscription = s.payload;
          // This can be found on invoice.payment_intent.client_secret
          if (subscription.status === 'active') {
            displayToast('Paiement réussi', false)
            window.location.href = '/users/profile'
          }
        });
      } else if (result.error) {
        displayToast(result.error.message, true);
      }
    });
  };

  render() {
    const { loadingSubscription, currentUser, isLoading } = this.props;

    return (
      <>
        { currentUser && !isLoading ? <Navbar user={{currentUser, isLoading}} /> : <Navbar /> }
        <div className="empty-div"/>
        <StripeProvider apiKey="pk_test_51IRbX6GkWtieyjHk7FKw4qhQM8vRcLo6seBNIN7mbxAde8XoeUw2DBmT1Z68mxkASOA9QsP87r8LRAqdonBSSkVF00qlOSkj0w">
          <div className="payment-page-container">
            <div className="left-payment-page-container">
              <h3>Adhérer à ABA SHOSHIN</h3>
              <p>En adhérant à notre association, vous accéderez à une bibliothèque de ressources, documents, vidéos,
              mais aussi de vous formez à l'ABA avec des professionnels</p>
              <div className="illustration-container" />
            </div>
            <div className="payment-container">
              <Elements>
                <PaymentForm submitText="Adhérer à l'association"
                             pay={this.handleSubmit}
                             submitting={loadingSubscription} />
              </Elements>
            </div>
          </div>
        </StripeProvider>
        <Footer/>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createSubscription, validateToken
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.authReducer.user,
    isLoading: state.authReducer.isLoading,
    loadingCurrentSubscription: state.subscriptionReducer.isLoading,
    loadingSubscription: state.subscriptionCreateReducer.isLoading
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);