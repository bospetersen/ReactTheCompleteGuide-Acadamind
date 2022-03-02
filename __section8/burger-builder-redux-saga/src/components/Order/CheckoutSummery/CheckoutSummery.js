import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummery.module.css'
const CheckoutSummery = (props) => {
  return (
    <div className={classes.CheckoutSummery}>
      <h1>Velbekomme!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button
        btnType="Danger"
        clicked={props.checkoutCancelled}>CANCEL</Button>
      <Button
        btnType="Success"
        clicked={props.checkoutContinued}>Checkout</Button>
    </div>
  )
}

export default CheckoutSummery
