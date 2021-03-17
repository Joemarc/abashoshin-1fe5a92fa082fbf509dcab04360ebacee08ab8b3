import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './ProfileView.scss';
import { validateToken, getUser } from '../../src/scripts/actions';
import Navbar from "../../components/navbar/Navbar";

class ProfileView extends Component {
  constructor(props) {
    super(props);

    this.state = { loadingPageContent: true };
  }

  componentDidMount() {
    const { validateToken: validateTokenAction, getUser: getUserAction } = this.props;

    validateTokenAction().then(() => getUserAction()
      .then(this.displayPageContent)
      .catch(this.displayPageContent)
    );
  }

  displayPageContent = () => this.setState({ loadingPageContent: false });

  render() {
    const { currentUser, isLoading, user, isLoadingUser, match } = this.props;
    const { loadingPageContent } = this.state;

    const renderProfileComponent = () => {
      let profileComponent;
      if (isLoadingUser || loadingPageContent || isLoading) {
        profileComponent = 'Loading';
      } else if (user && !isLoading) {
        profileComponent = <>
          <div className="user-profile-left">
            {user.avatar ? <img className="img-avatar" src={`${user.avatar.attachment.large.url}`}/> : 'none'}
          </div>
          <div className="user-profile-right">
            <p className="">Type de profil: <span>{user.role}</span></p>
            <div className="user-main-infos">
              <p className="firstname">Prénom: <span> {user.first_name}</span></p>
              <p className="lastname">Nom: <span>{user.last_name}</span></p>
            </div>
            <div>
              <p className="birthdate">Date de naissance: <span>{user.birth_date}</span></p>
            </div>
            <div className="user-description">
              <p>Description: </p>
              <p><span>{user.description}</span></p>
            </div>
            <div className="btn-to-edit">
              <Link to="/users/profile/edit" > Modifier mon profil </Link>
            </div>
          </div>
        </>;
      }
      return profileComponent;
    }

    return (
      <Fragment>
        { currentUser && !isLoading ? <Navbar user={{currentUser, isLoading}} /> : <Navbar /> }
        <div className="empty-div" />
        <div className="user-profile-container">
            {renderProfileComponent()}
        </div>
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ validateToken, getUser }, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.authReducer.user,
    isLoading: state.authReducer.isLoading,
    user: state.userReducer.user,
    isLoadingUser: state.userReducer.isLoading
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);