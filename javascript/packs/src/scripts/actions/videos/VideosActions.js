import API from '../../../config/api';

import {
  GET_VIDEO_FAILURE, GET_VIDEO_REQUEST, GET_VIDEO_SUCCESS,
  GET_VIDEOS_REQUEST, GET_VIDEOS_FAILURE, GET_VIDEOS_SUCCESS,
  LOAD_MORE_VIDEOS_FAILURE, LOAD_MORE_VIDEOS_REQUEST, LOAD_MORE_VIDEOS_SUCCESS,
  LOAD_MORE_RESOURCE_VIDEOS_REQUEST, LOAD_MORE_RESOURCE_VIDEOS_FAILURE, LOAD_MORE_RESOURCE_VIDEOS_SUCCESS,
  RESET_VIDEOS, GET_TOP_VIDEO_FAILURE, GET_TOP_VIDEO_REQUEST, GET_TOP_VIDEO_SUCCESS
} from './VideosTypes';

import { setResponseHeaders } from '../axios';


function getVideoRequest() {
  return { type: GET_VIDEO_REQUEST };
}

function getVideoSuccess(article) {
  return {
    type: GET_VIDEO_SUCCESS,
    payload: article
  };
}

function getVideoFailure(error) {
  return {
    type: GET_VIDEO_FAILURE,
    payload: error
  };
}

export function getVideo(articleSlug) {
  return dispatch => {
    dispatch(getVideoRequest());

    return API.get(`/api/v1/videos/${articleSlug}`)
      .then(response => dispatch(getVideoSuccess(response.data)))
      .catch(error => Promise.reject(dispatch(getVideoFailure(error))));
  };
}

function getTopVideoRequest() {
  return { type: GET_TOP_VIDEO_REQUEST };
}

function getTopVideoSuccess(article) {
  return {
    type: GET_TOP_VIDEO_SUCCESS,
    payload: article
  };
}

function getTopVideoFailure(error) {
  return {
    type: GET_TOP_VIDEO_FAILURE,
    payload: error
  };
}

export function getTopVideo() {
  return dispatch => {
    dispatch(getTopVideoRequest());

    return API.get('/api/v1/videos/top')
      .then(response => dispatch(getTopVideoSuccess(response.data)))
      .catch(error => Promise.reject(dispatch(getTopVideoFailure(error))));
  };
}

export function GetVideosRequest() {
  return { type: GET_VIDEOS_REQUEST };
}

export function GetVideosSuccess(videos) {
  return {
    type: GET_VIDEOS_SUCCESS,
    payload: videos
  };
}

export function GetVideosFailure(error) {
  return {
    type: GET_VIDEOS_FAILURE,
    payload: error
  };
}

export function getVideos(params) {
  return dispatch => {
    dispatch(GetVideosRequest());

    return API.get('/api/v1/videos', { params })
      .then(response => dispatch(GetVideosSuccess(response.data)),
        error => Promise.reject(dispatch(GetVideosFailure(error))));
  };
}


export function loadMoreVideosRequest() {
  return { type: LOAD_MORE_VIDEOS_REQUEST };
}

export function loadMoreVideosSuccess(videos) {
  return {
    type: LOAD_MORE_VIDEOS_SUCCESS,
    payload: videos
  };
}

export function loadMoreVideosFailure(error) {
  return {
    type: LOAD_MORE_VIDEOS_FAILURE,
    payload: error
  };
}

export function loadMoreVideos(params) {
  return dispatch => {
    dispatch(loadMoreVideosRequest());

    return API.get('/videos', { params })
      .then(response => dispatch(loadMoreVideosSuccess(response.data)),
        error => Promise.reject(dispatch(loadMoreVideosFailure(error))));
  };
}

export function resetVideos() {
  return { type: RESET_VIDEOS };
}
