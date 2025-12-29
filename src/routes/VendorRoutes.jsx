import VendorLayout from '~/layouts/user/VendorLayout'
import VendorDashboard from '~/pages/vendor/VendorDashboard'
import VendorOrders from '~/pages/vendor/VendorOrders'
import VendorOrderDetail from '~/pages/vendor/VendorOrderDetail'
import VendorProductForm from '~/pages/vendor/VendorProductForm'
import VendorProducts from '~/pages/vendor/VendorProducts'
import VendorProfile from '~/pages/vendor/VendorProfile'
import VendorVoucher from '~/pages/vendor/VendorVouchers'
import VendorWallet from '~/pages/vendor/VendorWallet'
import VendorSetting from '~/pages/vendor/VendorSetting'
import { RequireAuthRoute } from './RouteGuards'
import { Route } from 'react-router-dom'
import VendorMetrics from '~/pages/vendor/VendorMetrics'
import VendorVoucherForm from '~/pages/vendor/VendorVoucherForm'
import VoucherFormPage from '~/modules/voucher/shop/pages/VoucherForm.page'

const VendorRoutes = ({ user }) => {
  return (
    <Route element={<RequireAuthRoute user={user} allowedRoles={['SHOP']} />}>
      <Route element={<VendorLayout />}>
        <Route path="dashboard" element={<VendorDashboard />} />
        <Route path="product" element={<VendorProducts />} />
        <Route path="product/create" element={<VendorProductForm />} />
        <Route path="product/update/:_id" element={<VendorProductForm />} />
        <Route path="orders" element={<VendorOrders />} />
        <Route path="order-detail" element={<VendorOrderDetail />} />
        <Route path="profile" element={<VendorProfile />} />
        <Route path="voucher" element={<VendorVoucher />} />
        <Route path="voucher/create" element={<VoucherFormPage />} />
        <Route path="voucher/update/:_id" element={<VoucherFormPage />} />
        <Route path="wallet" element={<VendorWallet />} />
        <Route path="setting" element={<VendorSetting />} />
        <Route path="metrics" element={<VendorMetrics />} />
      </Route>
    </Route>
  )
}

export default VendorRoutes
