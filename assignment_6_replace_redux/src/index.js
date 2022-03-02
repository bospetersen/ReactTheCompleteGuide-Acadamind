import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { combineReducers, createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import ProductsContext from './context/product-context';

import './index.css';
import App from './App';
// import productReducer from './store/reducers/products';

ReactDOM.render(
  <ProductsContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProductsContext>,
  document.getElementById('root')
);
