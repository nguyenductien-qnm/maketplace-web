import Home from './pages/user/Home'
import DetailProduct from './pages/user/ProductDetails'
import Store from './pages/user/Store'
import ShoppingCart from './pages/user/ShoppingCart'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { createBrowserRouter } from 'react-router-dom'
import MyAccount from './pages/user/MyAccount'
import Auth from './pages/user/Auth'
import Vendor from './pages/user/Vendor'
import SetupAccount from './pages/user/SetupAccount'
import VerifyAccount from './pages/user/VerifyAccount'
import PrivateRoute from './components/PrivateRoute'

const router = createBrowserRouter([
  { path: '/home', element: <Home /> },
  { path: '/product', element: <DetailProduct /> },
  { path: '/store', element: <Store /> },
  { path: '/cart', element: <ShoppingCart /> },
  { path: '/my-account/:page', element: <MyAccount /> },
  { path: '/auth/:page', element: <Auth /> },
  { path: '/auth/verify-account/:otp', element: <VerifyAccount /> },
  { path: '/vendor/:page', element: <Vendor /> },
  {
    path: '/setup-account',
    element: (
      <PrivateRoute>
        <SetupAccount />
      </PrivateRoute>
    )
  }
])

export default router
