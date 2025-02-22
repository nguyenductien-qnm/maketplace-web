import CircularIndeterminate from '~/components/CircularIndeterminate'
import EmptyOrder from './EmptyOrder'
import TabOrder from './TabOrder/TabOrder'
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { getOrdersByUserAPI } from '~/api/order.api'
import { useSearchParams } from 'react-router-dom'
import OrderDetail from './OrderDetail'
function Orders() {
  const [searchParams] = useSearchParams()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const _id = searchParams.get('_id')
  useEffect(() => {
    const getOrder = async () => {
      const res = await getOrdersByUserAPI()
      setOrders(res.data?.metadata)
      setLoading(false)
    }
    getOrder()
  }, [])

  return (
    <Box
      sx={{
        display: loading ? 'flex' : 'block',
        justifyContent: 'center',
      }}
    >
      {loading && <CircularIndeterminate />}
      {!loading && _id && <OrderDetail _id={_id} />}
      {!loading && !_id && orders.length === 0 && <EmptyOrder />}
      {!loading && !_id && orders.length > 0 && (
        <TabOrder orders={orders} setOrders={setOrders} />
      )}
    </Box>
  )
}
export default Orders
