import OrderTab from '~/components/customer/CustomerOrders/OrderTab'
import { useState } from 'react'
import { queryOrderByUserAPI } from '~/api/order.api'
import { Box } from '@mui/material'
function CustomerOrders() {
  const [orders, setOrders] = useState([])

  const getOrders = async (data) => {
    const res = await queryOrderByUserAPI(data)
    setOrders(res?.data?.metadata || [])
  }

  return (
    <Box>
      <OrderTab getOrders={getOrders} orders={orders} setOrders={setOrders} />
    </Box>
  )
}
export default CustomerOrders
