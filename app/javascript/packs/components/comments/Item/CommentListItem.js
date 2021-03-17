import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './CommentListItem.scss';
const modalConfirm = {
  text: 'Êtes-vous sûr(e) de vouloir supprimer ce commentaire ?',
  theme: THEME_CONFIRM_DANGER
};

class CommentListItem extends Component {
  constructor(props) {
    super(props);

    this.state = { displayEditForm: false };
  }

  showEditForm = () => this.setState({ displayEditForm: true });

  hideEditForm = () => this.setState({ displayEditForm: false });

  deleteCommentItem = (comment) => {
    const { deleteComment: deleteCommentAction } = this.props;
    deleteCommentAction(comment).then(() => {
      displayToast('Commentaire supprimé');
    });
  };

  render() {
    const { currentUser, comment, isLoadingUpdate, isLoadingDelete } = this.props;
    const { displayEditForm } = this.state;

    return (
      <div className="comment-list-item">
        <div className="comment-list-item--left-content">
        </div>

        <div className="comment-list-item--right-content">
          <Link to={`/profile/${comment.user.slug}`} className="comment-list-item--author-name">
            {comment.user.firstname}
          </Link>
          <div className="comment-list-item--date">
            <small>{moment(comment.created_at).format('DD/MM/YYYY à HH:mm')}</small>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({  }, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.authReducer.user,
    isLoadingUpdate: state.commentsReducer.isLoadingUpdate,
    isLoadingDelete: state.commentsReducer.isLoadingDelete
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListItem);
