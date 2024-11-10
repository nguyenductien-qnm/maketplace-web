import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead
} from '@mui/material'
import Paper from '@mui/material/Paper'
import CartItemRow from './CartItemRow'
function CartTable() {
  return (
    <TableContainer component={Paper} sx={{ marginTop: '40px' }}>
      <Table sx={{ minWidth: '100%' }}>
        <TableHead>
          <TableCell></TableCell>
          <TableCell>Product</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Subtotal</TableCell>
          <TableCell></TableCell>
        </TableHead>
        <TableBody>
          <CartItemRow />
          <CartItemRow />
          <CartItemRow />
          <CartItemRow />
          <CartItemRow />
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default CartTable
