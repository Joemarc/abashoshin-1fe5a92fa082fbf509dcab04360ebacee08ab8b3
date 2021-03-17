import React from 'react';
import ContentLoader from 'react-content-loader';

import './LoaderCardArticleLarge.scss';

const loaderCardArticleSettings = {
  ariaLabel: false,
  speed: 4,
  className: 'loader-card-article-large',
  height: 150
};

const LoaderCardArticleLarge = () => (
  <ContentLoader {...loaderCardArticleSettings}>
    <rect x="0" y="0" rx="0" ry="0" width="1400" height="450" />
  </ContentLoader>
);

export default LoaderCardArticleLarge;
