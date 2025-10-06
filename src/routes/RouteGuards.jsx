import { Navigate, Outlet } from 'react-router-dom'

export const RequireAuthRoute = ({ user, allowedRoles = [] }) => {
  if (!user) return <Navigate to="/auth/login" replace />

  if (
    allowedRoles.length &&
    !allowedRoles.some((role) => user.user_role?.includes(role))
  ) {
    return <Navigate to="/access-denied" replace />
  }

  return <Outlet />
}

export const RequireGuestRoute = ({ user }) => {
  return user ? <Navigate to="/home" replace /> : <Outlet />
}
