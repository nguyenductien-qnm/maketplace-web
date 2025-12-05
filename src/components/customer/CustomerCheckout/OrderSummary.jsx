import { Box, Typography } from '@mui/material'
import { grey, blue } from '@mui/material/colors'
import formatCurrency from '~/utils/formatCurrency'

const OrderSummary = ({ summary }) => {
  const summaryItems = [
    {
      label: 'Merchandise Subtotal',
      value: summary?.merchandise_price
    },
    {
      label: 'Shipping Subtotal',
      value: summary?.shipping_fee
    },
    {
      label: 'Discount Value',
      value: summary?.discount_value
    }
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
        gap: '7px',
        padding: '20px 0'
      }}
    >
      {summaryItems.map((item, index) => (
        <Box
          key={index}
          sx={{
            minWidth: '300px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ color: grey[600] }} variant="body2">
            {item.label}
          </Typography>
          <Typography variant="body2">{formatCurrency(item.value)}</Typography>
        </Box>
      ))}

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
          {formatCurrency(summary?.total_price)}
        </Typography>
      </Box>
    </Box>
  )
}

export default OrderSummary
