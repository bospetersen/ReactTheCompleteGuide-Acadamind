import React from 'react';
import { connect } from 'react-redux';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
// import * as reduxActions from '../../redux/store/actions/index';

const Checkout = props => {

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  }
  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/order-details');
  }



  let summery = <Redirect to="/" />
  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null
    summery = (
      <div>
        {purchasedRedirect}
        <CheckoutSummery
          ingredients={props.ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler} />
        <Route
          path={props.match.url + '/order-details'}
          component={ContactData}
        />
      </div>
    )
  }
  return summery;
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