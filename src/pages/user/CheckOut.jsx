import UserLayout from '~/layouts/user/UserLayout'
import ShippingAddress from '~/components/user/CheckOut/ShippingAddress'
import OrderItem from '~/components/user/CheckOut/OrderItem'
import { Box, Table, TableCell, TableHead } from '@mui/material'
import PaymentOverview from '~/components/user/CheckOut/PaymentOverview'
function CheckOut() {
  return (
    <UserLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <ShippingAddress />
        <Table>
          <TableHead>
            <TableCell sx={{ width: '60%' }}>Products Ordered</TableCell>
            <TableCell sx={{ width: '13.33%', textAlign: 'start' }}>
              Unit Price
            </TableCell>
            <TableCell sx={{ width: '13.33%', textAlign: 'end' }}>
              Amount
            </TableCell>
            <TableCell sx={{ width: '13.33%', textAlign: 'end' }}>
              Item Subtotal
            </TableCell>
          </TableHead>
        </Table>
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <PaymentOverview />
      </Box>
    </UserLayout>
  )
}

export default CheckOut
