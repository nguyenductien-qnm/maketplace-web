import { useState } from 'react'
import OrderTab from './OrderTab'
import {
  queryOrderByOwnerAPI,
  updateOrderStatusByOwnerAPI
} from '~/api/order.api'
import { useSearchParams } from 'react-router-dom'
import OrderDetail from '../OrderDetail/OrderDetail'

function VendorOrder() {
  const [orders, setOrders] = useState()
  const [searchParams] = useSearchParams()
  const _id = searchParams.get('_id')

  const getOrders = async (data) => {
    const res = await queryOrderByOwnerAPI(data)
    setOrders(res?.data?.metadata || [])
  }

  const updateOrderStatus = async (data) => {
    const res = await updateOrderStatusByOwnerAPI(data)

    if (res?.status === 200) {
      const data = res?.data?.metadata

      setOrders((prev) =>
        prev.map((orderItem) =>
          orderItem._id === data._id ? { ...orderItem, ...data } : orderItem
        )
      )
    }
  }

  return _id ? (
    <OrderDetail _id={_id} />
  ) : (
    <OrderTab
      getOrders={getOrders}
      orders={orders}
      updateOrderStatus={updateOrderStatus}
    />
  )
}
export default VendorOrder
