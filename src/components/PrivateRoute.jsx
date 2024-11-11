import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
  const currentUser = useSelector((state) => state.user.currentUser)

  return currentUser ? children : <Navigate path="/auth/login" />
}

export default PrivateRoute
