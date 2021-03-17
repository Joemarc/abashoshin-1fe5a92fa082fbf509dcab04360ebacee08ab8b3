import React from 'react';
import ContentLoader from 'react-content-loader';

const loaderSettings = {
  ariaLabel: false,
  speed: 2
};

const LoaderComment = () => (
  <ContentLoader {...loaderSettings}>
    <rect x="70" y="10" rx="4" ry="4" width="117" height="6" />
    <rect x="70" y="25" rx="3" ry="3" width="85" height="6" />
    <rect x="70" y="45" rx="3" ry="3" width="250" height="6" />
    <circle cx="30" cy="30" r="30" />
  </ContentLoader>
);

export default LoaderComment;
