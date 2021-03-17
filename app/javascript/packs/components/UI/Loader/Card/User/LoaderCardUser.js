import React from 'react';
import ContentLoader from 'react-content-loader';

import './LoaderCardUser.scss';

const loaderCardUser = {
  ariaLabel: false,
  speed: 4,
  className: 'loader-card-user',
  height: 450
};

const LoaderCardUser = () => (
  <ContentLoader {...loaderCardUser}>
    <rect x="0" y="0" rx="0" ry="0" width="400" height="200" />
    <rect x="20" y="220" rx="0" ry="0" width="280" height="10" />
    <rect x="20" y="240" rx="0" ry="0" width="220" height="10" />
    <rect x="20" y="260" rx="10" ry="10" width="10" height="10" />
    <rect x="40" y="260" rx="0" ry="0" width="180" height="10" />
    <rect x="20" y="280" rx="0" ry="0" width="240" height="10" />
    <rect x="20" y="310" rx="5" ry="5" width="360" height="35" />
    <rect x="20" y="365" rx="5" ry="5" width="160" height="35" />
    <rect x="220" y="365" rx="5" ry="5" width="160" height="35" />
    <rect x="100" y="415" rx="5" ry="5" width="200" height="20" />
  </ContentLoader>
);

export default LoaderCardUser;