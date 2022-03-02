import React from 'react';
import classes from './Order.module.css';


const Order = (props) => {
  let ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    })
  }
  const ingredientOutput = ingredients.map(ig => {
    return ig.amount > 0 ? <div>{ig.amount} X {ig.name}  </div> : null;
  })

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput} </p>
      <p> Price <strong>${props.price.toFixed(2)} USD</strong> </p>
    </div>
  )
}

export default Order
