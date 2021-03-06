import * as actionType from '../actions/actionTypes';
import axios from '../../../axios/axios-orders';

// PURCHASE_BURGER_SUCCESS

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionType.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}
export const purchaseBurgerFail = (error) => {
  return {
    type: actionType.PURCHASE_BURGER_FAIL,
    error: error
  }

}//-----------------

export const purchaseBurgerStart = () => {
  return {
    type: actionType.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData, token) => {

  return {
    type: actionType.PURCHASED_BURGER,
    orderData: orderData,
    token: token,
  }
}

export const purchaseInit = () => {
  return {
    type: actionType.PURCHASE_INIT
  }
}

// FETCH ORDERS

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionType.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}
export const fetchOrdersFail = (error) => {
  return {
    type: actionType.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionType.FETCH_ORDERS_START,

  }
}

export const fetchOrders = (token, userId) => {
  return {
    type: actionType.FETCHED_ORDERS,
    token: token,
    userId: userId
  }
  // return dispatch => {
  //   dispatch(fetchOrdersStart());
  //   const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
  //   axios.get('/orders.json' + queryParams)
  //     .then(result => {
  //       const fetchedOrders = []
  //       for (let key in result.data) {
  //         fetchedOrders.push({
  //           ...result.data[key],
  //           id: key
  //         });
  //       }
  //       dispatch(fetchOrdersSuccess(fetchedOrders))
  //       // this.setState({ loading: false, orders: fetchedOrders });
  //     })
  //     .catch((err) => {
  //       dispatch(fetchOrdersFail(err))
  //       // this.setState({ loading: false });
  //     });

  // }
}