//app reducer
import produce from 'immer';
import * as types from './app.types';
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from '../auth/auth.types';

const INITIAL_STATE = {
  loading: true,
  isDarkTheme: false,
  isFirstLoad: true,
  token: '',
};

const reducer = (state = INITIAL_STATE, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        draft.token = action.payload.access;
        break;
      case LOGOUT_SUCCESS:
        draft.token = '';
        break;
      case types.SET_LOADING:
        draft.loading = action.payload;
        break;
      case types.SET_IS_DARK_THEME:
        draft.isDarkTheme = action.payload;
        break;
      case types.SET_IS_FIRST_LOAD:
        draft.isFirstLoad = action.payload;
        break;
      case types.SET_TOKEN:
        draft.token = 'null';
        break;
    }
  });

export default reducer;
