import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'

import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function UserProfile() {
  const userInfo = useSelector((state) => state.user.currentUser)
  const navigate = useNavigate()
  return (
    <Box
      onClick={() => navigate('/my-account/account-details')}
      sx={{ display: 'flex', '& :hover': { cursor: 'pointer' } }}
    >
      <PersonOutlineOutlinedIcon fontSize="large" />
      <Box>
        <Typography sx={{ fontSize: '10px' }}>Welcome</Typography>
        <Typography
          sx={{ fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap' }}
        >
          {userInfo?.user_name}
        </Typography>
      </Box>
    </Box>
  )
}
export default UserProfile
