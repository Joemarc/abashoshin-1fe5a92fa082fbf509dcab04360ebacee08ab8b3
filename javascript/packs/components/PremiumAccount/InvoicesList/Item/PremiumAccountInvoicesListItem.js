import React from 'react';
const moment = require('moment');

import downloadSubscriptionInvoice from './pdfInvoices';

const PremiumAccountInvoicesListItem = ({ invoice, downloadInvoice }) => {
  const download = () => {
    return downloadInvoice();
  };

  return (
    <tr className="premium-account-invoices-list-item--table--body--row">
      <td className="premium-account-invoices-list-item--table--body--cell">{invoice.product_name}</td>
      <td className="premium-account-invoices-list-item--table--body--cell">
        {moment(invoice.paid_at).locale('fr').format('Do MMM')}
      </td>
      <td className="premium-account-invoices-list-item--table--body--cell">
        {(invoice.including_all_taxes_price / 100).toFixed(2)}€
      </td>
      <td className="premium-account-invoices-list-item--table--body--cell">
        <button type="button" className="premium-account-invoices-list-item--table--body--cell--button"
                onClick={download}>
          <i className="fas fa-download" />
        </button>
      </td>
    </tr>
  );
};

const PremiumAccountHistoryListItemConnect = PremiumAccountInvoicesListItem;

export const PremiumAccountHistoryListItemSubscription = ({ invoice }) =>
  <PremiumAccountHistoryListItemConnect
    invoice={invoice}
    downloadInvoice={() => downloadSubscriptionInvoice(invoice)} />;
