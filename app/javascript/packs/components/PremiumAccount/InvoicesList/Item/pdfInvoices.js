import "pdfmake/build/pdfmake";
const moment = require('moment');
import pdfFonts from 'pdfmake/build/vfs_fonts';

const pdfMake = window["pdfMake"];
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const companyAddress = [
  { text: 'ABA Shoshin', bold: true },
  '31 Bis rue des Longs Prés',
  '92100 Boulogne-Billancourt',
  ' ',
  'SIREN : ',
  '830 549 432',
  ' ',
  'TVA intracommuncautaire : ',
  'FR830549532'
];

export default function downloadSubscriptionInvoice(invoice) {
  const productFullName = `${invoice.product_name}`;
  const excludingTaxPrice = invoice.excluding_tax_price / 100;
  const includingAllTaxesPrice = invoice.including_all_taxes_price / 100;
  const firstTableRow = [productFullName, '1', excludingTaxPrice.toFixed(2), includingAllTaxesPrice.toFixed(2)];
  const totalIncludingAllTaxesPrice = includingAllTaxesPrice.toFixed(2);
  const vatPrice = (includingAllTaxesPrice - excludingTaxPrice).toFixed(2);
  const paymentMethod =  'carte bancaire';

  const docDefinition = {
    content: [
      [...companyAddress],
      { text: 'Société : ABA Shoshin', margin: [250, 10, 0, 0] },
      { text: 'Adresse : 31 Bis rue des longs près, 92100 Boulogne-billancourt', margin: [250, 0, 0, 0] },
      { text: `Nom du client : ${invoice.customer.name}`, margin: [250, 0, 0, 0] },
      { text: `Référence client : ${invoice.customer.reference}`, margin: [250, 0, 0, 0] },
      { text: `Date de l'achat : ${moment(invoice.paid_at).format('DD/MM/YYYY')}`, margin: [250, 0, 0, 0] },
      { text: `Référence : ${invoice.reference}`, margin: [250, 0, 0, 0] },
      {
        style: 'tableExample',
        margin: [0, 50, 0, 50],
        table: {
          headerRows: 1,
          widths: ['*', 50, 100, 100],
          body: [
            ['Adhésion', 'Qté', 'Prix HT', 'Prix TTC'],
            firstTableRow,
            ['', '', {
              border: [false, true, false, false],
              fillColor: '#eeeeee',
              text: 'Total TTC'
            },
              {
                border: [false, true, false, false],
                fillColor: '#eeeeee',
                text: totalIncludingAllTaxesPrice
              }
            ],
            ['', '', {
              border: [false, true, false, false],
              fillColor: '#eeeeee',
              text: 'Dont TVA à 20 %'
            },
              {
                border: [false, true, false, false],
                fillColor: '#eeeeee',
                text: vatPrice
              }
            ]
          ]
        },
        layout: 'lightHorizontalLines'
      },
      `Mode de réglement : ${paymentMethod}.`,
      ' ',
      'Merci d’avoir fait confiance à ABA Shoshin'
    ]
  }

  pdfMake.createPdf(docDefinition).download(`aba-shoshin-${invoice.reference}.pdf`);
}