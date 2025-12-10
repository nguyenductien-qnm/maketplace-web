import Paper from '@mui/material/Paper'
import ProductDetailModal from '~/components/admin/product/ProductDetailModal'
import ProductHeader from '~/components/admin/product/ProductHeader'
import ProductTable from '~/components/admin/product/ProductTable'
import ReasonModal from '~/components/admin/ReasonModal'
import { useAdminProduct } from '~/hooks/admin/product.hook'

function AdminProduct() {
  const { ui, data, handler } = useAdminProduct()
  const { modalProps, loadingProductDetail, loadingAuditLog } = ui
  const { productDetail } = data

  return (
    <Paper
      sx={{
        height: 'calc(90vh - 48px)',
        width: 'calc(100% - 24px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <ProductHeader
        ui={{ ...ui.header }}
        data={{ ...data.filter }}
        handler={{ ...handler.header }}
      />

      <ProductTable
        ui={{ ...ui.table }}
        data={{ ...data.table }}
        handler={{ ...handler.table }}
      />

      <ProductDetailModal
        loading={loadingProductDetail}
        loadingAuditLog={loadingAuditLog}
        open={ui.modal.openDetailModal}
        onClose={handler.modal.handleCloseModal}
        productDetail={productDetail}
        categories={data.filter.categories}
        handleGetAuditLogDetail={handler.handleGetAuditLogDetail}
      />

      <ReasonModal
        open={ui.modal.openReasonModal}
        onClose={handler.modal.handleCloseModal}
        header={modalProps?.header}
        submitColor={modalProps?.submitColor}
        onSubmit={modalProps?.onSubmit}
      />
    </Paper>
  )
}
export default AdminProduct
