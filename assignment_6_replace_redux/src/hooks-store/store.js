import { useState, useEffect } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState }

    for (const listener of listeners) {
      listener(globalState);
    }
  }

  useEffect(() => {
    listners.push(setState);

    return () => {
      listners = listners.filter(li => li !== setState);
    }
  }, [setState])

  return [globalState, dispatch];
}

export const initStore = (userAction, initialState) => {
  if (initialState) {
    gloablState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userAction };
}