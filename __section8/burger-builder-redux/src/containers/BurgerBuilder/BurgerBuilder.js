import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actionType from '../../redux/store/actions/actionTypes';
import * as reduxActions from '../../redux/store/actions/index';


import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildContols'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
// import Error from '../../components/UI/Error/Error';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios/axios-orders';


export class BurgerBuilder extends Component {

  state = {
    purchasing: false,
    error: false
  }

  componentWillMount() {
    this.props.onInitIngr();
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.onOrderInit();
    this.props.history.push('/checkout');
  }

  updatePurchaseState(ingredients) {

    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }


  render() {

    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummery = null;

    // if (this.state.showError) {
    //   orderSummery = <Error />
    // }
    let burger = this.props.error ? <p>Ingredients can´t be loaded!</p> : <Spinner>Loading...</Spinner>

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            indgredientAdded={this.props.onAddIngr}
            indgredientRemoved={this.props.onRemoveIngr}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummery = <OrderSummery
        ingredients={this.props.ings}
        continueOrder={this.purchaseContinueHandler}
        cancelOrder={this.purchaseCancelHandler}
        price={this.props.price.toFixed(2)}
      />;
    }
    // if (this.state.loading) {
    //   orderSummery = <Spinner />
    // }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummery}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    error: state.burgerReducer.error,
    isAuthenticated: state.authReducer.token != null
  }
}

const mapDispachToProps = (dispatch) => {
  return {
    onAddIngr: (ingName) => dispatch(reduxActions.addIngredient(ingName)),
    onRemoveIngr: (ingName) => dispatch(reduxActions.removeIngredient(ingName)),
    onInitIngr: () => dispatch(reduxActions.initIngredients()),
    onOrderInit: () => dispatch(reduxActions.purchaseInit()),
    onAuthRedirectPath: (path) => dispatch(reduxActions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispachToProps)(withErrorHandler(BurgerBuilder, axios));
