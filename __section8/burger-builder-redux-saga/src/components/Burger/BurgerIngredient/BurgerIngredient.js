/* eslint-disable no-unused-vars */
import React from 'react';
import classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

const BurgerIngredient = (props) => {
  let ingredient = null;
  switch (props.type) {
    case ('bread-bottom'):
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    case ('bread-top'):
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      )
      break;
    case ('meat'):
      ingredient = <div className={classes.Meat}></div>;
      break;
    case ('cheese'):
      ingredient = <div className={classes.Cheese}></div>;
      break;
    case ('salad'):
      ingredient = <div className={classes.Salad}></div>;
      break;
    case ('bacon'):
      ingredient = <div className={classes.Bacon}></div>;
      break;
    default:
      ingredient = null;
  }
  return ingredient;

}
BurgerIngredient.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  type: PropTypes.string.isRequired
}

export default BurgerIngredient;
