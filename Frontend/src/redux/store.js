import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import {persistStore} from 'redux-persist'
import {combineReducers} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig={
    key:'root',
    version:1,
    storage
 }
  
 const reducer=combineReducers({
    user:userReducer
})
const persistRed=persistReducer(persistConfig,reducer)

export const store=configureStore({
    reducer:persistRed,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
})
export const persistor=persistStore(store)