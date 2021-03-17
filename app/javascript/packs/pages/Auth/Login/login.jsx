import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {signIn} from "../../../src/scripts/actions/auth";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";

import '../auth.scss'

class Login extends Component {
  handleLogin = (e) => {
    e.preventDefault();
    const { signIn: signInAction, history } = this.props;

    const signInPromise = signInAction({email: this.email.value, password: this.password.value});
    return Promise.all([signInPromise]).then(response => {
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
          <form onSubmit={this.handleLogin} className="form-infos-container">
            <div className="form-infos">
              <span>Email</span>
              <input name="email" ref={(input) => this.email = input } />
              <span>Mot de passe</span>
              <input name="password" type="password" ref={(input) => this.password = input } />
              <button type="submit" className="log-submit"> Me connecter </button>
            </div>
            <div className="bottom-text">Vous n'êtes pas inscrit(e) ? <Link to="/inscription"> Inscrivez-vous !</Link> </div>
          </form>
        </div>
        <Footer />
      </>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signIn
  }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(Login));