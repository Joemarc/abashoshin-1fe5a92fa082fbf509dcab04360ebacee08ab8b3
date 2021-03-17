import { OPEN_MODAL_CONFIRM, CLOSE_MODAL_CONFIRM } from './ModalConfirmTypes';

export function openModalConfirm(modalConfirm, actionConfirm) {
  return {
    type: OPEN_MODAL_CONFIRM,
    payload: { modalConfirm, actionConfirm }
  };
}

export function closeModalConfirm() {
  return { type: CLOSE_MODAL_CONFIRM };
}