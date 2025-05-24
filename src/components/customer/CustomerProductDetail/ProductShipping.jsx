import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'

function ShippingInfo() {
  return (
    <Box
      sx={{
        color: grey[600],
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '7px'
      }}
    >
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <LocalShippingOutlinedIcon sx={{ fontSize: '14px' }} />
        <Typography sx={{ fontSize: '14px' }}>
          Free Shipping & Returns on this item
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Inventory2OutlinedIcon sx={{ fontSize: '14px' }} />
        <Typography sx={{ fontSize: '14px' }}>
          Delivery within 3-5 working days
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <ShieldOutlinedIcon sx={{ fontSize: '14px' }} />
        <Typography sx={{ fontSize: '14px' }}>Money Back Guarantee</Typography>
      </Box>
    </Box>
  )
}
export default ShippingInfo
