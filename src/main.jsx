import { createRoot } from 'react-dom/client'
import { Provider, useSelector } from 'react-redux'
import { GlobalStyles } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { persistStore } from 'redux-persist'
const persistor = persistStore(store)
import { injectStore } from './utils/authorizedAxios'
injectStore(store)

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyles
          styles={{
            a: { textDecoration: 'none', color: 'inherit' },
            '.MuiButton-root': {
              textTransform: 'none !important'
            }
          }}
        />
        <CssBaseline />
        <App />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
