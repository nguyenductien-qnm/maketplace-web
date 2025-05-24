import VendorSideBar from '~/components/vendor/VendorSidebar'
import UserLayout from './UserLayout'
import Grid2 from '@mui/material/Grid2'
import { Outlet } from 'react-router-dom'

function VendorLayout() {
  return (
    <UserLayout>
      <Grid2 container spacing={4}>
        <Grid2 size={2}>
          <VendorSideBar />
        </Grid2>
        <Grid2 size={10}>
          <Outlet />
        </Grid2>
      </Grid2>
    </UserLayout>
  )
}

export default VendorLayout
