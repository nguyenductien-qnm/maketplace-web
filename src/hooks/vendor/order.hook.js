import { useEffect, useState } from 'react'
import {
  queryOrderByOwnerAPI,
  updateOrderStatusByOwnerAPI
} from '~/api/order.api'

export const useVendorOrderList = (status) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async (filters = {}) => {
    try {
      setLoading(true)
      const res = await queryOrderByOwnerAPI({ status, ...filters })
      setOrders(res?.data?.metadata || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const updateOrderStatus = async (data) => {
    const res = await updateOrderStatusByOwnerAPI(data)

    if (res?.status === 200) {
      const updatedOrder = res?.data?.metadata

      setOrders((prev) =>
        prev.map((orderItem) =>
          orderItem._id === updatedOrder._id
            ? { ...orderItem, ...updatedOrder }
            : orderItem
        )
      )
    }
  }

  return {
    loading,
    orders,
    fetchOrders,
    updateOrderStatus
  }
}
