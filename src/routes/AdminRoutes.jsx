import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import AdminLayout from '~/layouts/admin/AdminLayout'
import AdminShop from '~/pages/admin/AdminShop'
import { RequireAuthRoute } from './RouteGuards'

const AdminRoutes = () => {
  const user = useSelector((state) => state.user.currentUser)

  return (
    <Route element={<RequireAuthRoute user={user} allowedRoles={['ADMIN']} />}>
      <Route element={<AdminLayout />}>
        <Route path="shop">
          <Route
            path="lists"
            element={<AdminShop name="Shop List" status="ACTIVE" />}
          />
          <Route
            path="pending-shop-approvals"
            element={
              <AdminShop name="Pending Shop Approvals" status="PENDING" />
            }
          />
          <Route
            path="banned-shop"
            element={<AdminShop name="Banned Shop" status="BLOCK" />}
          />
          <Route
            path="suspended-shop"
            element={<AdminShop name="Suspended Shop" status="PAUSED" />}
          />
        </Route>

        <Route path="shop">
          <Route
            path="lists"
            element={<AdminShop name="User List" status="ACTIVE" />}
          />
          <Route
            path="banned-user"
            element={<AdminShop name="Banned User" status="BLOCK" />}
          />
        </Route>
      </Route>
    </Route>
  )
}

export default AdminRoutes
