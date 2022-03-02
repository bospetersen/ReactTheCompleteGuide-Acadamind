import { put } from 'redux-saga/effects';
import axios from '../../../axios/axios-orders';
import * as sagaActions from '../actions/index';

export function* purchaseBurgerSaga(action) {

  yield put(sagaActions.purchaseBurgerStart());
  try {
    const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData)
    yield put(sagaActions.purchaseBurgerSuccess(response.data.name, action.orderData));
  }
  catch (error) {
    yield put(sagaActions.purchaseBurgerFail(error));
  };

}

export function* fetchOrdersSaga(action) {

  yield put(sagaActions.fetchOrdersStart());
  const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
  try {
    const result = yield axios.get('/orders.json' + queryParams)
    const fetchedOrders = []
    for (let key in result.data) {
      fetchedOrders.push({
        ...result.data[key],
        id: key
      });
    }
    yield put(sagaActions.fetchOrdersSuccess(fetchedOrders))
    // this.setState({ loading: false, orders: fetchedOrders });
  }
  catch (err) {
    yield put(sagaActions.fetchOrdersFail(err))
    // this.setState({ loading: false });
  };


}