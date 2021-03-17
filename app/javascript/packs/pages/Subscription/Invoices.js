import React, {Component} from 'react';
import { getInvoices } from '../../src/scripts/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PremiumAccountInvoicesList from "../../components/PremiumAccount/InvoicesList/PremiumAccountInvoicesList";
import LoaderPremiumAccountInvoicesList
  from '../../components/PremiumAccount/InvoicesList/Loader/PremiumAccountInvoicesList';

class Invoices extends Component {
  componentDidMount() {
    const { getInvoices: getInvoicesActions } = this.props;
    getInvoicesActions();
  }
  render() {
    const { isLoading, loadingInvoices, invoices } = this.props;

    const renderInvoices = () => {
      let component;
      if (isLoading || loadingInvoices) component = <LoaderPremiumAccountInvoicesList />;
      else if (invoices) component = <PremiumAccountInvoicesList invoices={invoices} type="subscription" />;
      else component = 'Vous n\'avez pas de facture à afficher';
      return component;
    };

    return renderInvoices();
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getInvoices
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.authReducer.user,
    isLoading: state.authReducer.isLoading,
    invoices: state.subscriptionInvoicesReducer.invoices,
    loadingInvoices: state.subscriptionInvoicesReducer.isLoading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoices);