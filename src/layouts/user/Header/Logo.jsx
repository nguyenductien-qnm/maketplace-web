import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import logoImg from '~/assets/user/img/logo.png'
function Logo() {
  const navigate = useNavigate()
  return (
    <Box
      onClick={() => navigate('/home')}
      sx={{ '&:hover': { cursor: 'pointer' } }}
    >
      <img src={logoImg} style={{ height: '36px' }} />
    </Box>
  )
}

export default Logo
