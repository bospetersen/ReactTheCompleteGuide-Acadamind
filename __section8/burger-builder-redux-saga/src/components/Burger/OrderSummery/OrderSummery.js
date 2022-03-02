import React, { Component } from 'react'
import Aux from '../../../hoc/Auxx';
// import classes from './OrderSummery.module.css';
import Button from '../../UI/Button/Button'

class OrderSummery extends Component {



  render() {
    const ingredientsSummery = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (<li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>
      : {this.props.ingredients[igKey]} </li>)
      });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>Your burger contains the following ingredients:</p>
        <ul>
          {ingredientsSummery}
        </ul>
        <p><strong>Total Price: ${this.props.price}</strong></p>
        <div>
          Continue to checkout?
      </div>
        <Button
          btnType="Danger"
          clicked={this.props.cancelOrder}
        >CANCEL</Button>
        <Button
          btnType="Success"
          clicked={this.props.continueOrder}
        >CONTINUE TO CHECKOUT</Button>
      </Aux>
    )
  }
}

export default OrderSummery
