import React, { Fragment, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useDropzone } from 'react-dropzone';

import './PictureUploadAvatar.scss';
import { uploadPicture, deletePicture } from '../../src/scripts/actions';
import displayToast from '../../utils/toastMessage';
import MenuActions from './MenuActions/MenuActions';
import ModalConfirm from './ModalConfirm/ModalConfirm';

const modalConfirmContent = {
  text: 'Êtes-vous sûr(e) de vouloir supprimer cet photo ?'
};

const PictureUploadAvatarImage = ({ avatar, deletePicture: deletePictureAction, isLoadingDelete }) => {
  const { getRootProps } = useDropzone();

  const deleteLogo = () => {
    deletePictureAction(avatar).then(() => {
      displayToast('Photo supprimée', false);
    });
  };

  return (
    <div className="picture-upload-avatar-image" style={{ backgroundImage: `url(${avatar})` }}>
      <div
        className="picture-upload-avatar-image__menu-actions-wrapper" {...getRootProps({ onClick: e => e.stopPropagation() })}>
        <MenuActions onDelete={deleteLogo} isLoading={isLoadingDelete} {...modalConfirmContent} />
      </div>
      <ModalConfirm />
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ uploadPicture, deletePicture }, dispatch);
}

function mapStateToProps(state) {
  return {
    isLoading: state.pictureReducer.isLoading,
    isLoadingDelete: state.pictureReducer.isLoadingDelete,
    uploadProgress: state.pictureReducer.uploadProgress
  };
}

const ConnectPictureUploadAvatarImage = connect(mapStateToProps, mapDispatchToProps)(PictureUploadAvatarImage);

const PictureUploadAvatarDefault = ({ isLoading, uploadProgress }) => (
  <div className="picture-upload-avatar-default">
    {
      isLoading ?
        <Fragment>
          <span className="green-color">Ajout en cours... <i className="fas fa-spinner fa-spin" /></span>
          <span className="green-color">{`${uploadProgress}%`}</span>
        </Fragment> :
        <Fragment>
          <i className="fas fa-camera icon" />
          <span className="picture-upload-avatar-default__text">Glisser / déposer ou cliquer pour ajouter une photo</span>
        </Fragment>
    }
  </div>
);

const PictureUploadAvatar = ({ uploadPicture: uploadPictureAction, user, isLoading, uploadProgress }) => {
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      // Do whatever you want with the file contents
    };

    const formData = new FormData();
    acceptedFiles.forEach(file => {
      formData.append('file', file);
      formData.append('kind', 'avatar');
      uploadPictureAction('users', user.id, formData).then(() => {
        displayToast('Photo ajoutée', false);
        location.reload();
      });
    });
  }, []);
  const { getRootProps, getInputProps /* isDragActive */ } = useDropzone({
    onDrop,
    disabled: isLoading || user.avatar
  });

  return (
    <div {...getRootProps()} className={`picture-upload-avatar picture-upload-avatar__${user.role}`}>
      <input {...getInputProps()} />
      {
        user && user.avatar ?
          <ConnectPictureUploadAvatarImage modelType="users" avatar={user.avatar.attachment.large.url} /> :
          <PictureUploadAvatarDefault isLoading={isLoading} uploadProgress={uploadProgress} />
      }
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PictureUploadAvatar);
