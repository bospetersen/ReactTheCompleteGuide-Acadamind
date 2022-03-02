import * as actionType from './actionTypes';


export const addIngredient = (ingName) => {
  return {
    type: actionType.ADD_INGREDIENT,
    ingredientName: ingName
  }
};
export const removeIngredient = (ingName) => {
  return {
    type: actionType.REMOVE_INGREDIENT,
    ingredientName: ingName
  }
}


//--------------------

export const setIngredients = (ingredients) => {
  return {
    type: actionType.SET_INGREDIENTS,
    ingredients: ingredients
  }
}


export const fechIngredientsError = () => {
  return {
    type: actionType.FETCH_INGREDIENTS_ERROR
  }
}


export const initIngredients = () => {
  return {
    type: actionType.INIT_INGREDIENTS
  }
  // return dispatch => {
  //   axios.get('https://burgerbuilder-3e0c2-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
  //     .then(response => {
  //       dispatch(setIngredients(response.data));
  //     })
  //     .catch(error => {
  //       dispatch(fechIngredientsError());
  //     })
  // }
}