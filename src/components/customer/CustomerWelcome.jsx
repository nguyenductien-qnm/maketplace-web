import { Box, Typography } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import { grey } from '@mui/material/colors'
import { useSelector } from 'react-redux'

function CostumerWelcome() {
  const user = useSelector((state) => state.user.currentUser)
  return (
    <Box
      sx={{ display: 'flex', gap: '20px', '& :hover': { cursor: 'pointer' } }}
    >
      <PersonOutlineOutlinedIcon
        fontSize="large"
        sx={{
          padding: '5px',
          backgroundColor: grey[200],
          borderRadius: '9999px'
        }}
      />
      <Box>
        <Typography
          sx={{ fontSize: '12px', fontWeight: '600', color: grey[600] }}
        >
          Welcome back,
        </Typography>
        <Typography
          sx={{ fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap' }}
        >
          {user?.user_name}
        </Typography>
      </Box>
    </Box>
  )
}
export default CostumerWelcome
