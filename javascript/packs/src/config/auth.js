import Auth from 'j-toker';
import PubSub from 'pubsub-js';

import configuration from './configuration';
import errorHandler from '../../utils/errorHandler';

export default function() {
  Auth.configure({
    apiUrl: configuration.apiAuthUrl,
    storage: 'localStorage',
    confirmationSuccessUrl: () => `${window.location.origin}`,
    handleLoginResponse: (resp) => {
      const user = JSON.stringify(resp.data);
      localStorage.setItem('user', user);
    },
    handleTokenValidationResponse: (response) => {
      return response;
    }
  });
}

PubSub.subscribe('auth.emailSignIn.error', (ev, errors) => {
  errorHandler(errors);
});

PubSub.subscribe('auth.emailSignIn.success', (ev, resp) => {
  const user = JSON.stringify(resp.data);
  localStorage.setItem('user', user);
});

PubSub.subscribe('auth.emailRegistration.error', (ev, errors) => {
  const e = errors;
  delete e.errors.full_messages;
  errorHandler(e.errors);
});