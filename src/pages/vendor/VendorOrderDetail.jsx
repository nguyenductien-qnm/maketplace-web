import { useSearchParams } from 'react-router-dom'
import OrderDetail from '~/components/vendor/VendorOrderDetail/OrderDetail'
function VendorOrderDetail() {
  const [searchParams] = useSearchParams()
  const _id = searchParams.get('_id')
  return <OrderDetail _id={_id} />
}

export default VendorOrderDetail
