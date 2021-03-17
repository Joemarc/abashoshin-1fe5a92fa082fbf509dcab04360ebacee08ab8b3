import { OPEN_MODAL_CONFIRM, CLOSE_MODAL_CONFIRM, THEME_CONFIRM_INFO } from '../../actions';

const initialState = {
  modalConfirmIsOpen: false,
  modalConfirm: {
    title: null,
    text: 'Êtes-vous sûr(e) ?',
    theme: THEME_CONFIRM_INFO,
  },
  actionConfirm: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case OPEN_MODAL_CONFIRM:
      return {
        ...state,
        modalConfirmIsOpen: true,
        modalConfirm: action.payload.modalConfirm,
        actionConfirm: action.payload.actionConfirm
      };
    case CLOSE_MODAL_CONFIRM:
      return {
        ...state,
        modalConfirmIsOpen: false,
        content: null
      };
    default:
      return state;
  }
}
