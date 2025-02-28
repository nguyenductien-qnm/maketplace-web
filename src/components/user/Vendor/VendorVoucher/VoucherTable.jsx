import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import VoucherRow from './VoucherRow'

function VoucherTable({ vouchers, shopUpdateVoucher, shopDeleteVoucher }) {
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
          <TableCell>Used</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Value</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {vouchers &&
          vouchers.map((voucher, index) => (
            <VoucherRow
              key={index}
              voucher={voucher}
              index={index}
              shopUpdateVoucher={shopUpdateVoucher}
              shopDeleteVoucher={shopDeleteVoucher}
            />
          ))}
      </TableBody>
    </Table>
  )
}
export default VoucherTable
