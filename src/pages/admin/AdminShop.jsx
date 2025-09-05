import Paper from '@mui/material/Paper'
import ShopTable from '~/components/admin/shop/ShopTable'
import ShopHeader from '~/components/admin/shop/ShopHeader'
import ShopDetailModal from '~/components/admin/shop/ShopDetailModal'
import ReasonModal from '~/components/admin/ReasonModal'
import { useAdminShop } from '~/hooks/admin/shop.hook'

function AdminShop({ name, status }) {
  const {
    shops,
    count,
    loading,
    shopDetail,
    provinces,

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

    handleOpenModal,
    handleCloseModal,

    handleApproveShop,
    handleExportData,

    SHOP_TABLE_MAP
  } = useAdminShop({ status })

  return (
    <Paper
      sx={{
        height: 'calc(90vh - 24px)',
        width: 'calc(100% - 24px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <ShopHeader
        name={name}
        filters={filters}
        provinces={provinces}
        status={status}
        setFilters={setFilters}
        handleFilter={handleFilter}
        handleClearFilter={handleClearFilter}
        handleExportData={handleExportData}
      />

      <ShopTable
        loading={loading}
        shops={shops}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleOpenModal={handleOpenModal}
        handleApproveShop={handleApproveShop}
        SHOP_TABLE_MAP={SHOP_TABLE_MAP}
      />

      <ShopDetailModal
        open={openDetailModal}
        onClose={handleCloseModal}
        shop={shopDetail}
      />

      <ReasonModal
        open={openReasonModal}
        onClose={handleCloseModal}
        header={modalProps?.header}
        submitText={modalProps?.submitText}
        submitColor={modalProps?.submitColor}
        onSubmit={modalProps?.onSubmit}
      />
    </Paper>
  )
}

export default AdminShop
