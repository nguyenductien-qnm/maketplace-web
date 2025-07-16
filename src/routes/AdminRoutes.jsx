import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import AdminLayout from '~/layouts/admin/AdminLayout'
import AdminShop from '~/pages/admin/AdminShop'
import { RequireAuthRoute } from './RouteGuards'
import AdminUser from '~/pages/admin/AdminUser'
import AdminVoucher from '~/pages/admin/AdminVoucher'
import AdminOrder from '~/pages/admin/AdminOrder'
import AdminProduct from '~/pages/admin/AdminProduct'
import AdminCategory from '~/pages/admin/AdminCategory'
import AdminWithdrawRequest from '~/pages/admin/AdminWithdrawRequest'
import AdminCommissionRate from '~/pages/admin/AdminCommissionRate'

const AdminRoutes = () => {
  const user = useSelector((state) => state.user.currentUser)

  return (
    <Route element={<RequireAuthRoute user={user} allowedRoles={['ADMIN']} />}>
      <Route element={<AdminLayout />}>
        <Route path="shop">
          <Route
            path="active"
            element={<AdminShop name="Active Shops" status="ACTIVE" />}
          />
          <Route
            path="pending-shop-approvals"
            element={
              <AdminShop name="Pending Shop Approvals" status="PENDING" />
            }
          />
          <Route
            path="banned"
            element={<AdminShop name="Banned Shops" status="BLOCK" />}
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
            element={<AdminUser name="Banned Users" status="BLOCK" />}
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

        <Route path="product">
          <Route
            path="pending"
            element={<AdminProduct status="PENDING" name="Pending products" />}
          />
          <Route
            path="approved"
            element={
              <AdminProduct status="APPROVED" name="Approved products" />
            }
          />
          <Route
            path="rejected"
            element={
              <AdminProduct status="REJECTED" name="Rejected products" />
            }
          />
          <Route
            path="ban"
            element={<AdminProduct status="BAN" name="Ban products" />}
          />
        </Route>

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
        <Route path="category" element={<AdminCategory />} />
        <Route path="commission-rate" element={<AdminCommissionRate />} />
      </Route>
    </Route>
  )
}

export default AdminRoutes
