import { useState } from 'react'
import OrderTab from '~/components/customer/CustomerOrders/OrderTab'
import {
  queryOrderByOwnerAPI,
  updateOrderStatusByOwnerAPI
} from '~/api/order.api'
function VendorOrders() {
  const [orders, setOrders] = useState()

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

  return (
    <OrderTab
      getOrders={getOrders}
      orders={orders}
      updateOrderStatus={updateOrderStatus}
    />
  )
}
export default VendorOrders
