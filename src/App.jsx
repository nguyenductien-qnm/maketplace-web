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

import Home from './pages/customer/Home'
import CustomerAuth from './pages/customer/CustomerAuth'

import ScrollToTop from './components/common/ScrollToTop'
import { setNavigate } from './helpers/navigation'

import UserAccountLayout from './layouts/user/UserAccountLayout'
import CustomerDashboard from './pages/customer/CustomerDashBoard'
import CustomerAccountDetail from './pages/customer/CustomerAccountDetail'
import CustomerAddresses from './pages/customer/CustomerAddresses'
import CustomerAccountMigration from './pages/customer/CustomerAccountMigration'
import CustomerNotifications from './pages/customer/CustomerNotification'
import CustomerVerifyAccount from './pages/customer/CustomerVerifyAccount'
import CustomerWallet from './pages/customer/CustomerWallet'
import CustomerShoppingCart from './pages/customer/CustomerShoppingCart'
import CustomerSetupAccount from './pages/customer/CustomerSetupAccount'
import CustomerProductDetails from './pages/customer/CustomerProductDetails'
import CustomerStore from './pages/customer/Store'
import CustomerOrders from './pages/customer/CustomerOrders'
import CustomerOrderDetail from './pages/customer/CustomerOrderDetail'
import CustomerCheckout from './pages/customer/CustomerCheckout'
import VendorLayout from './layouts/user/VendorLayoui'
import VendorProducts from './pages/vendor/VendorProducts'
import VendorOrders from './pages/vendor/VendorOrders'
import VendorOrderDetail from './pages/vendor/VendorOrderDetail'
import VendorProfile from './pages/vendor/VendorProfile'
import VendorVoucher from './pages/vendor/VendorVouchers'
import VendorWallet from './pages/vendor/VendorWallet'
import VendorDashboard from './pages/vendor/VendorDashboard'
import VendorProductForm from './pages/vendor/VendorProductForm'

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
              <CustomerSetupAccount />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />

        <Route
          path="/product/:product_slug"
          element={<CustomerProductDetails />}
        />
        <Route path="/store" element={<CustomerStore />} />

        {/* Public routes - Only accessible if NOT logged in */}
        <Route element={<UnauthorizedRoute user={currentUser} />}>
          <Route path="/auth/:page" element={<CustomerAuth />} />
          <Route
            path="/auth/reset-password/:token"
            element={<CustomerAuth />}
          />
          <Route
            path="/auth/verify-account/:otp"
            element={<CustomerVerifyAccount />}
          />
        </Route>

        {/* Private routes - Only accessible if logged in */}
        <Route element={<ProtectedRoute user={currentUser} />}>
          <Route path="/my-account" element={<UserAccountLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<CustomerDashboard />} />
            <Route path="orders" element={<CustomerOrders />} />
            <Route path="order-detail" element={<CustomerOrderDetail />} />
            <Route path="notifications" element={<CustomerNotifications />} />
            <Route path="account-details" element={<CustomerAccountDetail />} />
            <Route path="addresses" element={<CustomerAddresses />} />
            <Route path="wallet" element={<CustomerWallet />} />
            <Route
              path="account-migration"
              element={
                !currentUser?.user_role?.includes('SHOP') ? (
                  <CustomerAccountMigration />
                ) : (
                  <Navigate to="/my-account/dashboard" />
                )
              }
            />
          </Route>

          <Route path="/vendor" element={<VendorLayout />}>
            <Route path="dashboard" element={<VendorDashboard />} />
            <Route path="products" element={<VendorProducts />} />
            <Route path="create-product" element={<VendorProductForm />} />
            <Route path="update-product/:_id" element={<VendorProductForm />} />
            <Route path="orders" element={<VendorOrders />} />
            <Route path="order-detail" element={<VendorOrderDetail />} />
            <Route path="profile" element={<VendorProfile />} />
            <Route path="vouchers" element={<VendorVoucher />} />
            <Route path="wallet" element={<VendorWallet />} />
          </Route>

          {/* <Route path="/:page" element={<Vendor />} />
          <Route path="/:page/:_id" element={<Vendor />} /> */}

          <Route path="/cart" element={<CustomerShoppingCart />} />
          <Route path="/checkout" element={<CustomerCheckout />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
