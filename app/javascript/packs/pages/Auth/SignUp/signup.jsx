import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router-dom';

import {signUp} from "../../../src/scripts/actions/auth";
import '../auth.scss'
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
    }).then(() => history.push("/ressources"))
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
          <form onSubmit={this.handleSignUp} className="form-infos-container">
            <div className="form-infos">
              <span>Email</span>
              <input name="email" ref={(input) => this.email = input } />
              <span>Mot de passe</span>
              <input name="password" type="password" ref={(input) => this.password = input } />
              <span>Confirmation de votre mot de passe</span>
              <input name="passwordConfirmation" type="password" ref={(input) => this.passwordConfirmation = input } />
              <button type="submit" className="log-submit"> M'inscrire </button>
            </div>
            <div className="bottom-text">Vous êtes déjà inscrit(e) ? <Link to="/connexion"> Connectez-vous !</Link> </div>
          </form>
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