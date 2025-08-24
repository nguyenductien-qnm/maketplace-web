import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import formatCurrency from '~/utils/formatCurrency'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'

const PAYMENT_METHOD_COLORS = {
  paypal: '#1976d2',
  cod: '#ff9800'
}

const PAYMENT_STATUS_COLORS = {
  paid: '#4caf50',
  unpaid: '#f44336'
}

const ORDER_STATUS_COLORS = {
  pending: '#9e9e9e',
  confirmed: '#1976d2',
  shipping: '#00bcd4',
  delivered: '#4caf50',
  cancel_requested: '#ffb300',
  cancelled: '#f44336',
  rejected: '#795548'
}

const VOUCHER_ICONS = {
  true: '#4caf50',
  false: '#f44336'
}

function OrderRow({
  order,
  status,
  handleOpenModal,
  handleMarkOrderAsShipping,
  handleMarkOrderAsDelivered
}) {
  return (
    <TableRow
      key={order?._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell align="left">{order.shop_name}</TableCell>
      <TableCell align="left">
        <Chip
          variant="outlined"
          label={order.order_payment_method?.toUpperCase()}
          size="small"
          sx={{
            width: '80px',
            color: PAYMENT_METHOD_COLORS[order.order_payment_method] || 'gray',
            borderColor:
              PAYMENT_METHOD_COLORS[order.order_payment_method] || 'gray'
          }}
        />
      </TableCell>
      <TableCell align="left">
        <Chip
          label={order.order_payment_status?.toUpperCase()}
          size="small"
          variant="outlined"
          sx={{
            width: '80px',
            color: PAYMENT_STATUS_COLORS[order.order_payment_status] || 'gray',
            borderColor:
              PAYMENT_STATUS_COLORS[order.order_payment_status] || 'gray'
          }}
        />
      </TableCell>

      <TableCell align="left">
        <Chip
          label={order.order_status.toUpperCase()}
          size="small"
          variant="outlined"
          sx={{
            width: '100px',
            color: ORDER_STATUS_COLORS[order.order_status] || 'gray',
            borderColor: ORDER_STATUS_COLORS[order.order_status] || 'gray',
            fontWeight: 500
          }}
        />
      </TableCell>

      <TableCell align="left">
        {order.isHaveVoucher ? (
          <CheckOutlinedIcon sx={{ color: VOUCHER_ICONS[true] }} />
        ) : (
          <ClearOutlinedIcon sx={{ color: VOUCHER_ICONS[false] }} />
        )}
      </TableCell>
      <TableCell align="left">
        <b>{formatCurrency(order.order_total_price)}</b>
      </TableCell>

      <TableCell align="left">{order.createdAt}</TableCell>

      <TableCell align="left">
        <Tooltip title="View detail order">
          <Box
            sx={{
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            onClick={() => {
              handleOpenModal({ order })
            }}
          >
            <InfoOutlinedIcon />
          </Box>
        </Tooltip>
      </TableCell>

      <TableCell align="left">
        {status === 'CONFIRMED' && order?.order_status === 'confirmed' && (
          <Tooltip title="Mark as shipping">
            <Button
              className="btn-mark-as-shipping"
              variant="contained"
              onClick={() => handleMarkOrderAsShipping({ _id: order?._id })}
            >
              <LocalShippingOutlinedIcon />
            </Button>
          </Tooltip>
        )}

        {status === 'SHIPPING' && order?.order_status === 'shipping' && (
          <Tooltip title="Mark as delivered">
            <Button
              className="btn-mark-as-delivered"
              variant="contained"
              onClick={() => handleMarkOrderAsDelivered({ _id: order?._id })}
            >
              <DoneOutlinedIcon />
            </Button>
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  )
}

export default OrderRow
