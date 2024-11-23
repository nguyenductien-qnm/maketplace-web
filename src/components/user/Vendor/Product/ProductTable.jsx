import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import ProductRow from './ProductRow'

function ProductTable() {
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
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.from({ length: 5 }, (_, index) => (
          <ProductRow key={index} />
        ))}
      </TableBody>
    </Table>
  )
}
export default ProductTable
