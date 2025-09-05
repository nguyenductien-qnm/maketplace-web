import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'
import { renderAmount, renderDefault } from '~/components/common/common'

const PAYMENT_METHOD_COLORS = {
  paypal: '#1976d2',
  cod: '#ff9800'
}

const PAYMENT_STATUS_COLORS = {
  paid: '#4caf50',
  unpaid: '#f44336'
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
  handleMarkOrderAsDelivered,
  ORDER_TABLE_MAP
}) {
  const renderPaymentMethod = (_, key) => {
    const value = order?.[key]
    return (
      <Chip
        variant="outlined"
        label={capitalizeFirstLetter(value) || '—'}
        size="small"
        sx={{
          width: '80px',
          color: PAYMENT_METHOD_COLORS[value] || 'gray',
          borderColor: PAYMENT_METHOD_COLORS[value] || 'gray'
        }}
      />
    )
  }

  const renderPaymentStatus = (_, key) => {
    const value = order?.[key]
    return (
      <Chip
        variant="outlined"
        label={capitalizeFirstLetter(value) || '—'}
        size="small"
        sx={{
          width: '80px',
          color: PAYMENT_STATUS_COLORS[value] || 'gray',
          borderColor: PAYMENT_STATUS_COLORS[value] || 'gray'
        }}
      />
    )
  }

  const renderVoucher = (_, key) => {
    const value = order?.[key]
    return value ? (
      <CheckOutlinedIcon sx={{ color: VOUCHER_ICONS[true] }} />
    ) : (
      <ClearOutlinedIcon sx={{ color: VOUCHER_ICONS[false] }} />
    )
  }

  const renderDetailButton = () => (
    <Tooltip title="View detail order">
      <Box
        sx={{ '&:hover': { cursor: 'pointer' } }}
        onClick={() => handleOpenModal({ order })}
      >
        <InfoOutlinedIcon />
      </Box>
    </Tooltip>
  )

  const renderActionButton = () => (
    <>
      {status === 'CONFIRMED' && order?.order_status === 'confirmed' && (
        <Tooltip title="Mark as shipping">
          <Button
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
            variant="contained"
            onClick={() => handleMarkOrderAsDelivered({ _id: order?._id })}
          >
            <DoneOutlinedIcon />
          </Button>
        </Tooltip>
      )}
    </>
  )

  const RENDER_MAP = {
    order_payment_method: renderPaymentMethod,
    order_payment_status: renderPaymentStatus,
    isHaveVoucher: renderVoucher,
    order_total_price: renderAmount,
    detail: renderDetailButton,
    action: renderActionButton
  }

  return (
    <TableRow key={order?._id}>
      {ORDER_TABLE_MAP.map(({ key }) => (
        <TableCell key={key} align="left">
          {RENDER_MAP[key]
            ? RENDER_MAP[key]?.(order, key)
            : renderDefault(order, key)}
        </TableCell>
      ))}
    </TableRow>
  )
}

export default OrderRow
