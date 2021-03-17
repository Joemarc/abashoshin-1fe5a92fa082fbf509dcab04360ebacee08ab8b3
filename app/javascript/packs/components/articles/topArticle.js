import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './topArticle.scss'

const TopArticle = ({ article }) => {
  return (
    <div className="top-article-card">
      <div className="top-article-card--image" style={{ backgroundImage: `url(${article.cover_picture ? article.cover_picture.original : 'null'})` }}/>
      <div className="top-article-card--content">
        <span className="top-article-card--content-cat">{article.category}</span>
        <h1 className="top-article-card--content-title">{article.title}</h1>
        <span className="top-article-card--content-content">{article.content}</span>
        <div className="top-article-read-more-section">
          <span className="top-article-card--content-date">{article.published_at ? moment(article.published_at).locale('FR').format('LL') : null}</span>
          <Link className="read-more-top" to={`/articles/${article.slug}`}>Voir plus <i className="fas fa-chevron-right" /></Link>
        </div>
      </div>
    </div>
  );
}

export default TopArticle;