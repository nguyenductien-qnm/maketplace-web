import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import ProductRow from './ProductRow'

function ProductTable({ listProduct }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox size="small" />
          </TableCell>
          <TableCell>Image</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>SKU</TableCell>
          <TableCell>Stock</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {listProduct.map((productItem, index) => (
          <ProductRow productItem={productItem} key={index} />
        ))}
      </TableBody>
    </Table>
  )
}
export default ProductTable
