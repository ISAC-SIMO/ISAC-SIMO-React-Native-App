import * as types from './app.types';

export const setLoading = (loading) => ({
  type: types.SET_LOADING,
  payload: loading,
});

export const setIsFirstLoad = (payload) => ({
  type: types.SET_IS_FIRST_LOAD,
  payload,
});

export const setIsDarkTheme = (payload) => ({
  type: types.SET_IS_DARK_THEME,
  payload,
});

export const setToken = (token) => ({
  type: types.SET_TOKEN,
  payload: token,
});
