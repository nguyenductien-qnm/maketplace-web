import { Box, Divider, Paper, Typography, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { getOrderDetailAPI, updatePayPalOrderIdAPI } from '~/api/order.api'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import { useNavigate } from 'react-router-dom'
import { blue, grey } from '@mui/material/colors'
import formatCurrency from '~/utils/formatCurrency'
import formatDate from '~/utils/formatDate'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

function OrderDetail({ _id }) {
  const navigate = useNavigate()
  const [order, setOrder] = useState()
  useEffect(() => {
    const getOrderDetail = async () => {
      const res = await getOrderDetailAPI({ _id })
      setOrder(res.data?.metadata)
    }
    getOrderDetail()
  }, [_id])

  const customCreateOrder = async (actions) => {
    try {
      const orderID = await actions.order.create({
        purchase_units: [
          {
            amount: {
              value: order?.order_total_price,
              currency_code: 'USD'
            },
            description: 'Pay for order'
          }
        ]
      })
      return orderID
    } catch (error) {
      console.error('❌ Error creating order:', error)
      throw error
    }
  }

  const onApprove = async (actions, data) => {
    try {
      await actions.order.capture()
      const payloads = {
        _id: order?._id,
        order_paypal_id: data?.orderID
      }
      const res = await updatePayPalOrderIdAPI(payloads)
      if (res?.status === 200) {
        navigate('/my-account/orders')
      }
    } catch (error) {
      console.error('❌ Error creating order:', error)
      throw error
    }
  }

  const initialOptions = {
    clientId:
      'AbfHg6nzfFwqrdvS2iKhKg-bklGMArRl832K2Bh0R3xvj0TX1BPirY_WQkSzSSKfPWybzsh6oavVBV04',
    currency: 'USD',
    intent: 'capture'
  }

  return (
    <Paper sx={{ padding: '20px 10px', mb: '20px' }}>
      <Box sx={{ mt: '10px', display: 'flex', gap: '40px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6">Delivery Address</Typography>
          <Typography>{order?.order_address?.full_name}</Typography>
          <Typography variant="caption" sx={{ color: grey[600] }}>
            {order?.order_address?.phone_number}
          </Typography>
          <Typography variant="caption" sx={{ color: grey[600] }}>
            {order?.order_address?.street}
          </Typography>
          <Typography variant="caption" sx={{ color: grey[600] }}>
            {order?.order_address?.ward_name}
          </Typography>
          <Typography variant="caption" sx={{ color: grey[600] }}>
            {order?.order_address?.district_name}
          </Typography>
          <Typography variant="caption" sx={{ color: grey[600] }}>
            {order?.order_address?.province_name}
          </Typography>
        </Box>
        <Box
          sx={{
            width: '2px',
            height: '145px',
            backgroundColor: grey[300],
            mt: '8px'
          }}
        ></Box>
        <Box>
          <Box sx={{ display: 'flex' }}>
            <Typography>GHN:</Typography>
            <Typography sx={{ color: grey[600] }}>
              {order?.order_tracking_number}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mt: '5px' }}>
            <Typography>Order at:</Typography>
            <Typography sx={{ color: grey[600] }}>
              {formatDate(order?.createdAt)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mt: '5px' }}>
            <Typography>Status from GHN:</Typography>
            <Typography sx={{ color: blue[600], textTransform: 'uppercase' }}>
              {order?.status_from_ghn}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ mt: '20px', mb: '20px' }} />
      <Box>
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
        {order?.order_products?.map((p) => (
          <Box
            key={p?.product_id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
              mb: '10px',
              '&:hover': { cursor: 'pointer' }
            }}
            onClick={() => {
              navigate(`/my-account/order-detail?_id=${order?._id}`)
            }}
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
            flexDirection: 'column',
            alignItems: 'end',
            justifyContent: 'center',
            mt: '15px',
            gap: '10px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '400px',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="caption" sx={{ color: grey[600] }}>
              {' '}
              Merchandise total
            </Typography>
            <Typography variant="body2" sx={{ color: grey[600] }}>
              {formatCurrency(
                order?.order_total_price - order?.order_shipping_price
              )}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '400px',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="caption" sx={{ color: grey[600] }}>
              {' '}
              Shipping Fee
            </Typography>
            <Typography variant="body2" sx={{ color: grey[600] }}>
              {formatCurrency(order?.order_shipping_price)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '400px',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="caption" sx={{ color: grey[600] }}>
              {' '}
              Voucher Applied
            </Typography>
            <Typography variant="body2" sx={{ color: grey[600] }}>
              {formatCurrency(0)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '400px',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="caption" sx={{ color: grey[600] }}>
              {' '}
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
              {' '}
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
        {/* button  */}
        <Divider sx={{ mb: '15px', mt: '20px' }} />
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
export default OrderDetail
