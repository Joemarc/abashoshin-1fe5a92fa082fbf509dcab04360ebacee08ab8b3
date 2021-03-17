import { combineReducers } from 'redux';

import authReducer from './auth/AuthReducer';
import authSignReducer from './auth/AuthSignReducer';
import articleReducers from './article';
import commentsReducer from './comments/CommentsReducer';
import videoReducers from "./video";
import userReducer from './user/UserReducer';
import formationsReducer from './formation/FormationsReducer'
import modalConfirmReducer from './modalConfirm/ModalConfirmReducer'
import pictureReducer from "./picture/PictureReducer";
import subscriptionReducer from "./subscription/SubscriptionReducer"
import subscriptionCreateReducer from "./subscription/SubscriptionCreateReducer"
import paymentFormReducer from "./paymentForm/PaymentFormReducer"
import subscriptionInvoicesReducer from "./subscription/SubscriptionInvoicesReducer"

export default combineReducers({
  authReducer,
  authSignReducer,
  ...articleReducers,
  commentsReducer,
  ...videoReducers,
  userReducer,
  formationsReducer,
  modalConfirmReducer,
  pictureReducer,
  subscriptionReducer,
  subscriptionCreateReducer,
  paymentFormReducer,
  subscriptionInvoicesReducer
});
