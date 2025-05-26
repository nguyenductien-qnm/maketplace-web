import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import OrderRow from './OrderRow'
import { useVendorOrderList } from '~/hooks/vendor/order.hook'
import OrderFilter from './OrderFilter'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import EmptyOrder from './EmptyOrder'

function OrderTable({ status }) {
  const { loading, orders, fetchOrders, updateOrderStatus } =
    useVendorOrderList(status)

  const handleFilterOrder = async (filters) => {
    await fetchOrders(filters)
  }

  return (
    <>
      <Box>
        <OrderFilter handleFilterOrder={handleFilterOrder} />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '50px' }}>
          <CircularIndeterminate />
        </Box>
      ) : orders.length === 0 ? (
        <EmptyOrder />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
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
            {orders?.map((order) => (
              <OrderRow
                key={order._id}
                order={order}
                updateOrderStatus={updateOrderStatus}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}
export default OrderTable
