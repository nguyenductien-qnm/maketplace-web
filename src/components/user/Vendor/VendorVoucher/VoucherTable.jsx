import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import VoucherRow from './VoucherRow'

function VoucherTable() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox size="small" />
          </TableCell>
          <TableCell>CODE</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Start date</TableCell>
          <TableCell>End date</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Value</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <VoucherRow />
      </TableBody>
    </Table>
  )
}
export default VoucherTable
