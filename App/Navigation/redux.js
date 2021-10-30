import React from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import getStore from '../Redux/index';

const store = getStore()

const persistor = persistStore(store);


export const withReduxProvider = (C) => (props) => {

  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <C {...props}/>
      </PersistGate>
    </Provider>
  );
}
