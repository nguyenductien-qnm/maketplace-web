import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import OrderRow from './OrderRow'

function OrderTable({ orders, updateOrderStatus }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox size="small" />
          </TableCell>
          <TableCell>CODE</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Pay Methods</TableCell>
          <TableCell>Payment</TableCell>
          <TableCell>Total Price</TableCell>
          <TableCell>Fee Shipping</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders?.map((order, index) => (
          <OrderRow
            order={order}
            key={index}
            updateOrderStatus={updateOrderStatus}
          />
        ))}
      </TableBody>
    </Table>
  )
}
export default OrderTable
