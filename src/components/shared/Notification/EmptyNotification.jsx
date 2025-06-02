import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import { blue } from '@mui/material/colors'
function EmptyNotification() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%'
      }}
    >
      <NotificationsActiveOutlinedIcon
        sx={{ fontSize: '100px', color: blue[600] }}
      />
      <Typography sx={{ fontSize: '14px' }}>
        The notification is empty.
      </Typography>
    </Box>
  )
}
export default EmptyNotification
