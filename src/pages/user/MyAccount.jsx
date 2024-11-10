import Grid from '@mui/material/Grid2'
import UserLayout from '~/layouts/user/UserLayout'
import UserWelcome from '~/components/user/MyAccount/UserWelcome'
import UserSideBar from '~/components/user/MyAccount/UserSidebar'
import { useParams } from 'react-router-dom'
import DashBoard from '~/components/user/MyAccount/DashBoard/DashBoard'
import Orders from '~/components/user/MyAccount/Orders/Orders'
import Wish from '~/components/user/MyAccount/Wish/Wish'
import AccountDetail from '~/components/user/MyAccount/AccountDetail/AccountDetail'
import Addresses from '~/components/user/MyAccount/Addresses/Addresses'
function MyAccount() {
  const { page } = useParams()

  return (
    <UserLayout>
      <UserWelcome />
      <Grid container spacing={4} sx={{ marginTop: '30px' }}>
        <Grid item size={3}>
          <UserSideBar page={page} />
        </Grid>
        <Grid item size={9}>
          {page === 'dashboard' && <DashBoard />}
          {page === 'orders' && <Orders />}
          {page === 'wish-list' && <Wish />}
          {page === 'account-details' && <AccountDetail />}
          {page === 'addresses' && <Addresses />}
        </Grid>
      </Grid>
    </UserLayout>
  )
}
export default MyAccount
