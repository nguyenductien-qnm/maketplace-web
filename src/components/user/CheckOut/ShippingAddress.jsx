import { Box, Paper, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { blue } from '@mui/material/colors'
function ShippingAddress() {
  return (
    <Paper sx={{ padding: '25px 30px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <LocationOnIcon sx={{ color: blue[600] }} />
        <Typography variant="h6">Delivery Address</Typography>
      </Box>
      <Box sx={{ display: 'flex', marginTop: '15px', gap: '20px' }}>
        <Typography fontWeight="bold">
          Nguyễn Đức Tiến (+84) 934914686
        </Typography>
        <Typography>
          35 Trần Đình Phong, Phường Vĩnh Điện, Thị Xã Điện Bàn, Quảng Nam
        </Typography>
        <Typography
          sx={{
            color: blue[600],
            '&:hover': {
              cursor: 'pointer',
              color: blue[700],
              textDecoration: 'underline'
            }
          }}
        >
          Change
        </Typography>
      </Box>
    </Paper>
  )
}
export default ShippingAddress
