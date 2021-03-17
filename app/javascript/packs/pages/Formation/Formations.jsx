import React, {Component} from 'react';
import './Formations.scss'
import Navbar from "../../components/navbar/Navbar";
import {bindActionCreators} from "redux";
import {validateToken, getFormations} from "../../src/scripts/actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import LoaderCardArticle from "../../components/UI/Loader/Card/Article/LoaderCardArticle";
import FormationCard from "../../components/formations/FormationCard";

class Formations extends Component {

  componentDidMount() {
    const {validateToken: validateTokenAction} = this.props;

    validateTokenAction().then(this.getFormationsList()).catch(this.getFormationsList);
  }

  getFormationsList = () => {
    const {
      getFormations: getFormationsAction
    } = this.props;

    return Promise.all([getFormationsAction()])
      .then(response => {
        return response;
      })
  };

  render() {
    const {
      currentUser, isLoading,
      formations, isFormationsLoading
    } = this.props;

    const renderFormations = () => {
      let component;
      if (isFormationsLoading) {
        component = [1, 2, 3, 4].map(i => <LoaderCardArticle key={i} />);
      } else if (formations.length) component = formations.map(f => <FormationCard formation={f} key={f.idformation}/> );
      else component = 'Aucune formations à afficher pour le moment';
      return component;
    };

    return (
      <>
        <Navbar user={{currentUser, isLoading}}/>
        <div className="container-list">
          <div className="empty-div" />
          <div className="banner">
            <div className="container">
              <h1>Formations ABA Shoshin</h1>
              <p>Texte pour expliquer les avantages des formations et le contenu</p>
            </div>
          </div>
          <div className="formations-list">
            {renderFormations()}
          </div>
        </div>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    validateToken, getFormations
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.authReducer.user,
    isLoading: state.authReducer.isLoading,
    formations: state.formationsReducer.formations,
    isFormationsLoading: state.formationsReducer.isLoading,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Formations));