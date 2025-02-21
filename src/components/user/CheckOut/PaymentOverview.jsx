import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { PayPalButtons } from '@paypal/react-paypal-js'
import axios from 'axios'
import { updatePayPalOrderIdAPI } from '~/api/order.api'
import { API_ROOT } from '~/utils/constants'
import formatCurrency from '~/utils/formatCurrency'

function PaymentOverview({ price, handlePlaceOrder, paymentMethodSelected }) {
  //   const createOrderWithAPI = async (actions) => {
  //     try {
  //       const res = await handlePlaceOrder()

  //       if (res.status === 200) {
  //         const orderID = await actions.order.create({
  //           purchase_units: [
  //             {
  //               amount: {
  //                 value: price?.total_price,
  //                 currency_code: 'USD'
  //               },
  //               description: 'Pay for order'
  //             }
  //           ]
  //         })

  //         // const data = {
  //         //   _id: ,
  //         //   oder_paypal_id : orderID
  //         // }
  //         // const checkUpdatePayPalOrderId = await updatePayPalOrderIdAPI(data)

  //         return orderID
  //       } else {
  //         throw new Error('Please try again')
  //       }
  //     } catch (error) {
  //       console.error('❌ Error creating order:', error)
  //       throw error
  //     }
  //   }
  //   <PayPalButtons
  //   style={{ layout: 'horizontal', color: 'blue' }}
  //   createOrder={(data, actions) => createOrderWithAPI(actions)}
  //   onApprove={(data, actions) =>
  //     actions.order.capture().then((details) => {
  //       console.log('Thông tin thanh toán:', details)
  //       console.log('Payer Info:', details.payer)
  //       console.log('Order ID:', data.orderID)
  //     })
  //   }
  // />

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
            {formatCurrency(price?.total_merchandise_price)}
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
            {formatCurrency(price?.shipping_price)}
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
          <Typography variant="body2">{formatCurrency(0)}</Typography>
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
            {formatCurrency(price?.total_price)}
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
