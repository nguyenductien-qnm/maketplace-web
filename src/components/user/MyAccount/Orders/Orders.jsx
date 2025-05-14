import OrderTab from './OrderTab/OrderTab'
import { useState } from 'react'
import { queryOrderByUserAPI } from '~/api/order.api'
import { useSearchParams } from 'react-router-dom'
import OrderDetail from './OrderDetail'
function Orders() {
  const [orders, setOrders] = useState([])
  const [searchParams] = useSearchParams()
  const _id = searchParams.get('_id')

  const getOrders = async (data) => {
    const res = await queryOrderByUserAPI(data)
    setOrders(res?.data?.metadata || [])
  }

  return _id ? (
    <OrderDetail _id={_id} />
  ) : (
    <OrderTab getOrders={getOrders} orders={orders} setOrders={setOrders} />
  )
}
export default Orders
