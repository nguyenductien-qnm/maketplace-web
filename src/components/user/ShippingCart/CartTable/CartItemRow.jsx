import { Box, TableCell, TableRow } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import QuantitySelector from '../../ProductDetail/ProductInfo/QuantitySelector'

function CartItemRow({ product }) {
  return (
    <TableRow>
      <TableCell sx={{ maxWidth: '70px', minWidth: '70px' }}>
        <img
          style={{ maxWidth: '100%', objectFit: 'cover' }}
          src={product?.product_thumb}
        />
      </TableCell>
      <TableCell sx={{ fontSize: '14px', fontWeight: '600' }}>
        {product?.product_name}
      </TableCell>
      <TableCell sx={{ fontSize: '14px' }}>${product?.product_price}</TableCell>
      <TableCell>
        <QuantitySelector quantitySelected={product?.quantity} />
      </TableCell>
      <TableCell sx={{ fontSize: '14px', fontWeight: '600' }}>
        ${product?.product_price * product?.quantity}
      </TableCell>
      <TableCell>
        <CancelIcon sx={{ color: 'red' }} />
      </TableCell>
    </TableRow>
  )
}
export default CartItemRow
