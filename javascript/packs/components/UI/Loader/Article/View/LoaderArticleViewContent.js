import React from 'react';
import ContentLoader from 'react-content-loader';

const loaderSettings = {
  ariaLabel: false,
  speed: 2,
  height: 330,
};

const LoaderArticleViewContent = () => (
  <ContentLoader {...loaderSettings}>
    <rect x="0" y="20" rx="4" ry="4" width="400" height="15" />
    <rect x="0" y="50" rx="4" ry="4" width="400" height="15" />
    <rect x="0" y="80" rx="4" ry="4" width="400" height="15" />
    <rect x="0" y="110" rx="4" ry="4" width="400" height="15" />
    <rect x="0" y="140" rx="4" ry="4" width="400" height="15" />
    <rect x="0" y="170" rx="4" ry="4" width="400" height="15" />
    <rect x="0" y="200" rx="4" ry="4" width="400" height="15" />
    <rect x="0" y="230" rx="4" ry="4" width="400" height="15" />
    <rect x="0" y="260" rx="4" ry="4" width="400" height="15" />
    <rect x="0" y="290" rx="4" ry="4" width="400" height="15" />
  </ContentLoader>
);

export default LoaderArticleViewContent;
