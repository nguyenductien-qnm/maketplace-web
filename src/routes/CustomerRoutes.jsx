import { useSelector } from 'react-redux'
import { Navigate, Route } from 'react-router-dom'
import UserAccountLayout from '~/layouts/user/UserAccountLayout'
import CustomerAccountDetail from '~/pages/customer/CustomerAccountDetail'
import CustomerAccountMigration from '~/pages/customer/CustomerAccountMigration'
import CustomerAddresses from '~/pages/customer/CustomerAddresses'
import CustomerDashboard from '~/pages/customer/CustomerDashBoard'
import CustomerNotifications from '~/pages/customer/CustomerNotification'
import CustomerOrderDetail from '~/pages/customer/CustomerOrderDetail'
import CustomerOrders from '~/pages/customer/CustomerOrders'
import CustomerWallet from '~/pages/customer/CustomerWallet'
import { RequireAuthRoute } from './RouteGuards'

const CustomerRoutes = () => {
  const user = useSelector((state) => state.user.currentUser)
  const isShopUser = user?.user_role?.includes('SHOP')

  return (
    <Route element={<RequireAuthRoute user={user} allowedRoles={['USER']} />}>
      <Route element={<UserAccountLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
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
            isShopUser ? (
              <Navigate to="/my-account/dashboard" replace />
            ) : (
              <CustomerAccountMigration />
            )
          }
        />
      </Route>
    </Route>
  )
}

export default CustomerRoutes
