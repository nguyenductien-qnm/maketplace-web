import { Navigate, Route } from 'react-router-dom'
import UserAccountLayout from '~/layouts/user/UserAccountLayout'
import CustomerProfile from '~/pages/customer/CustomerProfile'
import CustomerAddresses from '~/pages/customer/CustomerAddresses'
import CustomerDashboard from '~/pages/customer/CustomerDashBoard'
import CustomerNotifications from '~/pages/customer/CustomerNotification'
import CustomerOrderDetail from '~/pages/customer/CustomerOrderDetail'
import CustomerOrders from '~/pages/customer/CustomerOrders'
import CustomerWallet from '~/pages/customer/CustomerWallet'
import { RequireAuthRoute } from './RouteGuards'

const CustomerRoutes = ({ user }) => {
  return (
    <Route element={<RequireAuthRoute user={user} allowedRoles={['USER']} />}>
      <Route element={<UserAccountLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="orders" element={<CustomerOrders />} />
        <Route path="order-detail" element={<CustomerOrderDetail />} />
        <Route path="notifications" element={<CustomerNotifications />} />
        <Route path="profile" element={<CustomerProfile />} />
        <Route path="addresses" element={<CustomerAddresses />} />
        <Route path="wallet" element={<CustomerWallet />} />
      </Route>
    </Route>
  )
}

export default CustomerRoutes
