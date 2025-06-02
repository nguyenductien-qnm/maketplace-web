import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'

import { Badge, Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function UserProfile() {
  const user = useSelector((state) => state.user.currentUser)
  const shopNotificationCount = useSelector(
    (state) => state.notification.shop_notifications_count
  )
  const navigate = useNavigate()
  return (
    <Box
      onClick={() => navigate('/my-account/dashboard')}
      sx={{ display: 'flex', '& :hover': { cursor: 'pointer' } }}
    >
      <Badge
        color="error"
        variant="dot"
        invisible={!shopNotificationCount || shopNotificationCount === 0}
      >
        <PersonOutlineOutlinedIcon fontSize="large" />
        <Box>
          <Typography sx={{ fontSize: '10px' }}>Welcome</Typography>
          <Typography
            sx={{ fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap' }}
          >
            {user?.user_name}
          </Typography>
        </Box>
      </Badge>
    </Box>
  )
}
export default UserProfile
