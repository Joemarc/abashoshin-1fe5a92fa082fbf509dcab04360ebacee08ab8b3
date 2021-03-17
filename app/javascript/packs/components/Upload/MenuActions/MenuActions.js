import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './MenuActions.scss';
import { openModalConfirm, THEME_CONFIRM_DANGER } from '../../../src/scripts/actions';

const MenuActions = ({ onEdit, onDelete, themeClass, openModalConfirm: openModalConfirmAction, text, isLoading, textConfirm, title }) => {
  const openModalConfirmation = () => {
    const modalConfirm = { title, text, textConfirm, theme: THEME_CONFIRM_DANGER };
    openModalConfirmAction(modalConfirm, onDelete);
  };

  return (
    <div className={`menu-actions ${themeClass || 'menu-actions--white-theme'}`}>
      {
        onEdit ?
          <button type="button" onClick={onEdit}
                  className={`menu-actions__item menu-actions__item__edit${isLoading ? ' menu-actions__item--disabled' : ''}`}
                  disabled={isLoading}>
            <i className="fas fa-pencil-alt" /></button> :
          null
      }
      <button type="button" onClick={openModalConfirmation}
              className={`menu-actions__item menu-actions__item__delete${isLoading ? ' menu-actions__item--disabled' : ''}`}
              disabled={isLoading}>
        <i className="fas fa-trash" /></button>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ openModalConfirm }, dispatch);
}

function mapStateToProps(state) {
  return { modalConfirmIsOpen: state.modalConfirmReducer.modalConfirmIsOpen };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuActions);
