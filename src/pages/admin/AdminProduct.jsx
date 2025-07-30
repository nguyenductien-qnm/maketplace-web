import Paper from '@mui/material/Paper'
import ProductDetailModal from '~/components/admin/product/ProductDetailModal'
import ProductHeader from '~/components/admin/product/ProductHeader'
import ProductTable from '~/components/admin/product/ProductTable'
import ReasonModal from '~/components/admin/ReasonModal'
import { useAdminProduct } from '~/hooks/admin/product.hook'

function AdminProduct({ status, name }) {
  const {
    products,
    count,
    loading,
    productDetail,
    shops,
    categories,

    filters,
    setFilters,
    page,
    rowsPerPage,

    openDetailModal,
    openReasonModal,
    modalProps,

    handleFilter,
    handleClearFilter,
    handleChangePage,
    handleChangeRowsPerPage,
    handleApprovalProduct,

    handleOpenModal,
    handleCloseModal
  } = useAdminProduct({ status })
  return (
    <Paper
      sx={{
        height: 'calc(90vh - 24px)',
        width: 'calc(100% - 24px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <ProductHeader
        name={name}
        shops={shops}
        categories={categories}
        filters={filters}
        setFilters={setFilters}
        handleFilter={handleFilter}
        handleClearFilter={handleClearFilter}
      />

      <ProductTable
        loading={loading}
        products={products}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        handleApprovalProduct={handleApprovalProduct}
        handleOpenModal={handleOpenModal}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />

      <ProductDetailModal
        open={openDetailModal}
        onClose={handleCloseModal}
        product={productDetail}
        categories={categories}
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
