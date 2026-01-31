import Box from '@mui/material/Box'
import ProductHeader from '../components/ProductHeader'
import ProductTab from '../components/ProductTab'
import useShopProduct from '../hook/useShopProduct'
import ProductDetailModal from '../../_shared/components/ProductDetailModal'
import NotificationDialog from '~/modules/voucher/shop/components/VoucherList/NotificationDialog'
import ConfirmDialog from '~/modules/voucher/shop/components/VoucherList/ConfirmDialog'

function ProductListPage() {
  const { ui, data, handler } = useShopProduct()

  return (
    <Box>
      <ProductHeader
        ui={ui.header}
        data={data.filter}
        handler={handler.header}
      />

      <ProductTab ui={ui.tab} data={data.tab} handler={handler.tab} />

      <ProductDetailModal
        mode="shop"
        ui={ui.detailModal}
        data={data.detailModal}
        handler={handler.detailModal}
      />

      <NotificationDialog
        ui={ui.reasonDialog}
        data={data.auditLog}
        handler={handler.reasonDialog}
      />

      <ConfirmDialog ui={ui.confirmDialog} handler={handler.confirmDialog} />
    </Box>
  )
}

export default ProductListPage
