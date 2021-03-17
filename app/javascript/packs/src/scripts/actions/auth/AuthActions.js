import Auth from 'j-toker';

import {
  SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE,
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
  SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE,
  OAUTH_CONNECT_REQUEST, OAUTH_CONNECT_SUCCESS, OAUTH_CONNECT_FAILURE,
  VALIDATE_TOKEN_FAILURE, VALIDATE_TOKEN_REQUEST, VALIDATE_TOKEN_SUCCESS,
  OPEN_MODAL_AUTH, CLOSE_MODAL_AUTH
} from './AuthTypes';

function signInRequest() {
  return { type: SIGN_IN_REQUEST };
}

function signInSuccess(user) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: user
  };
}

function signInFailure(error) {
  return {
    type: SIGN_IN_FAILURE,
    payload: { error }
  };
}

export function signIn(user) {
  return dispatch => {
    dispatch(signInRequest());

    return Auth.emailSignIn({ ...user })
      .then(response => dispatch(signInSuccess(response.data)))
      .fail(error => Promise.reject(dispatch(signInFailure(error))));
  }
}

function signUpRequest() {
  return { type: SIGN_UP_REQUEST };
}

function signUpSuccess(user) {
  return {
    type: SIGN_UP_SUCCESS,
    payload: user
  };
}

function signUpFailure(error) {
  return {
    type: SIGN_UP_FAILURE,
    payload: { error }
  };
}

export function signUp(params) {
  return dispatch => {
    dispatch(signUpRequest());

    return Auth.emailSignUp({ ...params })
      .then(response => dispatch(signUpSuccess(response.data)))
      .fail(error => Promise.reject(dispatch(signUpFailure(error))));
  };
}

function signOutRequest() {
  return { type: SIGN_OUT_REQUEST };
}

function signOutSuccess() {
  return { type: SIGN_OUT_SUCCESS };
}

function signOutFailure(error) {
  return {
    type: SIGN_OUT_FAILURE,
    payload: error
  };
}

export function signOut() {
  return dispatch => {
    dispatch(signOutRequest());

    return Auth.signOut()
      .then(() => dispatch(signOutSuccess()))
      .fail(error => Promise.reject(dispatch(signOutFailure(error))));
  };
}


function oAuthRequest() {
  return { type: OAUTH_CONNECT_REQUEST };
}

function oAuthConnectSuccess(user) {
  return {
    type: OAUTH_CONNECT_SUCCESS,
    payload: user
  };
}

function oAuthConnectFailure(error) {
  return {
    type: OAUTH_CONNECT_FAILURE,
    payload: { error }
  };
}

export function oAuthConnect(provider, params) {
  return dispatch => {
    dispatch(oAuthRequest());

    return Auth.oAuthSignIn({ provider, ...params })
      .then(response => dispatch(oAuthConnectSuccess(response.data)))
      .fail(error => Promise.reject(dispatch(oAuthConnectFailure(error))));
  };
}

function validateTokenRequest() {
  return { type: VALIDATE_TOKEN_REQUEST };
}

function validateTokenSuccess(user) {
  return {
    type: VALIDATE_TOKEN_SUCCESS,
    payload: { ...user }
  };
}

function validateTokenFailure(error) {
  return {
    type: VALIDATE_TOKEN_FAILURE,
    payload: error
  };
}

export function validateToken() {
  return dispatch => {
    dispatch(validateTokenRequest());

    return Auth.validateToken()
      .then(response => dispatch(validateTokenSuccess(response.data)))
      .fail(error => Promise.reject(dispatch(validateTokenFailure(error))));
  };
}

export function authRedirect(role) {
  return dispatch => {
    dispatch(validateTokenRequest());

    return Auth.validateToken()
      .then(response => {
        const user = response.data;
        if (user) {
          const userData = Auth.retrieveData('user');
          Object.keys(userData).forEach(key => {
            // or user.hasOwnProperty(key)
            if (key in user) user[key] = userData[key];
          });
        }
        localStorage.setItem('user', JSON.stringify(user));
        return dispatch(validateTokenSuccess(user));
      })
      .fail(error => {
        Promise.reject(dispatch(validateTokenFailure(error)));
        const redirectionUrl = window.location.pathname + window.location.search;
        localStorage.setItem('redirectionUrl', redirectionUrl);
        window.location.href = '/';
      });
  };
}

export function openModalAuth() {
  return { type: OPEN_MODAL_AUTH };
}

export function closeModalAuth() {
  return { type: CLOSE_MODAL_AUTH };
}