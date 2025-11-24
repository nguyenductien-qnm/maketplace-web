import userReducer from './user.slice'
import categoriesReducer from './categories.slice'
import notificationReducer from './notification.slice'
import cartReducer from './cart.slice'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user']
}

const reducers = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  notification: notificationReducer,
  cart: cartReducer
})

const persistedReducers = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
})
