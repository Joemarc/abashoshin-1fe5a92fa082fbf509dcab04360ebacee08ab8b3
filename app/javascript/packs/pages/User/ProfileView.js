import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './ProfileView.scss';
import { authRedirect, getUser } from '../../src/scripts/actions';

class ProfileView extends Component {
  constructor(props) {
    super(props);

    this.state = { loadingPageContent: true };
  }

  componentDidMount() {
    const { authRedirect: authRedirectAction, getUser: getUserAction, match } = this.props;
    authRedirectAction().then(() => getUserAction(match.params.userSlug)
      .then(this.displayPageContent)
      .catch(this.displayPageContent)
    );
  }

  componentDidUpdate(prevProps) {
    const { match, getUser: getUserAction } = this.props;

    if (prevProps.match.params.userId !== match.params.userId) {
      getUserAction(match.params.userId);
    }
  }

  displayPageContent = () => this.setState({ loadingPageContent: false });

  render() {
    const { currentUser, isLoading, user, isLoadingUser, match } = this.props;
    const { loadingPageContent } = this.state;

    const renderProfileComponent = () => {
      let profileComponent;
      if (isLoadingUser || loadingPageContent || isLoading) profileComponent = '';
      else if (currentUser && user) profileComponent = '';
      return profileComponent;
    };

    return (
      <Fragment>
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ authRedirect, getUser }, dispatch);
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
