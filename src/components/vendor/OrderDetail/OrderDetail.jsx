import { Box, Divider, Paper, Typography, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getOrderDetailAPI, updateOrderStatusByOwnerAPI } from '~/api/order.api'
import { grey, blue, red } from '@mui/material/colors'
import { formatDate } from '~/utils/formatDate'
import formatCurrency from '~/utils/formatCurrency'

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
  const updateOrderStatus = async (status) => {
    const res = await updateOrderStatusByOwnerAPI({
      order_id: order?._id,
      status
    })
    if (res?.status === 200) navigate('/vendor/orders')
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
            <Typography>Status:</Typography>
            <Typography sx={{ color: blue[600], textTransform: 'uppercase' }}>
              {order?.order_status}
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
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        ></Box>
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
        {order?.order_status === 'pending' && (
          <Box>
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
              <Button
                variant="contained"
                onClick={() => updateOrderStatus('confirm')}
              >
                Approve
              </Button>
              {(order?.order_payment_status !== 'paid' ||
                order?.order_payment_method !== 'paypal') && (
                <Button
                  sx={{ backgroundColor: red[600] }}
                  variant="contained"
                  onClick={() => updateOrderStatus('reject')}
                >
                  Reject
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Paper>
  )
}
export default OrderDetail
