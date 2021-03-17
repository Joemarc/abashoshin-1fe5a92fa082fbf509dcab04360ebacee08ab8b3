import React from 'react';
import ContentLoader from 'react-content-loader';

const payentFormLoader = {
  ariaLabel: false,
  speed: 4,
  className: 'payment-form-loader',
  height: 300
};

const PaymentFormLoader = () => (
  <ContentLoader {...payentFormLoader}>
    <rect x="0" y="0" rx="0" ry="0" width="400" height="150" />
    <rect x="20" y="170" rx="0" ry="0" width="150" height="10" />
    <rect x="270" y="170" rx="0" ry="0" width="110" height="10" />
    <rect x="20" y="190" rx="0" ry="0" width="220" height="10" />
    <rect x="20" y="210" rx="0" ry="0" width="360" height="40" />
  </ContentLoader>
);

export default PaymentFormLoader;