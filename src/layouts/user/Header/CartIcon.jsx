import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Badge from '@mui/material/Badge'

function CartIcon() {
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user?.currentUser)
  return (
    <Box
      sx={{ '&:hover': { cursor: 'pointer' } }}
      onClick={() => navigate('/cart')}
    >
      <Badge
        badgeContent={
          user?.cart_product_count > 0 ? user.cart_product_count : null
        }
        color="primary"
      >
        <LocalMallOutlinedIcon fontSize="large" />
      </Badge>
    </Box>
  )
}

export default CartIcon
