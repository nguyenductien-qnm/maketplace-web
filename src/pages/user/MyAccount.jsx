import Grid from '@mui/material/Grid2'
import UserLayout from '~/layouts/user/UserLayout'
import UserWelcome from '~/components/user/MyAccount/UserWelcome'
import UserSideBar from '~/components/user/MyAccount/UserSidebar'
import { Navigate, useParams } from 'react-router-dom'
import DashBoard from '~/components/user/MyAccount/DashBoard/DashBoard'
import Orders from '~/components/user/MyAccount/Orders/Orders'
import AccountDetail from '~/components/user/MyAccount/AccountDetail/AccountDetail'
import Addresses from '~/components/user/MyAccount/Addresses/Addresses'
import AccountMigration from '~/components/user/MyAccount/AccountMigration/AccountMigration'
import { useSelector } from 'react-redux'
import Notifications from '~/components/user/MyAccount/Notifications/Notifications'
import Wallet from '~/components/user/MyAccount/Wallet/Wallet'
function MyAccount() {
  const { page } = useParams()
  const user = useSelector((state) => state.user.currentUser)
  return (
    <UserLayout>
      <UserWelcome />
      <Grid container spacing={4} sx={{ marginTop: '30px' }}>
        <Grid size={3}>
          <UserSideBar page={page} />
        </Grid>
        <Grid size={9}>
          {page === 'dashboard' && <DashBoard />}
          {page === 'orders' && <Orders />}
          {page === 'order-detail' && <Orders />}
          {page === 'notifications' && <Notifications />}
          {page === 'account-details' && <AccountDetail />}
          {page === 'addresses' && <Addresses />}
          {page === 'wallet' && <Wallet />}
          {page === 'account-migration' ? (
            !user?.user_role?.includes('SHOP') ? (
              <AccountMigration />
            ) : (
              <Navigate to="/my-account/dashboard" />
            )
          ) : null}
        </Grid>
      </Grid>
    </UserLayout>
  )
}
export default MyAccount
