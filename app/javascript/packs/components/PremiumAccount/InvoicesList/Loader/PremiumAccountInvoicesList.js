import React from 'react';
import ContentLoader from 'react-content-loader';

import LoaderPremiumAccountInvoicesListItem from './InvoicesListItem/LoaderPremiumAccountInvcoiesListItem';

const loaderPremiumAccountInvoicesList = {
  ariaLabel: false,
  speed: 4,
  className: 'loader-premium-account-invoices-list',
  height: 10
};

const LoaderPremiumAccountInvoicesListSection = key => (
  <div className="premium-account-invoices-list--section" key={key}>
    <ContentLoader {...loaderPremiumAccountInvoicesList}>
      <rect x="0" y="0" rx="0" ry="0" width="40" height="10" />
    </ContentLoader>;
    <LoaderPremiumAccountInvoicesListItem />
  </div>
);

const LoaderPremiumAccountInvoicesList = () => {
  const loader = [];
  let n = 0;
  while (n < 4) {
    loader.push(<LoaderPremiumAccountInvoicesListSection key={n} />);
    n += 1;
  }
  return <div className="premium-account-invoices-list">{loader}</div>;
};

export default LoaderPremiumAccountInvoicesList;