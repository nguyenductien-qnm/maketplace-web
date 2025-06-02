import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import CustomerAuth from '~/pages/customer/CustomerAuth'
import CustomerVerifyAccount from '~/pages/customer/CustomerVerifyAccount'
import { RequireGuestRoute } from '~/routes/RouteGuards'

const AuthRoutes = () => {
  const user = useSelector((state) => state.user.currentUser)

  return (
    <Route element={<RequireGuestRoute user={user} />}>
      <Route path=":page" element={<CustomerAuth />} />
      <Route path="reset-password/:token" element={<CustomerAuth />} />
      <Route path="verify-account/:otp" element={<CustomerVerifyAccount />} />
    </Route>
  )
}

export default AuthRoutes
