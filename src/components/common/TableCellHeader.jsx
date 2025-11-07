import TableCell from '@mui/material/TableCell'
import { grey } from '@mui/material/colors'

function TableCellHeader({ children, ...props }) {
  return (
    <TableCell
      sx={{
        backgroundColor: grey[100],
        fontWeight: 600
      }}
      {...props}
    >
      {children}
    </TableCell>
  )
}
export default TableCellHeader
