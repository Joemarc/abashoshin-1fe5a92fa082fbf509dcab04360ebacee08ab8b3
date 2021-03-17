import React from 'react';
import ContentLoader from 'react-content-loader';

import './LoaderPremiumAccountInvoicesListItem.scss';

const loaderPremiumAccountInvoicesListItem = {
  ariaLabel: false,
  speed: 4,
  className: 'loader-premium-account-invoices-list-item',
  height: 50
};

const LoaderPremiumAccountInvoicesListItem = () => (
  <ContentLoader {...loaderPremiumAccountInvoicesListItem}>
    <rect x="0" y="10" rx="0" ry="0" width="400" height="1" />
    <rect x="0" y="20" rx="0" ry="0" width="400" height="1" />
    <rect x="0" y="30" rx="0" ry="0" width="400" height="1" />
    <rect x="0" y="40" rx="0" ry="0" width="400" height="1" />
    <rect x="0" y="50" rx="0" ry="0" width="400" height="1" />
  </ContentLoader>
);

export default LoaderPremiumAccountInvoicesListItem;