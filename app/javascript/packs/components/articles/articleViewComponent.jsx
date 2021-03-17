import React from 'react';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';

import './articleViewComponent.scss'

const ArticleViewComponent = ({ article }) => {
  const twitterUrl = `https://twitter.com/share?source=tweetbutton&text=${article.title}&url=http://localhost:3000/${article.slug}`;
  const fbUrl = `https://www.facebook.com/sharer.php?u=http://localhost:3000/${article.slug}`;
  const pinterestUrl = `https://pinterest.com/pin/create/button/?url=http://localhost:3000/${article.slug}+&media=${article.cover_picture.large}+&description=${article.title}`;

  return (
      <div>
        <div className="article-cover" style={{ backgroundImage: `url(${article.cover_picture ? article.cover_picture.original : 'null'})` }} />
        <div className="article-header">
          <div className="top-content">
            <span className="article-cat">{article.category}</span>
            <Link className="article-return" to="/ressources">
              <i className="fas fa-long-arrow-alt-left" />
               Retourner aux articles
            </Link>
          </div>

          <h1 className="article-title">{article.title}</h1>
          <div className="top-content divider">
            <div className="date-article">
              {moment(article.published_at).locale('FR').format('LL')}
            </div>
            <div className="social-media">
              <a href={twitterUrl} target="_blank"><i className="fab fa-twitter" /></a>
              <a href={fbUrl} target="_blank"><i className="fab fa-facebook" /></a>
              <a href={pinterestUrl}><i className="fab fa-pinterest" /></a>
            </div>
          </div>
          <div className="article-content" >
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </div>
      </div>
    );
}

export default withRouter(ArticleViewComponent);