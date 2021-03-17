import React from 'react';
import ContentLoader from 'react-content-loader';

const loaderSettings = {
  ariaLabel: false,
  speed: 2
};

const LoaderArticleViewHeader = () => (
  <ContentLoader {...loaderSettings}>
    <rect x="0" y="20" rx="4" ry="4" width="100" height="13" />
    <rect x="0" y="40" rx="4" ry="4" width="50" height="8" />
    <rect x="0" y="55" rx="4" ry="4" width="50" height="8" />
    <rect x="350" y="55" rx="4" ry="4" width="50" height="8" />
    <rect x="0" y="70" rx="5" ry="5" width="400" height="400" />
  </ContentLoader>
);

export default LoaderArticleViewHeader;
