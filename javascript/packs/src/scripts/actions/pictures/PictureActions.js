import API from '../../../config/api';

import {
  GET_PICTURES_REQUEST, GET_PICTURES_SUCCESS, GET_PICTURES_FAILURE,
  UPLOAD_PICTURE_REQUEST, UPLOAD_PICTURE_SUCCESS, UPLOAD_PICTURE_FAILURE,
  DELETE_PICTURE_REQUEST, DELETE_PICTURE_SUCCESS, DELETE_PICTURE_FAILURE
} from './PicturesTypes';

import { setInterceptorUploadProgress } from '../axios';

function getPicturesRequest() {
  return { type: GET_PICTURES_REQUEST };
}

function getPicturesSuccess(pictures) {
  return {
    type: GET_PICTURES_SUCCESS,
    payload: pictures
  };
}

function getPicturesFailure(error) {
  return {
    type: GET_PICTURES_FAILURE,
    payload: error
  };
}

export function getPictures() {
  return dispatch => {
    dispatch(getPicturesRequest());

    return API.get(`/api/v1/pictures`)
      .then(response => dispatch(getPicturesSuccess(response.data)),
        errror => Promise.reject(dispatch(getPicturesFailure(errror))));
  };
}

function uploadPictureRequest() {
  return { type: UPLOAD_PICTURE_REQUEST };
}

function uploadPictureSuccess(picture) {
  return {
    type: UPLOAD_PICTURE_SUCCESS,
    payload: picture
  };
}

function uploadPictureFailure(error) {
  return {
    type: UPLOAD_PICTURE_FAILURE,
    payload: error
  };
}

export function uploadPicture(resource, resourceId, picture) {
  return dispatch => {
    dispatch(uploadPictureRequest());

    return API.post(`/api/v1/${resource}/${resourceId}/pictures`, picture, {
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
        dispatch(setInterceptorUploadProgress(percentCompleted));
      }
    }).then(response => dispatch(uploadPictureSuccess(response)),
      errror => Promise.reject(dispatch(uploadPictureFailure(errror))));
  };
}

function deletePictureRequest() {
  return { type: DELETE_PICTURE_REQUEST };
}

function deletePictureSuccess(picture) {
  return {
    type: DELETE_PICTURE_SUCCESS,
    payload: picture
  };
}

function deletePictureFailure(error) {
  return {
    type: DELETE_PICTURE_FAILURE,
    payload: error
  };
}

export function deletePicture(picture) {
  return dispatch => {
    dispatch(deletePictureRequest());

    return API.delete(`/api/v1/pictures/${picture.id}`)
      .then(() => dispatch(deletePictureSuccess(picture)),
        errror => Promise.reject(dispatch(deletePictureFailure(errror))));
  };
}
