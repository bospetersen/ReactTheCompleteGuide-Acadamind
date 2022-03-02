import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
// import * as reduxActions from '../../redux/store/actions/index';

class Checkout extends Component {

  // componentDidMount() {
  //   this.props.onOrderInit();
  // }


  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/order-details');
  }

  render() {

    let summery = <Redirect to="/" />
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
      summery = (
        <div>
          {purchasedRedirect}
          <CheckoutSummery
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler} />
          <Route
            path={this.props.match.url + '/order-details'}
            component={ContactData}
          />
        </div>
      )
    }
    return summery;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerReducer.ingredients,
    purchased: state.orderReducer.purchased //Giver en elle anden fejl
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onOrderInit: () => dispatch(reduxActions.purchaseInit())
//   }
// }


export default connect(mapStateToProps)(Checkout);