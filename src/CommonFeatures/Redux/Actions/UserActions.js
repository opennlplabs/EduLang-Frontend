import {
  START_LOGIN,
  IS_LOGIN_PAGE_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_ERROR,
  LOGIN_RESET,
} from './Types';

export const startLogin = userData => {
  return {
    type: START_LOGIN,
    payload: userData,
  };
};

export const isLoginPageLoading = isLoading => {
  return {
    type: IS_LOGIN_PAGE_LOADING,
    payload: isLoading,
  };
};

export const loginSuccess = isSuccess => {
  return {
    type: LOGIN_SUCCESS,
    payload: isSuccess,
  };
};

export const loginFailed = isFailed => {
  return {
    type: LOGIN_FAILED,
    payload: isFailed,
  };
};

export const loginError = error => {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
};

export const loginReset = () => {
  return {
    type: LOGIN_RESET,
  };
};
