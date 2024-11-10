import { Checkbox, TableCell, TableRow } from '@mui/material'

function ProductRow() {
  return (
    <TableRow>
      <TableCell>
        <Checkbox size="small" />
      </TableCell>
      <TableCell>
        <img
          style={{ height: '50px' }}
          src="https://klbtheme.com/bevesi/wp-content/uploads/2024/04/1-15-1024x1024.jpg"
        />
      </TableCell>
      <TableCell sx={{ maxWidth: '200px' }}>
        Apple iPhone 15 Pro Max 256GB Natural Titanium
      </TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>YES</TableCell>
      <TableCell>20</TableCell>
      <TableCell>$1.99</TableCell>
      <TableCell>09-2024</TableCell>
    </TableRow>
  )
}
export default ProductRow
