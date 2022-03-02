import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// import { combineReducers } from 'redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import burgerBuilderReducer from './redux/store/reducers/burgerBuilder';
import orderReducer from './redux/store/reducers/order';
import authReducer from './redux/store/reducers/auth'
// import axios from 'axios';
// axios.defaults.baseURL = 'https://burgerbuilder-3e0c2-default-rtdb.europe-west1.firebasedatabase.app/';

const rootReducer = combineReducers({
  burgerReducer: burgerBuilderReducer,
  orderReducer: orderReducer,
  authReducer: authReducer
})
// const store = createStore(reducer);

const logger = store => {
  return next => {
    return action => {
      // console.log('[MiddleWare] Dispaching', action);
      const result = next(action);
      // console.log('[MiddleWare] Next State', store.getState());
      return result;
    }
  }
}
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
// const store = createStore(reducer, /* preloadedState, */ composeEnhancers(

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
