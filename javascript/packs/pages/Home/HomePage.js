import React, {Component} from 'react';
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Button from "../../components/Buttons/Button";

import './HomePage.scss';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {validateToken} from "../../src/scripts/actions";


class HomePage extends Component {
  componentDidMount() {
    const {validateToken: validateTokenAction} = this.props;

    validateTokenAction()
  }

  render() {
    const { isLoading, currentUser } = this.props;

    return (
      <div>
        { currentUser && !isLoading ? <Navbar user={{currentUser, isLoading}} /> : <Navbar /> }
        <div className="banner-presentation">
          <div className="left-banner-presentation">
            <h1>Titre de présentation</h1>
            <p>Description expliquant le but du site...</p>
            <div><Button text="M'inscrire" link="/connexion"/></div>
          </div>
          <div className="right-banner-presentation"/>
        </div>
        <div className="formations-presentation">
          <div className="formations-content">
            <h2>Formez-vous à l'ABA</h2>
            <p>Des formations ludiques avec un suivi</p>
          </div>
          <div className="formations-content">
            <Button text="Voir toutes les formations" link="/formations"/>
          </div>
        </div>

        <div className="ressources-presentation">
          <div className="left-ressources-presentation">
            <h1>Titre de présentation</h1>
            <p>Description expliquant le but du site...</p>
            <div>
              <Button text="Voir toutes les ressources" link="/ressources"/>
            </div>
          </div>
          <div className="right-ressources-presentation"/>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    validateToken
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.authReducer.user,
    isLoading: state.authReducer.isLoading,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));