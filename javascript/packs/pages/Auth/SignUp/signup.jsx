import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { Form, Field } from 'react-final-form';
import { Link, withRouter } from 'react-router-dom';

import { signUp } from "../../../src/scripts/actions/auth";
import '../auth.scss';
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";

class SignUp extends Component {
  handleSignUp = (e) => {
    e.preventDefault();
    const { signUp: signUpAction, history } = this.props;

    const signUpPromise = signUpAction({
      email: this.email.value,
      password: this.password.value,
      password_confirmation: this.passwordConfirmation.value
    });
    return Promise.all([signUpPromise]).then(response => {
      return response;
    })
  };

  onSubmit = values => {
    const { signUp: signUpAction, history } = this.props;
    signUpAction({...values})
  };

  render () {
    return (
      <>
        <Navbar />
        <div className="page-container">
          <div className="page-infos">
            <h1>Bienvenue sur ABA Shoshin</h1>
            <p> En vous inscrivant vous rejoignez une communauté d'aidant, de professionnels de l'ABA, mais aussi des personnes souhaitant en savoir plus sur ces sujets...</p>
          </div>
          <Form
            onSubmit={this.onSubmit}
            render={({ handleSubmit, form, values }) => (
              <form onSubmit={handleSubmit}>
                <h2>Simple Default Input</h2>
                <div>
                  <label>First Name</label>
                  <Field name="email" component="input" placeholder="test@test.com" />
                </div>

                <h2>An Arbitrary Reusable Input Component</h2>
                <div>
                  <label>Mot de passe</label>
                  <Field name="password" component="input" placeholder="********" />
                </div>

                <h2>Render Function</h2>
                <div>
                  <label>Mot de passe</label>
                  <Field name="password_confirmation" component="input" placeholder="********" />
                </div>
                <button type="submit" onClick={() => this.onSubmit(values)}>Submit</button>
              </form>
            )}
          />
        </div>
        <Footer />
      </>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signUp
  }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(SignUp));