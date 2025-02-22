import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
function CartIcon() {
  const navigate = useNavigate()
  return (
    <Box
      sx={{ '&:hover': { cursor: 'pointer' } }}
      onClick={() => navigate('/cart')}
    >
      <LocalMallOutlinedIcon fontSize="large" />
    </Box>
  )
}

export default CartIcon
