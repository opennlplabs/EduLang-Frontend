import {
  START_LOGIN,
  IS_LOGIN_PAGE_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_ERROR,
  LOGIN_RESET,
} from '../Actions/Types';

const INITIAL_STATE = {
  userData: null,
  isLoginPageLoading: false,
  loginError: null,
  loginFailed: false,
  loginSuccess: false,
  loginReset: false,
};

export default (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case START_LOGIN:
      return {
        ...state,
        userData: payload,
        loginError: null,
        loginFailed: false,
        loginSuccess: false,
        loginReset: false,
      };
    case IS_LOGIN_PAGE_LOADING:
      return {
        ...state,
        isLoginPageLoading: payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: payload,
        loginError: null,
        loginFailed: false,
        loginReset: false,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loginFailed: payload,
        loginError: null,

        loginSuccess: false,
        loginReset: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: payload,
        loginFailed: false,
        loginSuccess: false,
        loginReset: false,
      };
    case LOGIN_RESET:
      return {
        ...INITIAL_STATE,
      };
    default:
      return {...state};
  }
};
