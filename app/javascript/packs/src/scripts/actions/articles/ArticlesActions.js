import API from '../../../config/api';

import {
  GET_ARTICLE_FAILURE, GET_ARTICLE_REQUEST, GET_ARTICLE_SUCCESS,
  GET_ARTICLES_REQUEST, GET_ARTICLES_FAILURE, GET_ARTICLES_SUCCESS,
  LOAD_MORE_ARTICLES_FAILURE, LOAD_MORE_ARTICLES_REQUEST, LOAD_MORE_ARTICLES_SUCCESS,
  LOAD_MORE_RESOURCE_ARTICLES_REQUEST, LOAD_MORE_RESOURCE_ARTICLES_FAILURE, LOAD_MORE_RESOURCE_ARTICLES_SUCCESS,
  RESET_ARTICLES, GET_TOP_ARTICLE_FAILURE, GET_TOP_ARTICLE_REQUEST, GET_TOP_ARTICLE_SUCCESS,
  GET_HEAD_ARTICLES_FAILURE, GET_HEAD_ARTICLES_REQUEST, GET_HEAD_ARTICLES_SUCCESS,
} from './ArticlesTypes';

import { setResponseHeaders } from '../axios';


function getArticleRequest() {
  return { type: GET_ARTICLE_REQUEST };
}

function getArticleSuccess(article) {
  return {
    type: GET_ARTICLE_SUCCESS,
    payload: article
  };
}

function getArticleFailure(error) {
  return {
    type: GET_ARTICLE_FAILURE,
    payload: error
  };
}

export function getArticle(articleSlug) {
  return dispatch => {
    dispatch(getArticleRequest());

    return API.get(`/api/v1/articles/${articleSlug}`)
      .then(response => dispatch(getArticleSuccess(response.data)))
      .catch(error => Promise.reject(dispatch(getArticleFailure(error))));
  };
}

function getTopArticleRequest() {
  return { type: GET_TOP_ARTICLE_REQUEST };
}

function getTopArticleSuccess(article) {
  return {
    type: GET_TOP_ARTICLE_SUCCESS,
    payload: article
  };
}

function getTopArticleFailure(error) {
  return {
    type: GET_TOP_ARTICLE_FAILURE,
    payload: error
  };
}

export function getTopArticle() {
  return dispatch => {
    dispatch(getTopArticleRequest());

    return API.get('/api/v1/articles/top')
      .then(response => dispatch(getTopArticleSuccess(response.data)))
      .catch(error => Promise.reject(dispatch(getTopArticleFailure(error))));
  };
}

export function GetArticlesRequest() {
  return { type: GET_ARTICLES_REQUEST };
}

export function GetArticlesSuccess(articles) {
  return {
    type: GET_ARTICLES_SUCCESS,
    payload: articles
  };
}

export function GetArticlesFailure(error) {
  return {
    type: GET_ARTICLES_FAILURE,
    payload: error
  };
}

export function getArticles(params) {
  return dispatch => {
    dispatch(GetArticlesRequest());

    return API.get('/api/v1/articles', { params })
      .then(response => dispatch(GetArticlesSuccess(response.data)),
        error => Promise.reject(dispatch(GetArticlesFailure(error))));
  };
}

export function GetHeadArticlesRequest() {
  return { type: GET_HEAD_ARTICLES_REQUEST };
}

export function GetHeadArticlesSuccess(articles) {
  return {
    type: GET_HEAD_ARTICLES_SUCCESS,
    payload: articles
  };
}

export function GetHeadArticlesFailure(error) {
  return {
    type: GET_HEAD_ARTICLES_FAILURE,
    payload: error
  };
}

export function getHeadArticles() {
  return dispatch => {
    dispatch(GetHeadArticlesRequest());

    return API.get('/api/v1/articles/headline')
      .then(response => dispatch(GetHeadArticlesSuccess(response.data)),
        error => Promise.reject(dispatch(GetHeadArticlesFailure(error))));
  };
}


export function loadMoreArticlesRequest() {
  return { type: LOAD_MORE_ARTICLES_REQUEST };
}

export function loadMoreArticlesSuccess(articles) {
  return {
    type: LOAD_MORE_ARTICLES_SUCCESS,
    payload: articles
  };
}

export function loadMoreArticlesFailure(error) {
  return {
    type: LOAD_MORE_ARTICLES_FAILURE,
    payload: error
  };
}

export function loadMoreArticles(params) {
  return dispatch => {
    dispatch(loadMoreArticlesRequest());

    return API.get('/articles', { params })
      .then(response => dispatch(loadMoreArticlesSuccess(response.data)),
        error => Promise.reject(dispatch(loadMoreArticlesFailure(error))));
  };
}

export function resetArticles() {
  return { type: RESET_ARTICLES };
}
