import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getOrderDetailAPI, updateOrderStatusByOwnerAPI } from '~/api/order.api'
import { navigate } from '~/helpers/navigation'

export const useVendorOrderDetail = () => {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState()
  const _id = searchParams.get('_id')

  useEffect(() => {
    const getOrderDetail = async () => {
      try {
        const res = await getOrderDetailAPI({ _id })
        setOrder(res.data?.metadata)
      } finally {
        setLoading(false)
      }
    }
    if (_id) getOrderDetail()
  }, [_id])

  const updateOrderStatus = async (status) => {
    const res = await updateOrderStatusByOwnerAPI({
      order_id: order?._id,
      status
    })
    if (res?.status === 200) navigate('/vendor/orders')
  }

  return { order, loading, updateOrderStatus }
}
