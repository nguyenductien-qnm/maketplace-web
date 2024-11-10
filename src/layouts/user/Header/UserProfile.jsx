import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'

import { Box, Typography } from '@mui/material'
function UserProfile() {
  return (
    <Box sx={{ display: 'flex', '& :hover': { cursor: 'pointer' } }}>
      <PersonOutlineOutlinedIcon fontSize="large" />
      <Box>
        <Typography sx={{ fontSize: '10px' }}>Welcome</Typography>
        <Typography
          sx={{ fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap' }}
        >
          Nguyen Duc Tien
        </Typography>
      </Box>
    </Box>
  )
}
export default UserProfile
