import * as actionTypes from './actionTypes';
const saveResult = (result) => {

  return {
    type: actionTypes.STORE_RESULT,
    result: result
  }
}

export const storeResult = (result) => {
  return (dispach, getState) => {
    setTimeout(() => {
      // const oldCounter = getState().ctr.counter;
      dispach(saveResult(result));
    }, 2000);
  }
}
export const deleteResult = (id) => {
  return {
    type: actionTypes.DELETE_RESULT,
    resultElId: id
  }
}