import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import configureStore from './src/redux/store';
import AppContainer from './src/screens/initial';
import {ActivityIndicator} from './src/global/components';

const {store, persistor} = configureStore();

const App = () => {
  const [ready, setReady] = useState(false);

  const loadAsync = async () => {
    setReady(true);
  };

  useEffect(() => {
    loadAsync();
  }, []);

  if (!ready) {
    return <ActivityIndicator />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
};

export default App;
