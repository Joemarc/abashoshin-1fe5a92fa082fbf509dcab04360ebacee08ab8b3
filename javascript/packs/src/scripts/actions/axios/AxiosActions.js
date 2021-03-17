import {
  SET_RESPONSE_HEADERS,
  SET_INTERCEPTOR_UPLOAD_PROGRESS, SET_INTERCEPTOR_DOWNLOAD_PROGRESS
} from './AxiosTypes';

export function setResponseHeaders(headers) {
  return {
    type: SET_RESPONSE_HEADERS,
    payload: headers
  };
}

export function setInterceptorUploadProgress(progress) {
  return {
    type: SET_INTERCEPTOR_UPLOAD_PROGRESS,
    payload: progress
  };
}

export function setInterceptorDownloadProgress(progress) {
  return {
    type: SET_INTERCEPTOR_DOWNLOAD_PROGRESS,
    payload: progress
  };
}
