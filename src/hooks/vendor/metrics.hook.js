import { StatusCodes } from 'http-status-codes'
import { useEffect, useState } from 'react'
import { getShopMetricsByOwnerAPI } from '~/api/shop.api'

const useVendorMetrics = () => {
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState(null)

  useEffect(() => {
    fetchMetrics()
  }, [])

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      const { status, resData } = await getShopMetricsByOwnerAPI()
      if (status === StatusCodes.OK) {
        const { metadata } = resData
        setMetrics(metadata || null)
      }
    } catch (err) {
      if (err?.status === StatusCodes.FORBIDDEN) navigate('/unauthorized')
    } finally {
      setLoading(false)
    }
  }

  return { loading, metrics }
}
export default useVendorMetrics
