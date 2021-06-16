//all auth actions goes here
//most of the async operations like login, register etc are done here
import * as types from './auth.types';
import Snackbar from 'react-native-snackbar';

import {
  loginPost,
  logoutGet,
  registerPost,
  forgotPasswordPost,
  profileGet,
} from '../../api';

export const setCurrentUser = user => ({
  type: types.SET_CURRENT_USER,
  payload: user,
});

export const setUserData = payload => ({
  type: types.SET_USER_DATA,
  payload,
});

export const loginRequest = payload => async dispatch => {
  dispatch({type: types.LOGIN_REQUEST, payload});
  try {
    const response = await loginPost(payload);
    dispatch({type: types.LOGIN_SUCCESS, payload: response.data});
    Snackbar.show({
      text: 'Logged in Successfully !!',
      duration: Snackbar.LENGTH_SHORT,
    });
  } catch (err) {
    dispatch({type: types.LOGIN_FAILURE, payload: err.response.data});
    console.log(err.response.data, 'response');
    Snackbar.show({
      text: err.response.data.detail,
      duration: Snackbar.LENGTH_SHORT,
    });
    throw err;
  }
};

export const userProfileGet = payload => async dispatch => {
  dispatch({type: types.USER_PROFILE_REQUEST});
  try {
    // console.log(payload, 'payload');
    const response = await profileGet(payload);
    // console.log(response.data, 'reponse');
    dispatch({type: types.USER_PROFILE_SUCCESS, payload: response.data});
    return response;
  } catch (err) {
    dispatch({type: types.USER_PROFILE_FAILURE, payload: err});
    console.log(err.response.data, 'error');
    if (err.response.data.code == 'token_not_valid') {
      Snackbar.show({
        text: 'Token has expired! Please login again.',
        duration: Snackbar.LENGTH_SHORT,
      });
      dispatch({type: types.LOGOUT_SUCCESS, payload});
    }
    throw err;
  }
};
export const logoutRequest = payload => ({
  type: types.LOGOUT_SUCCESS,
  payload,
});

export const clearErrorField = payload => ({
  type: types.CLEAR_ERROR_DATA,
  payload,
});

export const registerRequest = payload => async dispatch => {
  dispatch({type: types.REGISTER_REQUEST, payload});
  try {
    console.log(payload, 'payload');
    const response = await registerPost(payload);
    dispatch({type: types.REGISTER_SUCCESS, payload: response.data});
    Snackbar.show({
      text: 'SignedUp Successfully !!',
      duration: Snackbar.LENGTH_SHORT,
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    dispatch({type: types.REGISTER_FAILURE, payload: err.response.data});
    throw err;
  }
};

export const forgotPasswordRequest = payload => async dispatch => {
  dispatch({type: types.FORGOT_PASSWORD_REQUEST, payload});
  try {
    const response = await forgotPasswordPost(payload);
    dispatch({type: types.FORGOT_PASSWORD_SUCCESS, payload: response.data});
  } catch (err) {
    dispatch({type: types.FORGOT_PASSWORD_FAILURE, payload: err});
    throw err;
  }
};
