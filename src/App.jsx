import Home from './pages/user/Home'
import DetailProduct from './pages/user/ProductDetails'
import Store from './pages/user/Store'
import ShoppingCart from './pages/user/ShoppingCart'
import MyAccount from './pages/user/MyAccount'
import Auth from './pages/user/Auth'
import Vendor from './pages/user/Vendor'
import SetupAccount from './pages/user/SetupAccount'
import VerifyAccount from './pages/user/VerifyAccount'
import PrivateRoute from './components/common/PrivateRoute'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CheckOut from './pages/user/CheckOut'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function App() {
  const currentUser = useSelector((state) => state.user.currentUser)

  const ProtectedRoute = ({ children }) => {
    if (currentUser?.user_status === 'pending_setup') {
      return <Navigate to="/setup-account" />
    }
    return children
  }

  return (
    <Routes>
      {/* HOME  */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      {/* PRODUCT DETAIL  */}
      <Route
        path="/product/:product_slug"
        element={
          <ProtectedRoute>
            <DetailProduct />
          </ProtectedRoute>
        }
      />
      {/* STORE  */}
      <Route
        path="/store"
        element={
          <ProtectedRoute>
            <Store />
          </ProtectedRoute>
        }
      />
      {/* CART  */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <ShoppingCart />
          </ProtectedRoute>
        }
      />
      {/* CHECKOUT  */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        }
      />
      {/* MY ACCOUNT  */}
      <Route
        path="/my-account/:page"
        element={
          <ProtectedRoute>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      {/* AUTH  */}
      <Route path="/auth/:page" element={<Auth />} />
      <Route path="/auth/reset-password/:token" element={<Auth />} />
      <Route path="/auth/verify-account/:otp" element={<VerifyAccount />} />
      {/* VENDOR  */}
      <Route
        path="/vendor/:page"
        element={
          <ProtectedRoute>
            <Vendor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/:page/:_id"
        element={
          <ProtectedRoute>
            <Vendor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/setup-account"
        element={
          currentUser?.user_status === 'pending_setup' ? (
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
