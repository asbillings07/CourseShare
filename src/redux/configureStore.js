import { configureStore, getDefaultMiddleware  } from "@reduxjs/toolkit";
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
  } from "redux-persist"
import rootReduer from './rootReducer'

export const createStore = () => {
    const store = configureStore({
        reducer: rootReduer,
        middleware: getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
              }
        })
    })
    const persistor = persistStore(store)
    return [ store, persistor]
}
