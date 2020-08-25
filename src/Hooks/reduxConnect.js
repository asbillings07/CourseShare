import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/lib/integration/react"


export const withRedux = (store, persistor) => Component => props => {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        <Component {...props}/>
        </PersistGate>
      </Provider>
    );
}