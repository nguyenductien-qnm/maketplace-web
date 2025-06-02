import { Routes, Route } from 'react-router-dom'
import VendorLayout from '~/layouts/user/VendorLayout'
import VendorDashboard from '~/pages/vendor/VendorDashboard'
import VendorOrders from '~/pages/vendor/VendorOrders'
import VendorOrderDetail from '~/pages/vendor/VendorOrderDetail'
import VendorProductForm from '~/pages/vendor/VendorProductForm'
import VendorProducts from '~/pages/vendor/VendorProducts'
import VendorProfile from '~/pages/vendor/VendorProfile'
import VendorVoucher from '~/pages/vendor/VendorVouchers'
import VendorWallet from '~/pages/vendor/VendorWallet'
import { useSelector } from 'react-redux'
import { RequireAuthRoute } from './RouteGuards'

const VendorRoutes = () => {
  const user = useSelector((state) => state.user.currentUser)

  return (
    <Route element={<RequireAuthRoute user={user} allowedRoles={['SHOP']} />}>
      <Route element={<VendorLayout />}>
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
    </Route>
  )
}

export default VendorRoutes
