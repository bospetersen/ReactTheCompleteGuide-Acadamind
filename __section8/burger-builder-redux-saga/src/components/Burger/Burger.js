import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';

const Burger = (props) => {
  console.log('[burger]', props)
  const transfIngredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {

      return <BurgerIngredient key={igKey + i} type={igKey} />
    })
  }).reduce((arr, el) => {
    return arr.concat(el)
  }, []);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transfIngredients.length > 0 ? transfIngredients : "Please add ingredients!"}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

export default withRouter(Burger);
