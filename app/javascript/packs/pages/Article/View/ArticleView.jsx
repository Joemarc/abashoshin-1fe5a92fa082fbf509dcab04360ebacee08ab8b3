import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ArticleViewComponent from '../../../components/articles/articleViewComponent.jsx';

import {
  validateToken, getArticle, getComments,
} from '../../../src/scripts/actions';

import './ArticleView.scss';
import ArticleCard from "../../../components/articles/articleCard";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/navbar/Navbar";
import LoaderCardArticle from "../../../components/UI/Loader/Card/Article/LoaderCardArticle";
import LoaderArticleView from "../../../components/UI/Loader/Card/Article/View/LoaderArticleView";
// import CommentList from '../../../components/Comment/List/CommentList';

//const ArticleViewLatest = ({ latest }) => latest.map(article => <ArticleCard article={article} key={article.id} />);

class ArticleView extends Component {
  constructor(props) {
    super(props);

    this.state = { loadingPageContent: true };
  }

  componentDidMount() {
    const { validateToken: validateTokenAction } = this.props;

    validateTokenAction().then(() => {
      this.getArticleView().then(response => {
        const article = response[0].payload;
        if (article.status === 'published') getCommentsAction('articles', article.id, { page: 1 });
      });
    }).catch(this.getArticleView);
  }

  componentDidUpdate(prevProps) {
    const { match, getComments: getCommentsAction, currentUser } = this.props;

    if (prevProps.match.params.articleSlug !== match.params.articleSlug) {
      this.setLoadingPageContent(); // Do not show comment list section while loading new article
      this.getArticleView().then(response => {
        const article = response[0].payload;
        if (currentUser && article.status === 'published') {
          getCommentsAction('articles', article.id, { page: 1 });
        }
      });
    }
  }

  getArticleView = () => {
    const {
      match, getArticle: getArticleAction
    } = this.props;

    const getArticlePromise = getArticleAction(match.params.id);

    return Promise.all([getArticlePromise]).then(response => {
      this.updateLoadingPageContent();
      return response;
    })
      .catch(this.updateLoadingPageContent);
  };

  updateLoadingPageContent = () => {
    this.setState({ loadingPageContent: false });
    window.prerenderReady = true
  };

  setLoadingPageContent = () => this.setState({ loadingPageContent: true });

  render() {
    const renderArticle = () => {
      let component;
      if (article) {
        component = <ArticleViewComponent article={article} />
      } else if (isLoading || this.state.loadingPageContent) component = <LoaderArticleView />;
      return component;
    };

    const renderLatestArticles = () => {
      let component;
      if (article) {
        component = article.latest.map(a => <ArticleCard article={a} key={a.id} />);
      } else if (isLoading || this.state.loadingPageContent ) component = [1, 2, 3].map(i => <LoaderCardArticle key={i}/>);
      return component
    }

    const {
      isLoading, article, currentUser, isLoadingComments
    } = this.props;

    return (
      <>
        <Navbar />
        {renderArticle()}
        <div className="article-view">
          <h3>Articles Similaires</h3>
          <div className="article-related">
            {renderLatestArticles()}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getArticle, getComments, validateToken
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.authReducer.user,
    article: state.articleReducer.article,
    isLoading: state.articleReducer.isLoading,
    latestArticles: state.articleReducer.latest,
    comments: state.commentsReducer.comments,
    isLoadingComments: state.commentsReducer.isLoading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleView);
