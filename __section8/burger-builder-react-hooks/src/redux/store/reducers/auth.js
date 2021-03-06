import * as actionTypes from '../actions/actionTypes';

const initState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
}


const auth = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      }
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
      }
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null
      }
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path
      }
    // case actionTypes:
    //   return {
    //     ...state,
    //   }
    default:
      return state
  }
}

export default auth
