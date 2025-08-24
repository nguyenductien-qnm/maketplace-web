import { Box, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import formatCurrency from '~/utils/formatCurrency'

function OrderSummary({ order }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
        justifyContent: 'center',
        mt: '15px',
        gap: '10px'
      }}
    >
      {[
        ['Merchandise total', order?.order_merchandise_price],
        ['Shipping Fee', order?.order_shipping_price],
        ['Voucher Applied', order?.order_voucher_value]
      ].map(([label, value]) => (
        <Box
          key={label}
          sx={{
            display: 'flex',
            width: '400px',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="caption" sx={{ color: grey[600] }}>
            {label}
          </Typography>
          <Typography variant="body2" sx={{ color: grey[600] }}>
            {formatCurrency(value)}
          </Typography>
        </Box>
      ))}
      <Box
        sx={{
          display: 'flex',
          width: '400px',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="caption" sx={{ color: grey[600] }}>
          Order Total
        </Typography>
        <Typography variant="h6" sx={{ color: blue[600] }}>
          {formatCurrency(order?.order_total_price)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '400px',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: '15px'
        }}
      >
        <Typography variant="caption" sx={{ color: grey[600] }}>
          Payment Method
        </Typography>
        <Typography
          sx={{
            color: blue[600],
            textTransform: 'uppercase',
            fontWeight: 'bold'
          }}
        >
          {order?.order_payment_method}
        </Typography>
      </Box>
    </Box>
  )
}

export default OrderSummary
