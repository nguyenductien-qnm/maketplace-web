import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import categoriesReducer from './categories.slice'
import formCreateProductReducer from './formCreateProduct.slice'
import userReducer from './user.slice'

const persistConfig = {
  key: 'currentUser',
  storage
}

const persistedReducer = persistReducer(persistConfig, userReducer)

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    formCreateProduct: formCreateProductReducer,
    user: persistedReducer
  }
})

const persistor = persistStore(store)

export { store, persistor }
