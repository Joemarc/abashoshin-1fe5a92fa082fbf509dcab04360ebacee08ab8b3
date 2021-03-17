import React from 'react';
import ContentLoader from 'react-content-loader';

import './LoaderCardArticle.scss';

const loaderCardArticleSettings = {
  ariaLabel: false,
  speed: 4,
  height: 250
};

const LoaderCardArticle = ({ cardSize }) => (
  <ContentLoader {...loaderCardArticleSettings}  className={`loader-card-article ${cardSize}`}>
    <rect x="0" y="0" rx="0" ry="0" width="300" height="130" />
    <rect x="0" y="160" rx="0" ry="0" width="200" height="8" />
    <rect x="0" y="180" rx="0" ry="0" width="320" height="10" />
    <rect x="0" y="200" rx="0" ry="0" width="120" height="6" />
  </ContentLoader>
);

LoaderCardArticle.defaultProps = { cardSize: '' };

export default LoaderCardArticle;
