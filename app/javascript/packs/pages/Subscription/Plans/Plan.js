import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import './Plan.scss';
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import {bindActionCreators} from "redux";
import {validateToken } from "../../../src/scripts/actions";
import {connect} from "react-redux";

class Plan extends Component {
  componentDidMount() {
    const {validateToken: validateTokenAction} = this.props;

    validateTokenAction()
  }

  navigate = (planId) => {
    this.props.history.push(`/adhesion/paiement?plan_id=${planId}`)
  };

  render() {
    const { currentUser, isLoading } = this.props;

    return (
      <>
        { currentUser && !isLoading ? <Navbar user={{currentUser, isLoading}} /> : <Navbar /> }
        <div className="empty-div" />
        <div className="plans-above-container">
          <h1>Adhésion à l'association ABA SHOSHIN</h1>
          <p className="page-plans-title"> En adhérant à notre association, vous debloquerez des privilèges telles que des ressources dédiées à l'ABA,
            mais aussi des formations.
            De plus vos cotisations et dons ouvrent droit à une réduction d’impôt de 66%, dans la limite de 20% de votre revenu imposable.
            Ainsi, un don de 25 € à ABA Shoshin ne vous coûtera en réalité que 8,50 €
          </p>
        </div>

        <div className="plans-container">
          <div className="plan">
            <div className="plan-top-infos">
              <h2 className="plan-name">Adhésion Basique</h2>
              <p className="plan-price"> 25 €</p>
            </div>
            <div className="plan-avantages">
              <p>Accès à l'intégralité des ressources</p>
            </div>
            <div className="plan-go-to">
              <button className="btn-go" onClick={() => this.navigate(1)} >Adhérer</button>
            </div>
          </div>

          <div className="plan">
            <div className="plan-top-infos">
              <h2 className="plan-name">Adhésion Formation</h2>
              <p className="plan-price"> 55 €</p>
            </div>
            <div className="plan-avantages">
              <p>Accès à l'intégralité des ressources</p>
              <p>Accès aux formations de l'association</p>
            </div>
            <div className="plan-go-to">
              <button className="btn-go" onClick={() => this.navigate(2)} >Adhérer</button>
            </div>
          </div>
        </div>
        <Footer />
      </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Plan));