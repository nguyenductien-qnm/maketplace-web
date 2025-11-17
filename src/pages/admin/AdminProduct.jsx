import Paper from '@mui/material/Paper'
import ProductDetailModal from '~/components/admin/product/ProductDetailModal'
import ProductHeader from '~/components/admin/product/ProductHeader'
import ProductTable from '~/components/admin/product/ProductTable'
import ReasonModal from '~/components/admin/ReasonModal'
import { useAdminProduct } from '~/hooks/admin/product.hook'

function AdminProduct({ status, name }) {
  const { ui, data, handler } = useAdminProduct({ status })
  const {
    openDetailModal,
    openReasonModal,
    modalProps,
    loadingProductDetail,
    loadingAuditLog
  } = ui
  const { productDetail, categories } = data
  const { handleCloseModal } = handler

  return (
    <Paper
      sx={{
        height: 'calc(90vh - 24px)',
        width: 'calc(100% - 24px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <ProductHeader ui={ui} data={data} handler={handler} />

      <ProductTable ui={ui} data={data} handler={handler} />

      <ProductDetailModal
        loading={loadingProductDetail}
        loadingAuditLog={loadingAuditLog}
        open={openDetailModal}
        onClose={handleCloseModal}
        productDetail={productDetail}
        categories={categories}
        handler={handler}
      />

      <ReasonModal
        open={openReasonModal}
        onClose={handleCloseModal}
        header={modalProps?.header}
        submitColor={modalProps?.submitColor}
        onSubmit={modalProps?.onSubmit}
      />
    </Paper>
  )
}
export default AdminProduct
