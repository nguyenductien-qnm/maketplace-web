import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'

function PaymentOverview() {
  return (
    <Paper sx={{ padding: '30px 16px' }}>
      <Box sx={{ padding: '0 0 30px 0' }}>
        <Typography>Payment Summary</Typography>
      </Box>
      <Divider />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',
          gap: '7px',
          padding: '20px 0'
        }}
      >
        <Box
          sx={{
            minWidth: '300px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ color: grey[600] }} variant="body2">
            Merchandise Subtotal
          </Typography>
          <Typography variant="body2">₫465.500</Typography>
        </Box>
        <Box
          sx={{
            minWidth: '300px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ color: grey[600] }} variant="body2">
            Shipping Subtotal
          </Typography>
          <Typography variant="body2">₫92.600</Typography>
        </Box>
        <Box
          sx={{
            minWidth: '300px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ color: grey[600] }} variant="body2">
            Voucher Discount
          </Typography>
          <Typography variant="body2">-₫45.000</Typography>
        </Box>
        <Box
          sx={{
            minWidth: '300px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography sx={{ color: grey[600] }} variant="body2">
            Total Payment
          </Typography>
          <Typography fontSize="25px" sx={{ color: blue[600] }}>
            ₫513.100
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '30px 0 10px 0'
        }}
      >
        <Button variant="contained" sx={{ width: '210px', height: '40px' }}>
          Place Order
        </Button>
      </Box>
    </Paper>
  )
}
export default PaymentOverview
