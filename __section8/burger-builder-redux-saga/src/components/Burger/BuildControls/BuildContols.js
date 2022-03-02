import React from 'react';
import classes from './BuildContols.module.css';
import BuildControl from './BuildControl/BuildControl'

export const BuildContols = (props) => {
  console.log(props.isAuthenticated)
  const controls = [
    { id: '0001', label: 'Salad', type: 'salad' },
    { id: '0002', label: 'Bacon', type: 'bacon' },
    { id: '0003', label: 'Cheese', type: 'cheese' },
    { id: '0004', label: 'Meat', type: 'meat' }
  ]

  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong> ${props.price.toFixed(2)} </strong></p>
      {controls.map((controlItem) => (
        <BuildControl
          key={controlItem.id}
          label={controlItem.label}
          isAuthenticated={props.isAuth}
          type={controlItem.type}
          added={() => props.indgredientAdded(controlItem.type)}
          removed={() => props.indgredientRemoved(controlItem.type)}
          disabled={props.disabled[controlItem.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>
        {props.isAuth ? 'ORDER NOW' : 'Sigin to order'}</button>
    </div>
  )
}

export default BuildContols;
