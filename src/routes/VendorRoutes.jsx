import VendorLayout from '~/layouts/user/VendorLayout'
import VendorDashboard from '~/pages/vendor/VendorDashboard'
import VendorOrders from '~/pages/vendor/VendorOrders'
import VendorOrderDetail from '~/pages/vendor/VendorOrderDetail'
import VendorProductForm from '~/pages/vendor/VendorProductForm'
import VendorProfile from '~/pages/vendor/VendorProfile'
import VendorWallet from '~/pages/vendor/VendorWallet'
import VendorSetting from '~/pages/vendor/VendorSetting'
import { RequireAuthRoute } from './RouteGuards'
import { Route } from 'react-router-dom'
import VendorMetrics from '~/pages/vendor/VendorMetrics'
import VoucherFormPage from '~/modules/voucher/shop/pages/VoucherForm.page'
import VoucherListPage from '~/modules/voucher/shop/pages/VoucherList.page'
import ProductListPage from '~/modules/product/shop/page/ProductList.page'
import ProductForm from '~/modules/product/shop/page/ProductForm.page'

const VendorRoutes = ({ user }) => {
  return (
    <Route element={<RequireAuthRoute user={user} allowedRoles={['SHOP']} />}>
      <Route element={<VendorLayout />}>
        <Route path="dashboard" element={<VendorDashboard />} />
        <Route path="product" element={<ProductListPage />} />
        <Route path="product/create" element={<ProductForm />} />
        <Route path="product/update/:_id" element={<ProductForm />} />
        <Route path="orders" element={<VendorOrders />} />
        <Route path="order-detail" element={<VendorOrderDetail />} />
        <Route path="profile" element={<VendorProfile />} />
        <Route path="voucher" element={<VoucherListPage />} />
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
