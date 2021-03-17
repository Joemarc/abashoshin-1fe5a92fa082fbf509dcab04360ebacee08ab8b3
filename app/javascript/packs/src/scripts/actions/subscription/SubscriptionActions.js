import API from '../../../config/api';

import {
  CREATE_SUBSCRIPTION_REQUEST, CREATE_SUBSCRIPTION_SUCCESS, CREATE_SUBSCRIPTION_FAILURE,
  GET_CURRENT_SUBSCRIPTION_REQUEST, GET_CURRENT_SUBSCRIPTION_SUCCESS, GET_CURRENT_SUBSCRIPTION_FAILURE,
  CALCULATE_PRORATION_REQUEST, CALCULATE_PRORATION_SUCCESS, CALCULATE_PRORATION_FAILURE,
  SWITCH_SUBSCRIPTION_REQUEST, SWITCH_SUBSCRIPTION_SUCCESS, SWITCH_SUBSCRIPTION_FAILURE,
  GET_INVOICES_REQUEST, GET_INVOICES_SUCCESS, GET_INVOICES_FAILURE,
  CANCEL_SUBSCRIPTION_REQUEST, CANCEL_SUBSCRIPTION_SUCCESS, CANCEL_SUBSCRIPTION_FAILURE
} from './SubscriptionTypes';

function createSubscriptionRequest() {
  return {
    type: CREATE_SUBSCRIPTION_REQUEST
  };
}

function createSubscriptionSuccess(subscription) {
  return {
    type: CREATE_SUBSCRIPTION_SUCCESS,
    payload: subscription
  };
}

function createSubscriptionFailure(error) {
  return {
    type: CREATE_SUBSCRIPTION_FAILURE,
    payload: { error }
  };
}

export function createSubscription(subscription) {
  return dispatch => {
    dispatch(createSubscriptionRequest());

    return API.post('/api/v1/subscriptions', { subscription })
      .then(response => dispatch(createSubscriptionSuccess(response.data)),
        error => Promise.reject(dispatch(createSubscriptionFailure(error))));
  };
}

function getCurrentSubscriptionRequest() {
  return {
    type: GET_CURRENT_SUBSCRIPTION_REQUEST
  };
}

function getCurrentSubscriptionSuccess(currentSubscription) {
  return {
    type: GET_CURRENT_SUBSCRIPTION_SUCCESS,
    payload: currentSubscription
  };
}

function getCurrentSubscriptionFailure(error) {
  return {
    type: GET_CURRENT_SUBSCRIPTION_FAILURE,
    payload: { error }
  };
}

export function getCurrentSubscription() {
  return dispatch => {
    dispatch(getCurrentSubscriptionRequest());

    return API.get('subscriptions/current')
      .then(response => dispatch(getCurrentSubscriptionSuccess(response.data)),
        error => Promise.reject(dispatch(getCurrentSubscriptionFailure(error))));
  };
}

function calculateProrationRequest() {
  return {
    type: CALCULATE_PRORATION_REQUEST
  };
}

function calculateProrationSuccess(currentSubscription) {
  return {
    type: CALCULATE_PRORATION_SUCCESS,
    payload: { ...currentSubscription }
  };
}

function calculateProrationFailure(error) {
  return {
    type: CALCULATE_PRORATION_FAILURE,
    payload: { error }
  };
}

export function calculateProration(subscription) {
  return dispatch => {
    dispatch(calculateProrationRequest());

    return API.post('subscriptions/calculate_proration', { subscription })
      .then(response => dispatch(calculateProrationSuccess(response.data)),
        error => Promise.reject(dispatch(calculateProrationFailure(error))));
  };
}

function switchSubscriptionRequest() {
  return {
    type: SWITCH_SUBSCRIPTION_REQUEST
  };
}

function switchSubscriptionSuccess() {
  return {
    type: SWITCH_SUBSCRIPTION_SUCCESS
  };
}

function switchSubscriptionFailure(error) {
  return {
    type: SWITCH_SUBSCRIPTION_FAILURE,
    payload: { error }
  };
}

export function switchSubscription(subscription) {
  return dispatch => {
    dispatch(switchSubscriptionRequest());

    return API.post('subscriptions/switch', { subscription })
      .then(() => dispatch(switchSubscriptionSuccess()),
        error => Promise.reject(dispatch(switchSubscriptionFailure(error))));
  };
}

function getInvoicesRequest() {
  return {
    type: GET_INVOICES_REQUEST
  };
}

function getInvoicesSuccess(invoices) {
  return {
    type: GET_INVOICES_SUCCESS,
    payload: invoices
  };
}

function getInvoicesFailure(error) {
  return {
    type: GET_INVOICES_FAILURE,
    payload: { error }
  };
}

export function getInvoices() {
  return dispatch => {
    dispatch(getInvoicesRequest());

    return API.get('/api/v1/subscriptions/invoices')
      .then(response => dispatch(getInvoicesSuccess(response.data)),
      error => Promise.reject(dispatch(getInvoicesFailure(error))));
  };
}

function cancelSubscriptionRequest() {
  return {
    type: CANCEL_SUBSCRIPTION_REQUEST
  };
}

function cancelSubscriptionSuccess() {
  return {
    type: CANCEL_SUBSCRIPTION_SUCCESS
  };
}

function cancelSubscriptionFailure(error) {
  return {
    type: CANCEL_SUBSCRIPTION_FAILURE,
    payload: { error }
  };
}

export function cancelSubscription(id) {
  return dispatch => {
    dispatch(cancelSubscriptionRequest());

    return API.post(`subscriptions/${id}/cancel`)
      .then(() => dispatch(cancelSubscriptionSuccess()),
        error => Promise.reject(dispatch(cancelSubscriptionFailure(error))));
  };
}