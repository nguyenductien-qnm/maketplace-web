import { useEffect } from 'react'
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
  useNavigate
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home from './pages/user/Home'
import DetailProduct from './pages/user/ProductDetails'
import Store from './pages/user/Store'
import ShoppingCart from './pages/user/ShoppingCart'
import MyAccount from './pages/user/MyAccount'
import Auth from './pages/user/Auth'
import Vendor from './pages/user/Vendor'
import SetupAccount from './pages/user/SetupAccount'
import VerifyAccount from './pages/user/VerifyAccount'
import CheckOut from './pages/user/CheckOut'

import ScrollToTop from './components/common/ScrollToTop'
import { setNavigate } from './helpers/navigation'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function ProtectedRoute({ user }) {
  return user ? <Outlet /> : <Navigate to="/auth/login" replace />
}

function UnauthorizedRoute({ user }) {
  return user ? <Navigate to="/home" replace /> : <Outlet />
}

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentUser = useSelector((state) => state.user.currentUser)

  useEffect(() => {
    setNavigate(navigate)
  }, [navigate])

  const isPendingSetup =
    currentUser?.user_status === 'pending_setup' &&
    location.pathname !== '/setup-account'

  if (isPendingSetup) {
    return <Navigate to="/setup-account" replace />
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Redirect root to /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />

        {/* Setup Account */}
        <Route
          path="/setup-account"
          element={
            currentUser?.user_status === 'pending_setup' ? (
              <SetupAccount />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />

        {/* Public routes - Only accessible if NOT logged in */}
        <Route element={<UnauthorizedRoute user={currentUser} />}>
          <Route path="/auth/:page" element={<Auth />} />
          <Route path="/auth/reset-password/:token" element={<Auth />} />
          <Route path="/auth/verify-account/:otp" element={<VerifyAccount />} />

          <Route path="/product/:product_slug" element={<DetailProduct />} />
          <Route path="/store" element={<Store />} />
        </Route>

        {/* Private routes - Only accessible if logged in */}
        <Route element={<ProtectedRoute user={currentUser} />}>
          <Route path="/my-account/:page" element={<MyAccount />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/vendor/:page" element={<Vendor />} />
          <Route path="/vendor/:page/:_id" element={<Vendor />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
