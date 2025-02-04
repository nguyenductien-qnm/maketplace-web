import Home from './pages/user/Home'
import DetailProduct from './pages/user/ProductDetails'
import Store from './pages/user/Store'
import ShoppingCart from './pages/user/ShoppingCart'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import MyAccount from './pages/user/MyAccount'
import Auth from './pages/user/Auth'
import Vendor from './pages/user/Vendor'
import SetupAccount from './pages/user/SetupAccount'
import VerifyAccount from './pages/user/VerifyAccount'
import PrivateRoute from './components/PrivateRoute'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function App() {
  const currentUser = useSelector((state) => state.user.currentUser)
  return (
    <Routes>
      <Route path="/home" element={<Home />} /> {/* Checked */}
      <Route path="/product/:_id" element={<DetailProduct />} /> {/* Checked */}
      <Route path="/store" element={<Store />} /> {/* Checked */}
      <Route path="/cart" element={<ShoppingCart />} /> {/* Checked */}
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
