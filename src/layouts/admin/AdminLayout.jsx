import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'
import { Grid2 } from '@mui/material'
import AdminTopBar from './AdminTopBar'

function AdminLayout() {
  return (
    <Grid2 container spacing={3} sx={{ backgroundColor: '#eeeeee' }}>
      <Grid2 size={2.5}>
        <AdminSidebar />
      </Grid2>
      <Grid2 size={9.5}>
        <AdminTopBar />
        <Outlet />
      </Grid2>
    </Grid2>
  )
}

export default AdminLayout
