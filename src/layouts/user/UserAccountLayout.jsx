import { Outlet } from 'react-router-dom'
import UserLayout from './UserLayout'
import Grid2 from '@mui/material/Grid2'
import CostumerWelcome from '~/components/customer/CustomerWelcome'
import CostumerSideBar from '~/components/customer/CustomerSidebar'
function UserAccountLayout() {
  return (
    <UserLayout>
      <CostumerWelcome />
      <Grid2 container spacing={4} sx={{ marginTop: '30px' }}>
        <Grid2 size={3}>
          <CostumerSideBar />
        </Grid2>
        <Grid2 size={9}>
          <Outlet />
        </Grid2>
      </Grid2>
    </UserLayout>
  )
}
export default UserAccountLayout
