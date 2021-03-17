import { isArray } from './utils';
import displayToast from './toastMessage';

export default function(errorsArray) {
  let errorString = '';

  if (errorsArray && Object.keys(errorsArray).length) {
    // Iterate over each error category
    errorString = Object.keys(errorsArray).reduce((errors, category) => {
      // Iterate over each message in the category
      let categoryErrors;
      if (isArray(errorsArray[category])) {
        categoryErrors = errors + errorsArray[category].reduce((total, error) => {
          return `${total + error}<br/>`;
        }, '');
      } else {
        categoryErrors = errors + Object.keys(errorsArray[category]).reduce((total, key) => {
          return `${total + errorsArray[category][key]}<br/>`;
        }, '');
      }
      return categoryErrors;
    }, '');
  } else {
    errorString = 'Une erreur s\'est produite, merci de réessayer.';
  }
  displayToast(errorString, { warning: true });
};