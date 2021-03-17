import API from '../../../config/api';

import {
  GET_FORMATIONS_REQUEST, GET_FORMATIONS_FAILURE, GET_FORMATIONS_SUCCESS,
  GET_FORMATION_REQUEST, GET_FORMATION_FAILURE, GET_FORMATION_SUCCESS,
  GET_MODULES_REQUEST, GET_MODULES_FAILURE, GET_MODULES_SUCCESS
} from './FormationsTypes';

export function GetFormationsRequest() {
  return { type: GET_FORMATIONS_REQUEST };
}

export function GetFormationsSuccess(formations) {
  return {
    type: GET_FORMATIONS_SUCCESS,
    payload: formations
  };
}

export function GetFormationsFailure(error) {
  return {
    type: GET_FORMATIONS_FAILURE,
    payload: error
  };
}

export function getFormations(changingId) {
  return dispatch => {
    dispatch(GetFormationsRequest());

    return API.get(`/api/v1/formations?changing_token=${changingId}`)
      .then(response => dispatch(GetFormationsSuccess(response.data)),
        error => Promise.reject(dispatch(GetFormationsFailure(error))));
  };
}

export function GetFormationRequest() {
  return { type: GET_FORMATION_REQUEST };
}

export function GetFormationSuccess(formations) {
  return {
    type: GET_FORMATION_SUCCESS,
    payload: formations
  };
}

export function GetFormationFailure(error) {
  return {
    type: GET_FORMATION_FAILURE,
    payload: error
  };
}

export function getFormation(formationId) {
  return dispatch => {
    dispatch(GetFormationRequest());

    return API.get(`/api/v1/formations/${formationId}`)
      .then(response => dispatch(GetFormationSuccess(response.data)),
        error => Promise.reject(dispatch(GetFormationFailure(error))));
  };
}

export function GetModulesRequest() {
  return { type: GET_MODULES_REQUEST };
}

export function GetModulesSuccess(formations) {
  return {
    type: GET_MODULES_SUCCESS,
    payload: formations
  };
}

export function GetModulesFailure(error) {
  return {
    type: GET_MODULES_FAILURE,
    payload: error
  };
}

export function getModules(formationId) {
  return dispatch => {
    dispatch(GetModulesRequest());
    return API.get(`/api/v1/formations/modules?url_id=${formationId}`)
      .then(response => dispatch(GetModulesSuccess(response.data)),
        error => Promise.reject(dispatch(GetModulesFailure(error))));
  };
}

