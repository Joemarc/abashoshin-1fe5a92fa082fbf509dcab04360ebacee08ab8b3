import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadMoreComments } from '../../src/scripts/actions';

import './CommentList.scss';
import CommentListItem from './Item/CommentListItem';

class CommentList extends Component {
  loadComments = () => {
    const { loadMoreComments: loadMoreCommentsAction, model, currentPage, resource } = this.props;
    loadMoreCommentsAction(resource, model.id, { page: currentPage + 1 });
  };

  render() {
    const { comments, isLoadingMore, isLastPage, resource, model, modelName } = this.props;

    return (
      <div className="comment-list">
        <div className="comment-list--wrapper">
          <div className="comment-list--container">
            {
              comments.length ?
                null :
                <p className="comment-list--first">
                  Soyez le premier à commenter et à donner votre avis sur cet article
                </p>
            }
            {comments.map((comment) => <CommentListItem comment={comment} key={comment.id} />)}
            {
              !isLastPage ?
                <div className="comment-list--load-more-button--container">
                  <button type="button" className="comment-list--load-more-button" onClick={this.loadComments}
                          disabled={isLoadingMore}>
                    {isLoadingMore ?
                      <span>Chargement... <i className="fas fa-spinner fa-spin" /></span> :
                      'Afficher plus d\'articles'}
                  </button>
                </div> : null
            }
          </div>
          <div id="comment-create-form--wrapper">
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadMoreComments }, dispatch);
}

function mapStateToProps(state) {
  return {
    comments: state.commentsReducer.comments,
    isLoadingMore: state.commentsReducer.isLoadingMore,
    currentPage: state.commentsReducer.currentPage,
    pagesCount: state.commentsReducer.pagesCount,
    isLastPage: state.commentsReducer.isLastPage
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
