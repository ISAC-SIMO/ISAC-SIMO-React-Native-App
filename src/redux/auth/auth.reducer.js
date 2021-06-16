//auth reducer to set data in a redux state after performing async operations
import produce from 'immer';
import * as types from './auth.types';

const INITIAL_STATE = {
  currentUser: null,
  registerSuccess: false,
  loading: false,
  isSkipAuthentication: false,
  error: {},
  userData: {
    email: '',
    password: '',
    full_name: '',
    image: null,
  },
};

const reducer = (state = INITIAL_STATE, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_LOADING:
        draft.loading = action.payload;
        break;
      case types.SET_SKIP_AUTHENTICATION:
        draft.isSkipAuthentication = action.payload;
        break;
      case types.SET_USER_DATA:
        draft.userData[action.payload.key] = action.payload.value;
        break;
      case types.REGISTER_REQUEST:
        draft.loading = true;
        break;
      case types.REGISTER_SUCCESS:
        draft.loading = false;
        // draft.currentUser = action.payload;
        draft.registerSuccess = true;
        break;
      case types.REGISTER_FAILURE:
        draft.error = action.payload;
        draft.loading = false;
        break;
      case types.LOGIN_REQUEST:
        draft.loading = true;
        break;
      case types.LOGIN_SUCCESS:
        draft.loading = false;
        break;
      case types.LOGOUT_SUCCESS:
        draft.currentUser = INITIAL_STATE.currentUser;
        break;
      case types.LOGIN_FAILURE:
        draft.error = action.payload;
        draft.loading = false;
        break;
      case types.USER_PROFILE_REQUEST:
        draft.loading = true;
        break;
      case types.USER_PROFILE_SUCCESS:
        draft.currentUser = action.payload;
        draft.loading = false;
        break;
      case types.USER_PROFILE_FAILURE:
        draft.loading = false;
        break;
      case types.CLEAR_ERROR_DATA:
        draft.error = INITIAL_STATE.error;
        break;
      // case types.SET_CURRENT_USER:
      //   draft.currentUser = action.payload;
      //   break;
    }
  });

export default reducer;
