import { Route } from 'react-router-dom'
import { RequireAuthRoute } from './RouteGuards'
import AdminLayout from '~/layouts/admin/AdminLayout'
import AdminShop from '~/pages/admin/AdminShop'
import AdminUser from '~/pages/admin/AdminUser'
import AdminVoucher from '~/pages/admin/AdminVoucher'
import AdminOrder from '~/pages/admin/AdminOrder'
import AdminProduct from '~/pages/admin/AdminProduct'
import AdminCategory from '~/pages/admin/AdminCategory'
import AdminWithdrawRequest from '~/pages/admin/AdminWithdrawRequest'
import AdminCommissionRate from '~/pages/admin/AdminCommissionRate'
import AdminWallet from '~/pages/admin/AdminWallet'
import AdminTransaction from '~/pages/admin/AdminTransaction'

const AdminRoutes = ({ user }) => {
  return (
    <Route element={<RequireAuthRoute user={user} allowedRoles={['ADMIN']} />}>
      <Route element={<AdminLayout />}>
        <Route path="shop">
          <Route
            path="approved"
            element={<AdminShop name="Approved Shops" status="APPROVED" />}
          />
          <Route
            path="rejected"
            element={<AdminShop name="Rejected Shops" status="REJECTED" />}
          />
          <Route
            path="pending"
            element={<AdminShop name="Pending Shops" status="PENDING" />}
          />
          <Route
            path="banned"
            element={<AdminShop name="Banned Shops" status="BANNED" />}
          />
          <Route
            path="suspended"
            element={<AdminShop name="Suspended Shops" status="PAUSED" />}
          />
        </Route>

        <Route path="user">
          <Route
            path="active"
            element={<AdminUser name="Active Users " status="ACTIVE" />}
          />
          <Route
            path="banned"
            element={<AdminUser name="Banned Users" status="BANNED" />}
          />
          <Route
            path="new-registrations"
            element={
              <AdminUser
                name="New Registration Users"
                status="NEW_REGISTRATION"
              />
            }
          />
        </Route>

        <Route path="voucher">
          <Route
            path="active"
            element={<AdminVoucher status="ACTIVE" name="Active Vouchers" />}
          />

          <Route
            path="expired"
            element={<AdminVoucher status="EXPIRED" name="Expired Vouchers" />}
          />

          <Route
            path="out-of-stock"
            element={
              <AdminVoucher
                status="OUT_OF_STOCK"
                name="Out Of Stock Vouchers"
              />
            }
          />

          <Route
            path="not-started"
            element={
              <AdminVoucher status="NOT_STARTED" name="Not Started Vouchers" />
            }
          />
        </Route>

        <Route path="order">
          <Route
            path="pending"
            element={<AdminOrder status="PENDING" name="Pending Orders" />}
          />

          <Route
            path="confirmed"
            element={<AdminOrder status="CONFIRMED" name="Confirmed Orders" />}
          />

          <Route
            path="shipping"
            element={<AdminOrder status="SHIPPING" name="Shipping Orders" />}
          />

          <Route
            path="delivered"
            element={<AdminOrder status="DELIVERED" name="Delivered Orders" />}
          />
        </Route>

        <Route path="products" element={<AdminProduct />} />

        <Route path="withdraw-request">
          <Route
            path="vendor"
            element={<AdminWithdrawRequest type="VENDOR" />}
          />
          <Route
            path="customer"
            element={<AdminWithdrawRequest type="CUSTOMER" />}
          />
        </Route>

        <Route path="wallet">
          <Route path="vendor" element={<AdminWallet type="VENDOR" />} />
          <Route path="customer" element={<AdminWallet type="CUSTOMER" />} />
        </Route>

        <Route path="transaction">
          <Route path="vendor" element={<AdminTransaction type="VENDOR" />} />
          <Route
            path="customer"
            element={<AdminTransaction type="CUSTOMER" />}
          />
        </Route>

        <Route path="category" element={<AdminCategory />} />

        <Route path="commission-rate" element={<AdminCommissionRate />} />
      </Route>
    </Route>
  )
}

export default AdminRoutes
