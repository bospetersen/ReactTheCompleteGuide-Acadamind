import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios/axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as reduxActions from '../../redux/store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'


class Orders extends Component {


  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }


  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
        this.props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        ))
      )
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading,
    token: state.authReducer.token,
    userId: state.authReducer.userId
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(reduxActions.fetchOrders(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));