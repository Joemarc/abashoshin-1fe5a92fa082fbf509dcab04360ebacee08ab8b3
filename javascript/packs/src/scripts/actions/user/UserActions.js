import API from '../../../config/api';

import {
  GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS,
  UPDATE_ME_FAILURE, UPDATE_ME_REQUEST, UPDATE_ME_SUCCESS,
  GET_MAIN_INFO_REQUEST, GET_MAIN_INFO_SUCCESS, GET_MAIN_INFO_FAILURE,
  UPDATE_PHONE_AND_NOTIFICATIONS_REQUEST,
  UPDATE_PHONE_AND_NOTIFICATIONS_SUCCESS,
  UPDATE_PHONE_AND_NOTIFICATIONS_FAILURE,
  GET_ME_REQUEST, GET_ME_SUCCESS, GET_ME_FAILURE,
  GET_USER_EDIT_REQUEST, GET_USER_EDIT_SUCCESS, GET_USER_EDIT_FAILURE,
  GET_USER_INFO_FOR_EDIT_REQUEST, GET_USER_INFO_FOR_EDIT_SUCCESS, GET_USER_INFO_FOR_EDIT_FAILURE
} from './UserTypes';

function getUserRequest() {
  return { type: GET_USER_REQUEST };
}

function getUserSuccess(user) {
  return {
    type: GET_USER_SUCCESS,
    payload: user
  };
}

function getUserFailure(error) {
  return {
    type: GET_USER_FAILURE,
    payload: error
  };
}

export function getUser() {
  return dispatch => {
    dispatch(getUserRequest());

    return API.get(`/api/v1/users/me`)
      .then(response => dispatch(getUserSuccess(response.data)),
        error => Promise.reject(dispatch(getUserFailure(error))));
  };
}

function updateMeRequest() {
  return { type: UPDATE_ME_REQUEST };
}

function updateMeSuccess(user) {
  return {
    type: UPDATE_ME_SUCCESS,
    payload: user
  };
}

function updateMeFailure(error) {
  return {
    type: UPDATE_ME_FAILURE,
    payload: error
  };
}

export function updateMe(params) {
  return dispatch => {
    dispatch(updateMeRequest());

    return API.put('/api/v1/users/update_me', params)
      .then(response => dispatch(updateMeSuccess(response.data)))
      .catch(error => Promise.reject(updateMeFailure(error)));
  };
}

function getMainInfoRequest() {
  return { type: GET_MAIN_INFO_REQUEST };
}

function getMainInfoSuccess(info) {
  return {
    type: GET_MAIN_INFO_SUCCESS,
    payload: info
  };
}

function getMainInfoFailure(error) {
  return {
    type: GET_MAIN_INFO_FAILURE,
    payload: error
  };
}

export function getMainInfo() {
  return dispatch => {
    dispatch(getMainInfoRequest());

    return API.get('api/v1/users/main_info')
      .then(response => dispatch(getMainInfoSuccess(response.data)))
      .catch(error => Promise.reject(getMainInfoFailure(error)));
  };
}

function updatePhoneAndNotificationsRequest() {
  return { type: UPDATE_PHONE_AND_NOTIFICATIONS_REQUEST };
}

function updatePhoneAndNotificationsSuccess() {
  return { type: UPDATE_PHONE_AND_NOTIFICATIONS_SUCCESS };
}

function updatePhoneAndNotificationsFailure(error) {
  return {
    type: UPDATE_PHONE_AND_NOTIFICATIONS_FAILURE,
    payload: { error }
  };
}

export function updatePhoneAndNotifications(params) {
  return dispatch => {
    dispatch(updatePhoneAndNotificationsRequest());

    return API.put('api/v1/users/update_phone_and_notifications', { ...params })
      .then(() => dispatch(updatePhoneAndNotificationsSuccess()),
        error => Promise.reject(dispatch(updatePhoneAndNotificationsFailure(error))));
  };
}

function getMeRequest() {
  return { type: GET_ME_REQUEST };
}

function getMeSuccess(info) {
  return {
    type: GET_ME_SUCCESS,
    payload: info
  };
}

function getMeFailure(error) {
  return {
    type: GET_ME_FAILURE,
    payload: error
  };
}

export function getMe() {
  return dispatch => {
    dispatch(getMeRequest());

    return API.get('api/v1/users/me')
      .then(response => dispatch(getMeSuccess(response.data)))
      .catch(error => Promise.reject(getMeFailure(error)));
  };
}

function getUserEditRequest() {
  return { type: GET_USER_EDIT_REQUEST };
}

function getUserEditSuccess(user) {
  return {
    type: GET_USER_EDIT_SUCCESS,
    payload: user
  };
}

function getUserEditFailure(error) {
  return {
    type: GET_USER_EDIT_FAILURE,
    payload: error
  };
}

export function getUserEdit(userId) {
  return dispatch => {
    dispatch(getUserEditRequest());

    return API.get(`/users/${userId}/edit`)
      .then(response => dispatch(getUserEditSuccess(response.data)),
        error => Promise.reject(dispatch(getUserEditFailure(error))));
  };
}

function getUserInfoForEditRequest() {
  return { type: GET_USER_INFO_FOR_EDIT_REQUEST };
}

function getUserInfoForEditSuccess(userInfo) {
  return {
    type: GET_USER_INFO_FOR_EDIT_SUCCESS,
    payload: userInfo
  };
}

function getUserInfoForEditFailure(error) {
  return {
    type: GET_USER_INFO_FOR_EDIT_FAILURE,
    payload: error
  };
}

export function getUserInfoForEdit() {
  return dispatch => {
    dispatch(getUserInfoForEditRequest());

    return API.get('api/v1/users/info_for_edit')
      .then(response => dispatch(getUserInfoForEditSuccess(response.data)),
        error => Promise.reject(dispatch(getUserInfoForEditFailure(error))));
  };
}