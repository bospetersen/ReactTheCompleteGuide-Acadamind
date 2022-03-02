import { put } from 'redux-saga/effects';
// import { delay } from 'redux-saga/effects';
import * as sagaActions from '../actions/index';

import axios from '../../../axios/axios-orders';

export function* initIngredientsSaga(action) {

  try {
    const response = yield axios.get('https://burgerbuilder-3e0c2-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
    yield put(sagaActions.setIngredients(response.data));
  }
  catch (error) {
    // yield put(sagaActions.fechIngredientsError(error.response.data.error));
    yield put(sagaActions.fechIngredientsError());
  }

}