import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { grey, blue } from '@mui/material/colors'
import { formatDate } from '~/utils/formatDate'

const OrderInfo = ({ order }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Typography>GHN:</Typography>
        <Typography sx={{ color: grey[600], ml: 1 }}>
          {order?.order_tracking_number}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', mt: '5px' }}>
        <Typography>Order at:</Typography>
        <Typography sx={{ color: grey[600], ml: 1 }}>
          {formatDate(order?.createdAt)}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', mt: '5px' }}>
        <Typography>Status from GHN:</Typography>
        <Typography
          sx={{ color: blue[600], textTransform: 'uppercase', ml: 1 }}
        >
          {order?.status_from_ghn}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', mt: '5px' }}>
        <Typography>Payment status:</Typography>
        <Typography
          sx={{ color: blue[600], textTransform: 'uppercase', ml: 1 }}
        >
          {order?.order_payment_status}
        </Typography>
      </Box>
    </Box>
  )
}

export default OrderInfo
