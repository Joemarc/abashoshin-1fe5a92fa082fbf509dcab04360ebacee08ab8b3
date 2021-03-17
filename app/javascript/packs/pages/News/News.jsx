import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import {
  validateToken, getArticles, getTopArticle, getHeadArticles, getVideos
} from '../../src/scripts/actions';
import ArticleCard from "../../components/articles/articleCard";
import './News.scss'
import TopArticle from "../../components/articles/topArticle";
import VideoCard from "../../components/videos/VideoCard";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import LoaderCardArticleLarge
  from "../../components/UI/Loader/Card/Article/LoaderCardArticleLarge/LoaderCardArticleLarge";
import LoaderCardArticle from "../../components/UI/Loader/Card/Article/LoaderCardArticle";
import LoaderVideo from "../../components/UI/Loader/Video/LoaderVideo";

class News extends Component {
  componentDidMount() {
    const {validateToken: validateTokenAction} = this.props;

    validateTokenAction().then(this.getArticlesList()).catch(this.getArticlesList);
  }

  getArticlesList = () => {
    const {
      getArticles: getArticlesAction,
      getTopArticle: getTopArticleAction,
      getHeadArticles: getHeadArticlesAction,
      getVideos: getVideosActions
    } = this.props;

    return Promise.all([getArticlesAction(), getTopArticleAction(),
      getHeadArticlesAction(), getVideosActions()])
      .then(response => {
      return response;
    })
  };

  render() {
    const {
      articles, isLoading,
      isLoadingTopArticle, topArticle,
      isHeadLoading, headArticles,
      isVideosLoading, videos, currentUser
    } = this.props;

    const renderTopArticle = () => {
      let headline;
      if (isLoadingTopArticle) {
        headline = <LoaderCardArticleLarge />;
      }
      else if (topArticle) headline = <TopArticle article={topArticle} />;
      return headline;
    };

    const renderHeadArticles = () => {
      let component;
      if (isHeadLoading) {
        component = [1, 2, 3].map(i => <LoaderCardArticle key={i} />);
      } else if (headArticles.length) component = headArticles.map(a => <ArticleCard article={a} key={a.id}/>);
      else component = 'Aucun articles à afficher pour le moment';
      return component;
    };

    const renderArticles = () => {
      let component;
      if (isLoading) {
        component = [1, 2, 3, 4].map(i => <LoaderCardArticle key={i} />);
      } else if (articles.length) component = articles.map(a => <ArticleCard article={a} key={a.id}/>);
      else component = 'Aucun articles à afficher pour le moment';
      return component;
    };

    const renderVideos = () => {
      let component;
      if (isVideosLoading) {
        component = [1, 2, 3, 4].map(i => <LoaderVideo key={i} />);
      } else if (videos.length) component = videos.map(v => <VideoCard video={v} key={v.id}/>);
      else component = 'Aucun videos à afficher pour le moment';
      return component;
    };

    return (
      <>
        <Navbar user={{currentUser, isLoading}}/>
        <div className="empty-div"/>
        <div className="page-articles-container">
          {renderTopArticle() }
          <div className="headline-articles-container">
            <div className="articles-headline">
              <h1 className="title-page-articles">Articles de la semaine</h1>
            </div>
            <div className="articles-container">
              { renderHeadArticles() }
            </div>
          </div>

          <div className="page-video-container">
            <div className="videos-content">
              <h1 className="title-page">Vidéos Ressources</h1>
              <p>List de vidéos ressources visant à ...</p>
            </div>
            <div className="videos-container">
              <div className="videos-cards">
                {renderVideos()}
              </div>
            </div>
          </div>

          <div className="following-articles-container">
            <div className="following-articles-content">
              <h1 className="title-page-articles">Articles plus anciens</h1>
            </div>
            <div className="following-articles">
              {renderArticles() }
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getArticles, validateToken, getTopArticle,
    getHeadArticles, getVideos
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
    videos: state.videosReducer.videosList,
    isVideosLoading: state.videosReducer.isLoading
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(News));