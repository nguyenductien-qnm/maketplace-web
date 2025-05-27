import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import ConfirmModal from '~/components/common/ConfirmModal'
import OrderAddressCard from '~/components/shared/OrderDetail/OrderAddressCard'
import OrderProductList from '~/components/shared/OrderDetail/OrderProductList'
import OrderSummary from '~/components/shared/OrderDetail/OrderSummary'
import OrderInfo from '~/components/shared/OrderDetail/OrderInfo'
import { blue, grey } from '@mui/material/colors'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useCustomerOrderDetail } from '~/hooks/user/orderDetail.hook'

function CustomerOrderDetail() {
  const {
    order,
    loading,
    openModal,
    setOpenModal,
    customCreateOrder,
    onApprove,
    handleCancelOrder
  } = useCustomerOrderDetail()

  const initialOptions = {
    clientId:
      'AbfHg6nzfFwqrdvS2iKhKg-bklGMArRl832K2Bh0R3xvj0TX1BPirY_WQkSzSSKfPWybzsh6oavVBV04',
    currency: 'USD',
    intent: 'capture'
  }

  return (
    <Box>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '50px' }}>
          <CircularIndeterminate />
        </Box>
      )}

      {!loading && (
        <Paper sx={{ padding: '20px 10px', mb: '20px' }}>
          <Box sx={{ mt: '10px', display: 'flex', gap: '40px' }}>
            <OrderAddressCard address={order?.order_address} />
            <Box
              sx={{
                width: '2px',
                height: '145px',
                backgroundColor: grey[300],
                mt: '8px'
              }}
            ></Box>
            <OrderInfo order={order} />
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
            <OrderProductList
              products={order?.order_products}
              orderId={order?._id}
            />
            <Divider />
            <OrderSummary order={order} />
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
                        createOrder={(data, actions) =>
                          customCreateOrder(actions)
                        }
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
              <Button
                sx={{
                  color: grey[600],
                  border: '1px solid',
                  borderColor: grey[200],
                  width: '120px'
                }}
              >
                Contact seller
              </Button>
              <Button variant="contained" sx={{ width: '120px' }}>
                Buy again
              </Button>
              <Button
                onClick={() => setOpenModal(true)}
                variant="contained"
                color="error"
                sx={{ width: '120px' }}
              >
                Cancel order
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      <ConfirmModal
        header="Cancel Order"
        content="Are you sure you want to cancel this order? This action cannot be undone."
        confirmColor="error"
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleCancelOrder}
      />
    </Box>
  )
}
export default CustomerOrderDetail
