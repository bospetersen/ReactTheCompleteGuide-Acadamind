import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import * as sagaActions from '../actions/index';
import axios from 'axios';

export function* logoutSaga(action) {

  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(sagaActions.logoutSucceed());
  // yield ()
}

export function* authCheckTimeoutSaga(action) {
  yield delay(action.expireationTime * 1000);
  yield put(sagaActions.logout());
}


export function* authUserSaga(action) {
  yield put(sagaActions.authStart);

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }
  const apiKey = 'AIzaSyAMGQ9cKh1e8IRpncPmzMcC5bGUj-NvJdU';
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey;
  if (!action.isSignup) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey;
  }

  try {
    const response = yield axios.post(url, authData)
    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', response.data.localId);
    yield put(sagaActions.authSuccess(response.data.idToken, response.data.localId));
    yield put(sagaActions.authCheckTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(sagaActions.authFail(error.response.data.error))
  }
}


export function* authCheckStateSaga(action) {

  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(sagaActions.logout())
  }
  else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      yield put(sagaActions.logout())
    } else {
      const userId = yield localStorage.getItem('userId');
      yield put(sagaActions.authSuccess(token, userId));
      yield put(sagaActions.authCheckTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
    }
  }

};
