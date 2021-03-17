/**
 * Test if the given obj is type of object.
 *
 * @api private
 * @param {Object} item
 * @return {boolean}
 */
export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Test if the given obj is type of array.
 *
 * @api private
 * @param {Object} array
 * @return {boolean}
 */
export function isArray(array) {
  return Array.isArray(array) || array instanceof Array;
}

/**
 * Test if the given obj is type of string.
 *
 * @api private
 * @param {Object} item
 * @return {boolean}
 */
export function isString(item) {
  return typeof item === 'string';
}

/**
 * Crude, but effective.
 * @api
 * @param {*} value
 * @returns {boolean} Whether or not `value` is a Promise
 */
export function isPromise(value) {
  return typeof value === 'object' && typeof value.then === 'function';
}

export function debounce(callback, delay) {
  let timer;
  return (...args) => {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(context, args);
    }, delay);
  };
}

export function capitalize(word) {
  if (typeof word !== 'string') return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Temporary fix not to display the UI if user is not present in local storage
export function isLoggedIn() {
  let isAlreadyLoggedIn;
  const user = JSON.parse(localStorage.getItem('user'));
  const authHeaders = JSON.parse(localStorage.getItem('authHeaders'));
  if (user && authHeaders) isAlreadyLoggedIn = true;
  else {
    const redirectionUrl = window.location.pathname + window.location.search;
    localStorage.setItem('redirectionUrl', redirectionUrl);
    isAlreadyLoggedIn = false;
  }
  return isAlreadyLoggedIn;
}

export function forceRedirect(to) {
  window.location.href = to;
}

/**
 * Move an item in array from an index to another
 * @api
 * @param {array} array
 * @param {int} fromIndex
 * @param {int} toIndex
 */
export function arrayMove(array, fromIndex, toIndex) {
  const element = array[fromIndex];
  array.splice(fromIndex, 1);
  array.splice(toIndex, 0, element);
}

/**
 * Move an item in array from an index to another
 * @api
 * @param {int} fromYear
 * @param {int} toYear
 * @returns {array} range of years in an array
 */
export function generateYearsRange(fromYear, toYear) {
  const range = Math.abs(toYear - fromYear) + 1;
  return Array.from(new Array(range), (val, index) => index + fromYear);
}