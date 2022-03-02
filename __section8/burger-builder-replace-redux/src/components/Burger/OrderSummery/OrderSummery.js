import React from 'react'
import Aux from '../../../hoc/Auxx';
// import classes from './OrderSummery.module.css';
import Button from '../../UI/Button/Button'

const OrderSummery = props => {

  const ingredientsSummery = Object.keys(props.ingredients)
    .map(igKey => {
      return (<li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>
      : {props.ingredients[igKey]} </li>)
    });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Your burger contains the following ingredients:</p>
      <ul>
        {ingredientsSummery}
      </ul>
      <p><strong>Total Price: ${props.price}</strong></p>
      <div>
        Continue to checkout?
      </div>
      <Button
        btnType="Danger"
        clicked={props.cancelOrder}
      >CANCEL</Button>
      <Button
        btnType="Success"
        clicked={props.continueOrder}
      >CONTINUE TO CHECKOUT</Button>
    </Aux>
  )
}


export default OrderSummery
