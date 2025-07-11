import { Paper } from '@mui/material'
import ProductDetailModal from '~/components/admin/product/ProductDetailModal'
import ProductHeader from '~/components/admin/product/ProductHeader'
import ProductTable from '~/components/admin/product/ProductTable'
import ReasonModal from '~/components/admin/ReasonModal'
import TableSkeleton from '~/components/admin/TableSkeleton'
import { useAdminProduct } from '~/hooks/admin/product.hook'

function AdminProduct({ status, name }) {
  const {
    filters,
    setFilters,
    handleFilter,
    handleClearFilter,
    loading,
    isDenied,
    products,
    count,
    page,
    rowsPerPage,
    shops,
    categories,
    handleOpenModal,
    handleCloseModal,
    openDetailModal,
    handleChangePage,
    handleChangeRowsPerPage,
    productDetail,
    handleApprovalProduct,
    openReasonModal,
    modalProps
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
        shops={shops}
        categories={categories}
        name={name}
        filters={filters}
        setFilters={setFilters}
        handleFilter={handleFilter}
        handleClearFilter={handleClearFilter}
      />

      {loading && <TableSkeleton columns={10} rows={rowsPerPage} />}
      {!loading && !isDenied && (
        <ProductTable
          status={status}
          products={products}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          handleApprovalProduct={handleApprovalProduct}
          handleOpenModal={handleOpenModal}
          openDetailModal={openDetailModal}
          handleCloseModal={handleCloseModal}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}

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
