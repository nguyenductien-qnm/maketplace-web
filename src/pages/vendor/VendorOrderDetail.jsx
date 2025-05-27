import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import OrderAddressCard from '~/components/shared/OrderDetail/OrderAddressCard'
import OrderProductList from '~/components/shared/OrderDetail/OrderProductList'
import OrderSummary from '~/components/shared/OrderDetail/OrderSummary'
import { grey, red } from '@mui/material/colors'
import OrderInfo from '~/components/shared/OrderDetail/OrderInfo'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import { useVendorOrderDetail } from '~/hooks/vendor/orderDetail.hook'

function OrderDetail() {
  const { order, loading, updateOrderStatus } = useVendorOrderDetail()

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
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            ></Box>
            <Divider sx={{ mt: '15px', mb: '15px' }} />
            <OrderProductList
              products={order?.order_products}
              orderId={order?._id}
            />
            <Divider />
            <OrderSummary order={order} />
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
      )}
    </Box>
  )
}
export default OrderDetail
