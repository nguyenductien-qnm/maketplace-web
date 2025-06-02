import { Navigate, Outlet } from 'react-router-dom'

export const RequireAuthRoute = ({ user, allowedRoles = [] }) => {
  if (!user) return <Navigate to="/auth/login" replace />

  if (
    allowedRoles.length &&
    !allowedRoles.some((role) => user.user_role?.includes(role))
  ) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}

export function RequireGuestRoute({ user }) {
  return user ? <Navigate to="/home" replace /> : <Outlet />
}
