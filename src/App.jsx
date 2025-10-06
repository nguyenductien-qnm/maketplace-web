import { useEffect, useRef } from 'react'
import {
  Routes,
  Route,
  Outlet,
  useLocation,
  useNavigate,
  Navigate
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ScrollToTop from './components/common/ScrollToTop'
import { setNavigate } from './helpers/navigation'

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
import CustomerSetupAccount from './pages/customer/CustomerSetupAccount'
import PublicRoutes from './routes/PublicRoutes'
import { RequireAuthRoute } from './routes/RouteGuards'
import CustomerRegisterShop from './pages/customer/CustomerRegisterShop'

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const user = useSelector((state) => state.user.currentUser)
  const socketRef = useRef(null)
  useEffect(() => {
    setNavigate(navigate)
  }, [navigate])

  useEffect(() => {
    if (user?.user_status !== 'pending_setup') {
      if (!user?._id) {
        if (socketRef.current) {
          socketRef.current.disconnect()
          socketRef.current = null
        }
        return
      }

      if (!socketRef.current) {
        socketRef.current = io('http://localhost:3000', {
          query: {
            user_id: user._id
          }
        })

        const handleSocketConnect = async () => {
          console.log('✅ Connected to socket.io server')
          dispatch(fetchNotificationUserAPI())
          dispatch(countUnreadNotificationUserAPI())
          if (user.user_role.includes('SHOP'))
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
    }
  }, [user?._id])

  const isShop = user?.user_role?.includes('SHOP')

  const isPendingSetup =
    user?.user_status === 'pending_setup' &&
    location.pathname !== '/setup-account'

  if (isPendingSetup) return <Navigate to="/setup-account" />

  return (
    <>
      <ScrollToTop />

      <Routes>
        {PublicRoutes()}

        <Route path="/auth/*" element={<Outlet />}>
          {AuthRoutes({ user })}
        </Route>

        <Route path="/my-account/*" element={<Outlet />}>
          {CustomerRoutes({ user })}
        </Route>

        <Route path="/vendor/*" element={<Outlet />}>
          {VendorRoutes({ user })}
        </Route>

        <Route path="/admin/*" element={<Outlet />}>
          {AdminRoutes({ user })}
        </Route>

        <Route element={<RequireAuthRoute user={user} />}>
          <Route path="/setup-account" element={<CustomerSetupAccount />} />

          <Route
            path="register-shop"
            element={
              isShop ? (
                <Navigate to="/my-account/dashboard" replace />
              ) : (
                <CustomerRegisterShop />
              )
            }
          />
        </Route>

        <Route path="/access-denied" element={<AccessDeniedPage />} />
        <Route path="/cart" element={<CustomerShoppingCart />} />
        <Route path="/checkout" element={<CustomerCheckOut />} />
      </Routes>
    </>
  )
}

export default App
