import React, { Component } from 'react';
import Modal from 'react-modal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './ModalConfirm.scss';
import { closeModalConfirm } from '../../../src/scripts/actions';


class ModalConfirm extends Component {
  closeModal = () => {
    const { closeModalConfirm: closeModalConfirmAction } = this.props;
    closeModalConfirmAction();
  };

  confirm = () => {
    const { actionConfirm } = this.props;
    actionConfirm();
    this.closeModal();
  };

  render() {
    const { modalConfirmIsOpen, modalConfirm } = this.props;

    return (
      <Modal
        isOpen={modalConfirmIsOpen}
        onRequestClose={this.closeModal}
        contentLabel="Confirm"
        className={`ReactModal__modal-confirm__Content--after-open ${modalConfirm.theme}`}
        bodyOpenClassName="ReactModal__modal-confirm__Body--open"
        overlayClassName="ReactModal__modal-confirm__Overlay--after-open"
      >
        <div className="modal-confirm-container">
          {
            modalConfirm.title ?
              <h1 className="modal-confirm-container__title">{modalConfirm.title}</h1> :
              null
          }
          <p className="modal-confirm-container__text">{modalConfirm.text}</p>
          <div className="modal-confirm-container__actions">
            <button onClick={this.closeModal} type="button"
                    className="modal-confirm-container__actions__button-cancel">
              Annuler
            </button>
            <button type="button" onClick={this.confirm}
                    className="modal-confirm-container__actions__button-confirm">{modalConfirm.textConfirm || 'Confirmer'}
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeModalConfirm }, dispatch);
}

function mapStateToProps(state) {
  return {
    modalConfirm: state.modalConfirmReducer.modalConfirm,
    actionConfirm: state.modalConfirmReducer.actionConfirm,
    modalConfirmIsOpen: state.modalConfirmReducer.modalConfirmIsOpen
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirm);