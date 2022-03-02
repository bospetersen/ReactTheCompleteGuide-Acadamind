import React, { useState, useEffect } from 'react';
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


export const BurgerBuilder = props => {

  const [purchasing, setPurchaing] = useState(false);
  const { onInitIngr } = props;
  useEffect(() => {
    onInitIngr();
  }, [onInitIngr])


  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchaing(true)
    } else {
      props.onAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchaing(false);
  }

  const purchaseContinueHandler = () => {
    props.onOrderInit();
    props.history.push('/checkout');
  }

  const updatePurchaseState = (ingredients) => {

    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }




  const disabledInfo = {
    ...props.ings
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }
  let orderSummery = null;

  let burger = props.error ? <p>Ingredients can´t be loaded!</p> : <Spinner>Loading...</Spinner>

  if (props.ings) {
    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls
          indgredientAdded={props.onAddIngr}
          indgredientRemoved={props.onRemoveIngr}
          disabled={disabledInfo}
          price={props.price}
          purchasable={updatePurchaseState(props.ings)}
          ordered={purchaseHandler}
        />
      </Aux>
    );
    orderSummery = <OrderSummery
      ingredients={props.ings}
      continueOrder={purchaseContinueHandler}
      cancelOrder={purchaseCancelHandler}
      price={props.price.toFixed(2)}
    />;
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummery}
      </Modal>
      {burger}
    </Aux>
  )
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
