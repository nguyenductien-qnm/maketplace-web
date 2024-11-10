import { Box } from '@mui/material'
import logoImg from '~/assets/user/img/logo.png'
function Logo() {
  return (
    <Box>
      <img src={logoImg} style={{ height: '36px' }} />
    </Box>
  )
}

export default Logo
