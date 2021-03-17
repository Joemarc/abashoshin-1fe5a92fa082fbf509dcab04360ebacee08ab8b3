import React, {Component} from 'react';
import { Tabs, Tab, Panel } from '@bumaga/tabs';
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import {validateToken} from '../../src/scripts/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './GeneralView.scss';
import ProfileEditView from "./Edit/ProfileEditView";
import Invoices from "../Subscription/Invoices";

class GeneralView extends Component {
  componentDidMount() {
    const { validateToken: validateTokenAction} = this.props;

    validateTokenAction()
  }

  render() {
    const { currentUser, isLoading } = this.props;
    return (
      <>
        { currentUser && !isLoading ? <Navbar user={{currentUser, isLoading}} /> : <Navbar /> }
        <div className="empty-div" />
          <div className="general-view-container">
            <Tabs>
              <div className="tabs-container">
                <Tab><button className="tab-btns">Mon Profil</button></Tab>
                <Tab><button className="tab-btns">Mon Adhésion</button></Tab>
              </div>

              <Panel><ProfileEditView /></Panel>
              <Panel><Invoices /></Panel>
            </Tabs>
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

export default connect(mapStateToProps, mapDispatchToProps)(GeneralView);