//here all the reducers are imported and combined to one root state with combine reducers

import {combineReducers} from 'redux';
import appReducer from './app/app.reducer';
import authReducer from './auth/auth.reducer';
import formReducer from './form/form.reducer';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  form: formReducer,
});

export default rootReducer;
