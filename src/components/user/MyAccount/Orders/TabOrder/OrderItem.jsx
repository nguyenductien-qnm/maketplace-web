import { Box, Paper, Typography, Divider, Button } from '@mui/material'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import { blue, grey } from '@mui/material/colors'
import formatCurrency from '~/utils/formatCurrency'
function OrderItem({ order }) {
  return (
    <Paper sx={{ padding: '20px 10px', mb: '20px' }}>
      <Box key={order._id}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <StorefrontOutlinedIcon />
            <Typography>{order?.shop_name}</Typography>
            <Button variant="contained" size="small">
              <CommentOutlinedIcon fontSize="small" sx={{ mr: '5px' }} />
              Chat
            </Button>
            <Button
              size="small"
              sx={{
                color: grey[600],
                border: '1px solid',
                borderColor: grey[200],
                ml: '-15px'
              }}
            >
              <StorefrontOutlinedIcon fontSize="small" sx={{ mr: '5px' }} />
              View Shop
            </Button>
          </Box>
          <Typography sx={{ textTransform: 'uppercase', color: blue[600] }}>
            {order?.order_status}
          </Typography>
        </Box>
        <Divider sx={{ mt: '15px', mb: '15px' }} />
        {order?.order_products.map((p) => (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
              mb: '10px'
            }}
          >
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Box>
                <img src={p?.product_thumb} style={{ maxWidth: '70px' }} />
              </Box>
              <Box>
                <Typography variant="body2">{p?.product_name}</Typography>
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="caption" sx={{ color: grey[600] }}>
                    Variation:{' '}
                  </Typography>
                  {p?.product_variation.map((variation, index) => (
                    <Typography
                      key={index}
                      variant="caption"
                      sx={{ color: grey[600] }}
                    >
                      {variation}
                    </Typography>
                  ))}
                </Box>
                <Typography variant="caption">x{p?.quantity}</Typography>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ color: blue[600] }}>
                {formatCurrency(p?.price)}
              </Typography>
            </Box>
          </Box>
        ))}
        <Divider />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            mt: '15px',
            gap: '10px'
          }}
        >
          <Typography> Order Total:</Typography>
          <Typography variant="h6" sx={{ color: blue[600] }}>
            {formatCurrency(order.order_total_price)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'end',
            mt: '25px'
          }}
        >
          <Button variant="contained" sx={{ width: '120px' }}>
            Rate
          </Button>
          <Button variant="contained" sx={{ width: '120px' }}>
            Buy Again
          </Button>
          <Button
            sx={{
              color: grey[600],
              border: '1px solid',
              borderColor: grey[200],
              width: '120px'
            }}
          >
            Contact Seller
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}
export default OrderItem
