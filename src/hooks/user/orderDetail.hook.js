import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  cancelOrderByUserAPI,
  getOrderDetailAPI,
  updatePayPalOrderIdAPI
} from '~/api/order.api'

export const useCustomerOrderDetail = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const _id = searchParams.get('_id')

  const [order, setOrder] = useState()
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderDetailAPI({ _id })
        setOrder(res.data?.metadata)
      } finally {
        setLoading(false)
      }
    }
    if (_id) fetchOrder()
  }, [_id])

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
        navigate('/my-account/orders')
      }
    } catch (error) {
      console.error('❌ Error approving order:', error)
      throw error
    }
  }

  const handleCancelOrder = async () => {
    const res = await cancelOrderByUserAPI({ _id }, [
      '.btn-confirm-modal',
      '.btn-close-confirm-modal'
    ])
    if (res?.status === 200) {
      setOpenModal(false)
      navigate('/my-account/orders')
    }
  }

  return {
    order,
    loading,
    openModal,
    setOpenModal,
    customCreateOrder,
    onApprove,
    handleCancelOrder
  }
}
