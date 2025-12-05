import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import formatCurrency from '~/utils/formatCurrency'

function PaymentOverview({ summary, handlePlaceOrder }) {
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
          <Typography variant="body2">
            {formatCurrency(summary?.totalMerchandisePrice)}
          </Typography>
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
          <Typography variant="body2">
            {formatCurrency(summary?.totalShippingFee)}
          </Typography>
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
          <Typography variant="body2">
            {formatCurrency(summary?.discountValue)}
          </Typography>
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
            {formatCurrency(summary?.totalPayment)}
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
        <Button
          className="btn-user-place-order"
          onClick={handlePlaceOrder}
          variant="contained"
          sx={{ minWidth: '300px', minHeight: '46px' }}
        >
          Place Order
        </Button>
      </Box>
    </Paper>
  )
}
export default PaymentOverview
