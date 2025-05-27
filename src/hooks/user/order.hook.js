import { useEffect, useState } from 'react'
import { queryOrderByUserAPI, updatePayPalOrderIdAPI } from '~/api/order.api'
import { navigate } from '~/helpers/navigation'
export const useCustomerOrders = (initialStatus = 'ALL') => {
  const [status, setStatus] = useState(initialStatus)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const res = await queryOrderByUserAPI({ status })
        setOrders(res.data?.metadata || [])
      } catch (error) {
        console.error('Failed to fetch orders', error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [status])

  return {
    status,
    setStatus,
    orders,
    setOrders,
    loading
  }
}

export const useCustomerOrderItem = (order, setOrders) => {
  const initialOptions = {
    clientId:
      'AbfHg6nzfFwqrdvS2iKhKg-bklGMArRl832K2Bh0R3xvj0TX1BPirY_WQkSzSSKfPWybzsh6oavVBV04',
    currency: 'USD',
    intent: 'capture'
  }

  const customCreateOrder = async (actions) => {
    try {
      const orderID = await actions.order.create({
        purchase_units: [
          {
            amount: {
              value: order?.order_total_price,
              currency_code: 'USD'
            },
            description: 'Pay for order'
          }
        ]
      })
      return orderID
    } catch (error) {
      console.error('❌ Error creating order:', error)
      throw error
    }
  }

  const onApprove = async (actions, data) => {
    try {
      await actions.order.capture()
      const payloads = {
        _id: order?._id,
        order_paypal_id: data?.orderID
      }
      const res = await updatePayPalOrderIdAPI(payloads)
      if (res?.status === 200) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === res?.data?.metadata._id ? { ...res.data.metadata } : o
          )
        )
      }
    } catch (error) {
      console.error('❌ Error approving order:', error)
      throw error
    }
  }

  const getStatusColor = (status) => {
    if (status === 'pending') return '#1e88e5'
    if (status === 'cancelled' || status === 'reject') return '#e53935'
    return '#43a047'
  }

  const goToOrderDetail = () => {
    navigate(`/my-account/order-detail?_id=${order?._id}`)
  }

  return {
    customCreateOrder,
    onApprove,
    initialOptions,
    getStatusColor,
    goToOrderDetail
  }
}
