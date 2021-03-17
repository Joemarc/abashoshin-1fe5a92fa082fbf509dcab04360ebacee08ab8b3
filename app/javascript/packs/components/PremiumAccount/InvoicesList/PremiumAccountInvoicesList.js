import React from 'react';

import './PremiumAccountInvoicesList.scss';
import { PremiumAccountHistoryListItemSubscription } from './Item/PremiumAccountInvoicesListItem';

const PremiumAccountInvoicesList = ({ invoices }) => (
  <div className="premium-account-invoices-list">
    {
      Object.keys(invoices).sort().reverse().map(year => (
        <section className="premium-account-invoices-list--section">
          <h2 className="premium-account-invoices-list--section--title">Factures: {year}</h2>
          <table className="premium-account-invoices-list--table">
            <thead>
            <tr className="premium-account-invoices-list--table--header">
              <th className="premium-account-invoices-list--table--header--cell">
                Adhésion
              </th>
              <th className="premium-account-invoices-list--table--header--cell">Date</th>
              <th className="premium-account-invoices-list--table--header--cell">Total TTC</th>
              <th className="premium-account-invoices-list--table--header--cell">Télécharger</th>
            </tr>
            </thead>
            <tbody>
            {
              invoices[year].map(invoice => {
                return <PremiumAccountHistoryListItemSubscription invoice={invoice} />
              })
            }
            </tbody>
          </table>
        </section>
      ))
    }
  </div>
);


export default PremiumAccountInvoicesList;