import { combineReducers  } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'

import authSlice from './Slices/auth'
import courseSlice from './Slices/courseSlice'
import userSlice from './Slices/userSlice'

const persistConfig = {
    key: 'root',
    storage,

}

const rootReducers = combineReducers({
authSlice,
userSlice, 
courseSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducers)
export default persistedReducer