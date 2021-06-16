//redux store
//redux-thunk middleware is used
import {createStore, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootReducer from './root-reducer';

export default function configureStore() {
  const composeEnhancers =
    (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const middlewares = [ReduxThunk];
  const enhancers = [applyMiddleware(...middlewares)]; //applying middleware

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['app', 'form'], //white listed app and auth to persist data in the async storage
    //token (only) is saved in app, so auth is not whitelisted here
  };
  const pReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(pReducer, composeEnhancers(...enhancers)); //creating store

  const persistor = persistStore(store);

  return {store, persistor};
}
