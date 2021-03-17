import { combineReducers } from 'redux';

import authReducer from './auth/AuthReducer';
import authSignReducer from './auth/AuthSignReducer';
import articleReducers from './article';
import commentsReducer from './comments/CommentsReducer';
import videoReducers from "./video";
import userReducer from './user/UserReducer';
import formationsReducer from './formation/FormationsReducer'

export default combineReducers({
  authReducer,
  authSignReducer,
  ...articleReducers,
  commentsReducer,
  ...videoReducers,
  userReducer,
  formationsReducer
});
