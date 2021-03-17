import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import {
  validateToken, getArticles, getTopArticle, getHeadArticles
} from '../../../src/scripts/actions';
import ArticleCard from "../../../components/articles/articleCard";
import './Articles.scss'
import TopArticle from "../../../components/articles/topArticle";
import LoaderCardArticleLarge
  from "../../../components/UI/Loader/Card/Article/LoaderCardArticleLarge/LoaderCardArticleLarge";

class Articles extends Component {
  componentDidMount() {
    const {validateToken: validateTokenAction} = this.props;

    validateTokenAction().then(this.getArticlesList()).catch(this.getArticlesList);
  }

  getArticlesList = () => {
    const {
      match, getArticles: getArticlesAction,
      getTopArticle: getTopArticleAction,
      getHeadArticles: getHeadArticlesAction,
    } = this.props;

    return Promise.all([getArticlesAction(), getTopArticleAction(), getHeadArticlesAction()]).then(response => {
      return response;
    })
  };

  render() {
    const {
      articles, isLoading,
      isLoadingTopArticle, topArticle,
      isHeadLoading, headArticles
    } = this.props;

    const renderTopArticle = () => {
      let headline;
      if (isLoadingTopArticle) headline = 'd';
      else if (topArticle) headline = <TopArticle article={topArticle} />;
      return headline;
    };

    const renderHeadArticles = () => {
      let component;
      if (isHeadLoading) {
        component = [1, 2, 3].map(i => <LoaderCardArticleLarge key={i}/>);
      } else if (headArticles.length) component = headArticles.map(a => <ArticleCard article={a} key={a.id}/>);
      else component = 'Aucun articles à afficher pour le moment';
      return component;
    };

    const renderArticles = () => {
      let component;
      if (isLoading) {
        component = [1, 2, 3, 4].map(i => `${i}`);
      } else if (articles.length) component = articles.map(a => <ArticleCard article={a} key={a.id}/>);
      else component = 'Aucun articles à afficher pour le moment';
      return component;
    };

    return (
      <div className="page-articles-container">
        {renderTopArticle() }
        <div className="headline-articles-container">
          <div className="articles-headline">
            <h2 className="title-page-articles">Articles de la semaine</h2>
          </div>
          <div className="articles-container">
            { renderHeadArticles() }
          </div>
        </div>
        <div className="following-articles-container">
          <div className="following-articles-content">
            <h2 className="title-page-articles">Articles plus anciens</h2>
          </div>
          <div className="following-articles">
            {renderArticles() }
          </div>
        </div>
      </div>
    )
    ;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getArticles, validateToken, getTopArticle, getHeadArticles
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.authReducer.user,
    isLoading: state.articlesReducer.isLoading,
    articles: state.articlesReducer.articles,
    isLoadingTopArticle: state.articlesReducer.isLoadingTopArticle,
    topArticle: state.articlesReducer.topArticle,
    isHeadLoading: state.articlesReducer.isHeadLoading,
    headArticles: state.articlesReducer.headArticles,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Articles));