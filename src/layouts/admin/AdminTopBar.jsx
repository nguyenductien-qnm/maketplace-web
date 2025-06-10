import { Avatar, Box, Paper, TextField } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
function AdminTopBar() {
  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 3,
        ml: '-22px',
        height: '10vh',
        padding: '0 30px',
        borderRadius: 0
      }}
    >
      <TextField size="small" sx={{ width: '300px' }} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <NotificationsNoneIcon />
        <Avatar />
      </Box>
    </Paper>
  )
}

export default AdminTopBar
