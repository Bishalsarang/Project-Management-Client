import axios from 'axios';

import * as constants from '../../constants';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST,
});

export const loginUserSuccess = (token) => ({
  type: LOGIN_USER_SUCCESS,
  payload: { token },
});

export const loginUserFailure = (error) => ({ type: LOGIN_USER_FAILURE, payload: { error } });

export const isLoggedIn = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');

    if (!token) {
      //  Logout
      // dispatch(logout());
    } else {
      dispatch(loginUserSuccess(token));
    }
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    dispatch(loginUserRequest());
    const data = { username, password };

    try {
      const res = await axios.post(constants.API_LOGIN_URL, data);
      const { token, username, role } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);

      dispatch(loginUserSuccess(token));

      return token;
    } catch (error) {
      return dispatch(loginUserFailure(error));
    }
  };
};
