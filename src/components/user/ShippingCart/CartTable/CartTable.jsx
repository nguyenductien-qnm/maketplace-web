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
function CartTable({
  products,
  removeProduct,
  setQuantitySelected,
  handleSelectedProduct
}) {
  return (
    <TableContainer component={Paper} sx={{ marginTop: '40px' }}>
      <Table sx={{ minWidth: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Thumb</TableCell>
            <TableCell>Product</TableCell>
            <TableCell></TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Subtotal</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product) => (
            <CartItemRow
              key={product.product_id}
              product={product}
              removeProduct={removeProduct}
              setQuantitySelected={setQuantitySelected}
              handleSelectedProduct={handleSelectedProduct}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default CartTable
