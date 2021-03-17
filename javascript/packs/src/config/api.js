import axios from 'axios';

import configuration from './configuration';
import history from './history';
import displayToast from '../../utils/toastMessage';
import errorHandler from '../../utils/errorHandler';

const headers = JSON.parse((localStorage.getItem('authHeaders')));

const API = axios.create({
  baseURL: configuration.apiUrl,
  headers
});

API.interceptors.response.use((response) => {
  // Do something with response data
  return response;
}, (error) => {
  // Do something with response error
  const e = error.response;
  // eslint-disable-next-line default-case
  switch(e.status) {
    case 401: {
      // displayToast(e.data.errors[0], true); error is displayed from public page
      const redirectionUrl = window.location.pathname + window.location.search;
      localStorage.setItem('redirectionUrl', redirectionUrl);
      break;
    }
    case 404:
      // TODO: Go to 404 page
      history.push('/404');
      break;
    case 403:
      displayToast('Vous ne disposez pas des droits nécessaires pour effectuer cette action', true);
      break;
    case 422:
      // TODO display toast for each errors
      delete e.data.errors.full_messages; // Temporary fix in order not to display full_messages returned from the backend
      errorHandler(e.data.errors);
      break;
    case 500:
      displayToast('Une erreur est survenue', true);
      history.push('/500');
      // TODO: Go to home page
      break;
  }

  return Promise.reject(e);
})

export default API;
