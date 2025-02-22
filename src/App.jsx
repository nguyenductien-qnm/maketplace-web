import Home from './pages/user/Home'
import DetailProduct from './pages/user/ProductDetails'
import Store from './pages/user/Store'
import ShoppingCart from './pages/user/ShoppingCart'
import MyAccount from './pages/user/MyAccount'
import Auth from './pages/user/Auth'
import Vendor from './pages/user/Vendor'
import SetupAccount from './pages/user/SetupAccount'
import VerifyAccount from './pages/user/VerifyAccount'
import PrivateRoute from './components/PrivateRoute'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CheckOut from './pages/user/CheckOut'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useRef } from 'react'
import { resetProductState } from './redux/formProduct.slice'

function App() {
  const currentUser = useSelector((state) => state.user.currentUser)
  const dispatch = useDispatch()
  const location = useLocation()
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    if (
      (prevPath.current.includes('/create-product') ||
        prevPath.current.includes('/update-product')) &&
      !location.pathname.includes('/create-product') &&
      !location.pathname.includes('/update-product')
    ) {
      dispatch(resetProductState())
    }

    prevPath.current = location.pathname
  }, [location.pathname, dispatch])

  return (
    <Routes>
      <Route path="/home" element={<Home />} /> {/* Checked */}
      <Route path="/product/:_id" element={<DetailProduct />} /> {/* Checked */}
      <Route path="/store" element={<Store />} /> {/* Checked */}
      <Route path="/cart" element={<ShoppingCart />} /> {/* Checked */}
      <Route path="/checkout" element={<CheckOut />} />
      {/* Checked */}
      <Route path="/my-account/:page" element={<MyAccount />} />
      <Route path="/auth/:page" element={<Auth />} /> {/* Checked */}
      <Route path="/auth/reset-password/:token" element={<Auth />} />
      <Route path="/auth/verify-account/:otp" element={<VerifyAccount />} />
      <Route path="/vendor/:page" element={<Vendor />} /> {/* Checked */}
      <Route path="/vendor/:page/:_id" element={<Vendor />} /> {/* Checked */}
      <Route
        path="/setup-account"
        element={
          currentUser?.user_status === 'pendingSetup' ? (
            <SetupAccount />
          ) : (
            <Navigate to="/home" />
          )
        }
      />
    </Routes>
  )
}
export default App
