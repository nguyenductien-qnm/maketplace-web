import { StatusCodes } from 'http-status-codes'
import { useEffect, useState } from 'react'
import { getShopMetricsByOwnerAPI } from '~/api/shop.api'
import { asyncHandlerShop } from '~/helpers/asyncHandler'

const useVendorMetrics = () => {
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState(null)

  useEffect(() => {
    fetchMetrics()
  }, [])

  const fetchMetrics = async () => {
    setLoading(true)
    const [res] = await asyncHandlerShop(
      async () => await getShopMetricsByOwnerAPI()
    )

    if (res?.status === StatusCodes.OK) {
      const { metadata } = res.resData
      setMetrics(metadata || null)
    }

    setLoading(false)
  }

  return { loading, metrics }
}
export default useVendorMetrics
