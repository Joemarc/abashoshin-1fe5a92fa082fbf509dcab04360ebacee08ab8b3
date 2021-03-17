import API from '../../../config/api';

import {
  GET_COMMENTS_FAILURE, GET_COMMENTS_REQUEST, GET_COMMENTS_SUCCESS,
  CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS,
  LOAD_MORE_COMMENTS_FAILURE, LOAD_MORE_COMMENTS_REQUEST, LOAD_MORE_COMMENTS_SUCCESS,
  UPDATE_COMMENT_FAILURE, UPDATE_COMMENT_REQUEST, UPDATE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS
} from './CommentTypes';
import { setResponseHeaders } from '../axios';

function getCommentsRequest() {
  return { type: GET_COMMENTS_REQUEST };
}

function getCommentsSuccess(comments) {
  return {
    type: GET_COMMENTS_SUCCESS,
    payload: comments
  };
}

function getCommentsFailure(error) {
  return {
    type: GET_COMMENTS_FAILURE,
    payload: { error }
  };
}

export function getComments(resource, resourceId) {
  return dispatch => {
    dispatch(getCommentsRequest());

    return API.get(`/${resource}/${resourceId}/comments`)
      .then(response => {
        dispatch(setResponseHeaders(response.headers));
        dispatch(getCommentsSuccess(response.data));
      })
      .catch(error => Promise.reject(getCommentsFailure(error)));
  };
}

function createCommentRequest() {
  return { type: CREATE_COMMENT_REQUEST };
}

function createCommentSuccess(comment) {
  return {
    type: CREATE_COMMENT_SUCCESS,
    payload: comment
  };
}

function createCommentFailure(error) {
  return {
    type: CREATE_COMMENT_FAILURE,
    payload: error
  };
}

export function createComment(resource, resourceId, params) {
  return dispatch => {
    dispatch(createCommentRequest());

    return API.post(`/${resource}/${resourceId}/comments`, { ...params })
      .then((response) => dispatch(createCommentSuccess(response.data)))
      .catch(error => Promise.reject(createCommentFailure(error)));
  };
}

function loadMoreCommentsRequest() {
  return { type: LOAD_MORE_COMMENTS_REQUEST };
}

function loadMoreCommentsSuccess(comments) {
  return {
    type: LOAD_MORE_COMMENTS_SUCCESS,
    payload: comments
  };
}

function loadMoreCommentsFailure() {
  return { type: LOAD_MORE_COMMENTS_FAILURE };
}

export function loadMoreComments(resource, resourceId, params) {
  return dispatch => {
    dispatch(loadMoreCommentsRequest());

    return API.get(`/${resource}/${resourceId}/comments`, { params })
      .then(response => {
          dispatch(setResponseHeaders(response.headers));
          dispatch(loadMoreCommentsSuccess(response.data));
        },
        error => Promise.reject(dispatch(loadMoreCommentsFailure(error))));
  };
}

function updateCommentRequest() {
  return { type: UPDATE_COMMENT_REQUEST };
}

function updateCommentSuccess(comment) {
  return {
    type: UPDATE_COMMENT_SUCCESS,
    payload: comment
  };
}

function updateCommentFailure(error) {
  return {
    type: UPDATE_COMMENT_FAILURE,
    payload: error
  };
}

export function updateComment(comment, params) {
  return dispatch => {
    dispatch(updateCommentRequest());

    return API.put(`/comments/${comment.id}`, { ...params })
      .then((response) => dispatch(updateCommentSuccess(response.data)))
      .catch(error => Promise.reject(updateCommentFailure(error)));
  };
}

function deleteCommentRequest() {
  return { type: DELETE_COMMENT_REQUEST };
}

function deleteCommentSuccess(comment) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    payload: comment
  };
}

function deleteCommentFailure(error) {
  return {
    type: DELETE_COMMENT_FAILURE,
    payload: error
  };
}

export function deleteComment(comment) {
  return dispatch => {
    dispatch(deleteCommentRequest());

    return API.delete(`/comments/${comment.id}`)
      .then(() => dispatch(deleteCommentSuccess(comment)),
        error => Promise.reject(dispatch(deleteCommentFailure(error))));
  };
}
