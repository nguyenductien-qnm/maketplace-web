import { useEffect, useRef } from 'react'
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
  useNavigate
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Home from './pages/customer/Home'

import ScrollToTop from './components/common/ScrollToTop'
import { setNavigate } from './helpers/navigation'

import CustomerProductDetails from './pages/customer/CustomerProductDetails'
import CustomerShop from './pages/customer/CustomerShop'

import { io } from 'socket.io-client'
import {
  countUnreadNotificationShopAPI,
  countUnreadNotificationUserAPI,
  fetchNotificationUserAPI,
  incrementNotificationUser
} from './redux/notification.slice'
import AuthRoutes from './routes/AuthRoutes'
import CustomerRoutes from './routes/CustomerRoutes'
import VendorRoutes from './routes/VendorRoutes'
import AccessDeniedPage from './pages/common/AccessDeniedPage'
import AdminRoutes from './routes/AdminRoutes'
import CustomerShoppingCart from './pages/customer/CustomerShoppingCart'
import CustomerCheckOut from './pages/customer/CustomerCheckout'

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const currentUser = useSelector((state) => state.user.currentUser)
  const socketRef = useRef(null)
  useEffect(() => {
    setNavigate(navigate)
  }, [navigate])

  useEffect(() => {
    if (!currentUser?._id) {
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
      return
    }

    if (!socketRef.current) {
      socketRef.current = io('http://localhost:3000', {
        query: {
          user_id: currentUser._id
        }
      })

      const handleSocketConnect = async () => {
        console.log('✅ Connected to socket.io server')
        dispatch(fetchNotificationUserAPI())
        dispatch(countUnreadNotificationUserAPI())
        if (currentUser.user_role.includes('SHOP'))
          dispatch(countUnreadNotificationShopAPI())
      }

      const handleNotification = (data) => {
        console.log('🔔 Received realtime notification:', data)
        dispatch(incrementNotificationUser())
      }

      socketRef.current.on('connect', handleSocketConnect)
      socketRef.current.on('notification', handleNotification)
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
  }, [currentUser?._id])

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
        <Route path="/home" element={<Home />} />
        <Route path="/shop/:shop_slug" element={<CustomerShop />} />
        <Route
          path="/product/:product_slug"
          element={<CustomerProductDetails />}
        />
        <Route path="/auth/*" element={<Outlet />}>
          {AuthRoutes()}
        </Route>

        <Route path="/my-account/*" element={<Outlet />}>
          {CustomerRoutes()}
        </Route>

        <Route path="/vendor/*" element={<Outlet />}>
          {VendorRoutes()}
        </Route>

        <Route path="/admin/*" element={<Outlet />}>
          {AdminRoutes()}
        </Route>

        <Route path="/unauthorized" element={<AccessDeniedPage />} />
        <Route path="/cart" element={<CustomerShoppingCart />} />
        <Route path="/checkout" element={<CustomerCheckOut />} />
      </Routes>
    </>
  )
}

export default App
