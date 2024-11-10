import { Box, TableCell, TableRow } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import QuantitySelector from '../../ProductDetail/ProductInfo/QuantitySelector'

function CartItemRow() {
  return (
    <TableRow>
      <TableCell sx={{ maxWidth: '70px', minWidth: '70px' }}>
        <img
          style={{ maxWidth: '100%', objectFit: 'cover' }}
          src="https://klbtheme.com/bevesi/wp-content/uploads/2024/04/1-19.jpg"
        />
      </TableCell>
      <TableCell sx={{ fontSize: '14px', fontWeight: '600' }}>
        SAMSUNG 75_ Class QN85C Neo QLED 4K Smart TV QN75QN85CAFXZA 2023
      </TableCell>
      <TableCell sx={{ fontSize: '14px' }}>$980.99</TableCell>
      <TableCell>
        <QuantitySelector />
      </TableCell>
      <TableCell sx={{ fontSize: '14px', fontWeight: '600' }}>
        $980.99
      </TableCell>
      <TableCell>
        <CancelIcon sx={{ color: 'red' }} />
      </TableCell>
    </TableRow>
  )
}
export default CartItemRow
