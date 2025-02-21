import { Box, TextField, Typography } from '@mui/material'
import { Table, TableBody, TableCell, TableRow, Paper } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import formatCurrency from '~/utils/formatCurrency'
function CheckoutItem({ product }) {
  return (
    <Paper sx={{ padding: '25px 0' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          paddingLeft: '16px'
        }}
      >
        <StorefrontOutlinedIcon sx={{ color: blue[600] }} />
        <Typography variant="h6">{product?.shop_name}</Typography>
      </Box>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell
              sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <img src={product?.product_thumb} style={{ maxWidth: '50px' }} />
              <Typography>{product?.product_name}</Typography>
              <Typography variant="body2" sx={{ color: grey[600] }}>
                Variation: Trắng
              </Typography>
            </TableCell>
            <TableCell sx={{ width: '13.33%', textAlign: 'start' }}>
              {formatCurrency(product?.product_price)}
            </TableCell>
            <TableCell sx={{ width: '13.33%', textAlign: 'end' }}>
              {product?.quantity}
            </TableCell>
            <TableCell sx={{ width: '13.33%', textAlign: 'end' }}>
              {formatCurrency(product?.product_price * product?.quantity)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box
        sx={{
          display: 'flex',
          marginTop: '25px',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}
        >
          <Typography>Message for Sellers</Typography>
          <TextField size="small"></TextField>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '20px'
          }}
        >
          <Typography>Order Total ({product?.quantity} Item): </Typography>
          <Typography sx={{ color: blue[600] }} fontWeight="bold">
            {formatCurrency(product?.product_price * product?.quantity)}
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}
export default CheckoutItem
