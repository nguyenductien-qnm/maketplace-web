import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

function OrderAddressCard({ address }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6">Delivery Address</Typography>
      <Typography>{address?.full_name}</Typography>
      <Typography variant="caption" sx={{ color: grey[600] }}>
        {address?.phone_number}
      </Typography>
      <Typography variant="caption" sx={{ color: grey[600] }}>
        {address?.street}
      </Typography>
      <Typography variant="caption" sx={{ color: grey[600] }}>
        {address?.ward_name}
      </Typography>
      <Typography variant="caption" sx={{ color: grey[600] }}>
        {address?.district_name}
      </Typography>
      <Typography variant="caption" sx={{ color: grey[600] }}>
        {address?.province_name}
      </Typography>
    </Box>
  )
}

export default OrderAddressCard
