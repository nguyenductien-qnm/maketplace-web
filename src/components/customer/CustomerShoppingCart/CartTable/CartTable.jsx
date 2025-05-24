import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import CartRow from './CartRow'
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
            <CartRow
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
