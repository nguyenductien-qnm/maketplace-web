import { Outlet, useLocation } from 'react-router-dom'
import { useRef, useLayoutEffect, useEffect } from 'react'
import { Grid2, Paper } from '@mui/material'
import AdminSidebar from './AdminSidebar'
import AdminTopBar from './AdminTopBar'

function AdminLayout() {
  return (
    <Grid2 container spacing={3} sx={{ backgroundColor: '#eeeeee' }}>
      <Grid2 size={2.5}>
        <AdminSidebar />
      </Grid2>
      <Grid2 size={9.5}>
        <AdminTopBar />
        <Paper
          variant="outlined"
          sx={{
            p: '16px 16px 24px 24px ',
            width: 'calc(100% - 24px)',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'grey.50',
            maxHeight: 'calc(90vh - 48px)',
            minHeight: 0,
            overflowY: 'auto'
          }}
        >
          <Outlet />
        </Paper>
      </Grid2>
    </Grid2>
  )
}

export default AdminLayout
