import { Button, Checkbox, TableCell, TableRow } from '@mui/material'
import formatDate from '~/utils/formatDate.js'
import { green, red } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'
import formatCodeOrder from '~/utils/formatCodeOrder'
import formatCurrency from '~/utils/formatCurrency'
function OrderRow({ order, updateOrderStatus }) {
  const navigate = useNavigate()

  return (
    <TableRow>
      <TableCell>
        <Checkbox size="small" />
      </TableCell>
      <TableCell
        sx={{ '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }}
        onClick={() => navigate(`/vendor/order-detail?_id=${order?._id}`)}
      >
        {formatCodeOrder(order?._id)}
      </TableCell>
      <TableCell>{formatDate(order?.createdAt)}</TableCell>
      <TableCell sx={{ textTransform: 'uppercase' }}>
        {order?.order_payment_method}
      </TableCell>
      <TableCell
        sx={{
          textTransform: 'uppercase',
          color:
            order?.order_payment_status === 'unpaid' ? red[600] : green[600],
          fontWeight: '700'
        }}
      >
        {order?.order_payment_status}
      </TableCell>
      <TableCell>{formatCurrency(order?.order_total_price)}</TableCell>
      <TableCell>{formatCurrency(order?.order_shipping_price)}</TableCell>
      {order?.order_status === 'pending' && (
        <TableCell>
          <Button
            variant="contained"
            onClick={() =>
              updateOrderStatus({ order_id: order?._id, status: 'confirm' })
            }
          >
            Approve
          </Button>
          {(order?.order_payment_status !== 'paid' ||
            order?.order_payment_method !== 'paypal') && (
            <Button
              onClick={() =>
                updateOrderStatus({ order_id: order?._id, status: 'reject' })
              }
              sx={{ backgroundColor: red[600], ml: '7px' }}
              variant="contained"
            >
              Reject
            </Button>
          )}
        </TableCell>
      )}
    </TableRow>
  )
}
export default OrderRow
