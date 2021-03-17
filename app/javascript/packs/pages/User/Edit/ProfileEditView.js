import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../ProfileView.scss';
import { validateToken, getUser, updateMe } from '../../../src/scripts/actions';
import Navbar from "../../../components/navbar/Navbar";
import {Field, Form} from "react-final-form";
import PictureUploadAvatar from "../../../components/Upload/PictureUploadAvatar";
import DatePicker from "react-datepicker";
import displayToast from '../../../utils/toastMessage';

import "react-datepicker/dist/react-datepicker.css";

class ProfileEditView extends Component {
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

  onSubmit = values => {
    const { updateMe: updateMeAction, getUser: getUserAction } = this.props;
    updateMeAction({...values}).then(() => {
        displayToast('Profil mis à jour avec succès', false);
        getUserAction()
          .then(this.displayPageContent)
          .catch(this.displayPageContent)
      }
    )
  };

  displayPageContent = () => this.setState({ loadingPageContent: false });

  render() {
    const { currentUser, isLoading, user, isLoadingUser, match } = this.props;
    const { loadingPageContent } = this.state;

    const DatePickerAdapter = ({ input: { onChange, value }, ...rest }) => (
      <DatePicker selected={value} onChange={date => onChange(date)} {...rest} />
    );

    const renderProfileComponent = () => {
      let profileComponent;
      if (isLoadingUser || loadingPageContent || isLoading) {
        profileComponent = 'Loading';
      } else if (user && !isLoading) {
        profileComponent = <>
          <div className="user-profile-left">
            <PictureUploadAvatar user={user} />
          </div>
          <div className="user-profile-right">
            <Form
              onSubmit={this.onSubmit}
              render={({ handleSubmit, form, values }) => (
                <form onSubmit={handleSubmit}>
                  <h3>Données de mon profil</h3>
                  <div className="user-main-infos">
                    <div className="firstname">
                      <label>Prénom</label>
                      <Field className="custom-profile-edit" name="first_name" component="input" placeholder={`${user.first_name}`} />
                    </div>
                    <div className="lastname">
                      <label>Nom</label>
                      <Field className="custom-profile-edit" name="last_name" component="input" placeholder={`${user.last_name}`} />
                    </div>
                  </div>
                  <div className="birthdate">
                    <label>Date de naissance: </label>
                    <Field className="custom-profile-edit"
                      name="birth_date"
                      dateFormat="yyyy-MM-dd"
                      component={DatePickerAdapter}
                    />
                  </div>

                  <div className="description">
                    <label>Description</label>
                    <Field className="custom-profile-edit" name="description" component="textarea" placeholder={`${user.description}`} />
                  </div>

                  <h3>Données du compte</h3>
                  <div className="user-main-infos">
                    <div className="firstname">
                      <label>E-mail</label>
                      <Field className="custom-profile-edit" name="email" component="input" placeholder={`${user.email}`} />
                    </div>
                    <div className="lastname">
                      <label>Téléphone</label>
                      <Field className="custom-profile-edit" name="phone_number" component="input" placeholder={`${user.phone_number}`} />
                    </div>
                  </div>

                  <div className="btn-to-edit">
                    <button className="btn-submit-profile" type="submit" onClick={() => this.onSubmit(values)}>Enregistrer</button>
                  </div>
                </form>
              )}
            />
          </div>
        </>;
      }
      return profileComponent;
    }

    return (
      <Fragment>
        <div className="user-profile-container">
          {renderProfileComponent()}
        </div>
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    validateToken,
    getUser,
    updateMe
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.authReducer.user,
    isLoading: state.authReducer.isLoading,
    user: state.userReducer.user,
    isLoadingUser: state.userReducer.isLoading
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditView);

