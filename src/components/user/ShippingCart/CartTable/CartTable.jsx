import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import Paper from '@mui/material/Paper'
import CartItemRow from './CartItemRow'
function CartTable({ products }) {
  return (
    <TableContainer component={Paper} sx={{ marginTop: '40px' }}>
      <Table sx={{ minWidth: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Subtotal</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product) => (
            <CartItemRow product={product} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default CartTable
