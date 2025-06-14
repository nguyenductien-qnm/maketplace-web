import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import AdminLayout from '~/layouts/admin/AdminLayout'
import AdminShop from '~/pages/admin/AdminShop'
import { RequireAuthRoute } from './RouteGuards'
import AdminUser from '~/pages/admin/AdminUser'

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
      </Route>
    </Route>
  )
}

export default AdminRoutes
