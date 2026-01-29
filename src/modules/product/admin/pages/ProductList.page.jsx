import Box from '@mui/material/Box'
import ProductHeader from '../components/ProductHeader'
import ProductFilter from '../components/ProductFilter'
import ProductSummary from '../components/ProductSummary'
import ProductDetailModal from '../../_shared/components/ProductDetailModal'
import { useAdminProduct } from '../hooks/useAdminProduct'
import ProductTable from '../components/ProductTable'
import ReasonModal from '~/modules/voucher/admin/components/ReasonModal'

function ProductList() {
  const { ui, data, handler } = useAdminProduct()

  return (
    <Box>
      <ProductHeader ui={ui.header} handler={handler.header} />

      <ProductSummary ui={ui.summary} summary={data.summary} />

      <ProductFilter
        ui={ui.filter}
        data={data.filters}
        handler={handler.filter}
      />

      <ProductTable ui={ui.table} data={data.table} handler={handler.table} />

      <ProductDetailModal
        ui={ui.detailModal}
        data={data.detailModal}
        handler={handler.detailModal}
        mode="admin"
      />

      <ReasonModal ui={ui.reasonModal} handler={handler.reasonModal} />
    </Box>
  )
}
export default ProductList
