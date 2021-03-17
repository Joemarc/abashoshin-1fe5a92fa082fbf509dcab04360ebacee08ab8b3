import React, {Component} from 'react';
import './Formations.scss';
import Navbar from "../../components/navbar/Navbar";
import {bindActionCreators} from "redux";
import {validateToken, getFormation, getModules} from "../../src/scripts/actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import LoaderCardArticle from "../../components/UI/Loader/Card/Article/LoaderCardArticle";
import FormationView from "../../components/formations/View/FormationView";
import ModulesView from "../../components/formations/modules/ModulesView";

class DetailedFormation extends Component {
  componentDidMount() {

    const {validateToken: validateTokenAction } = this.props;

    validateTokenAction()
      .then(() => this.getFormationData());
  }

  getFormationData = () => {
    const {
      match, getFormation: getFormationAction, getModules: getModulesAction
    } = this.props;

    return Promise.all([getFormationAction(match.params.id), getModulesAction(match.params.id)])
      .then(response => {
        return response;
      })
  };

  render() {
    const {
      currentUser, isLoading,
      formation, isLoadingFormation,
      modules, isLoadingModules
    } = this.props;

    const renderFormation = () => {
      let component;
      if (isLoadingFormation) {
        component = <LoaderCardArticle />;
      } else if (formation && !isLoadingFormation) component = <FormationView formation={formation} />;
      else component = 'Aucune formations à afficher pour le moment';
      return component;
    };

    const renderModules = () => {
      let component;
      if (isLoadingModules) {
        component = [1, 2, 3, 4].map( m => <LoaderCardArticle key={m}/>);
      } else if (modules.length && !isLoadingModules) component = modules.map(m => <ModulesView module={m} />);
      else component = 'Aucune formations à afficher pour le moment';

      return component;
    };

    return (
      <>
        { currentUser && !isLoading ? <Navbar user={{currentUser, isLoading}} /> : <Navbar /> }
        <div className="empty-div" />
        <div className="formation-container">
          {renderFormation()}
          <div className="modules">
            <h4>Ce que vous allez apprendre dans cette formation :</h4>
            {renderModules()}
          </div>
        </div>
      </>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    validateToken, getFormation, getModules
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.authReducer.user,
    isLoading: state.authReducer.isLoading,
    formation: state.formationsReducer.formation,
    isLoadingFormation: state.formationsReducer.isLoadingFormation,
    modules: state.formationsReducer.modules,
    isLoadingModules: state.formationsReducer.isLoadingModules,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailedFormation));