import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import formatCurrency from '~/utils/formatCurrency'
import { blue, grey } from '@mui/material/colors'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useCustomerOrderItem } from '~/hooks/user/order.hook'
function OrderItem({ order, setOrders }) {
  const {
    customCreateOrder,
    onApprove,
    initialOptions,
    getStatusColor,
    goToOrderDetail
  } = useCustomerOrderItem(order, setOrders)

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
          <Typography
            sx={{
              textTransform: 'uppercase',
              color: getStatusColor(order?.order_status || '')
            }}
          >
            {order?.order_status}
          </Typography>
        </Box>
        <Divider sx={{ mt: '15px', mb: '15px' }} />
        {order?.order_products.map((p) => (
          <Box
            key={p.product_id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
              mb: '10px',
              '&:hover': { cursor: 'pointer' }
            }}
            onClick={goToOrderDetail}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '20px'
              }}
            >
              <Box>
                <img src={p?.product_thumb} style={{ maxWidth: '70px' }} />
              </Box>
              <Box>
                <Typography variant="body2">{p?.product_name}</Typography>
                {p?.product_variation.length > 0 && (
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
                )}
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
            mt: '25px',
            height: '40px'
          }}
        >
          {order?.order_payment_method === 'paypal' &&
            order?.order_payment_status === 'unpaid' && (
              <Box>
                <PayPalScriptProvider options={initialOptions}>
                  <PayPalButtons
                    style={{
                      layout: 'horizontal',
                      color: 'gold',
                      height: 40
                    }}
                    createOrder={(data, actions) => customCreateOrder(actions)}
                    onApprove={async (data, actions) =>
                      onApprove(actions, data)
                    }
                  />
                </PayPalScriptProvider>
              </Box>
            )}

          {order?.order_status === 'delivered' && (
            <Button variant="contained" sx={{ width: '120px' }}>
              Rate
            </Button>
          )}
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
