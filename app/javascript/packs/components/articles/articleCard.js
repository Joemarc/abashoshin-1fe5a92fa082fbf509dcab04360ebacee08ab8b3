import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './articleCard.scss'

const ArticleCard = ({ article }) => {
    return (
      <div className="article-card">
        <div className="article-card--image" style={{ backgroundImage: `url(${article.cover_picture ? article.cover_picture.large : 'null'})` }}/>
        <div className="article-card--content">
          <span className="article-card--content-cat">{article.category}</span>
          <h2 className="article-card--content-title">{article.title}</h2>
          <span className="article-card--content-content">{article.content}</span>
          <div className="read-more-section">
            <span className="article-card--content-date">{article.published_at ? moment(article.published_at).locale('FR').format('LL') : null}</span>
            <Link className="read-more" to={`/articles/${article.slug}`}>Voir plus</Link>
          </div>
        </div>
      </div>
    );
}

export default ArticleCard;