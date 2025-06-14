import Paper from '@mui/material/Paper'
import ShopTable from '~/components/admin/shop/ShopTable'
import ShopHeader from '~/components/admin/shop/ShopHeader'
import { useAdminShop } from '~/hooks/admin/shop.hook'
import TableSkeleton from '~/components/admin/TableSkeleton'

function AdminShop({ name, status }) {
  const {
    shops,
    count,
    loading,
    isDenied,
    shopDetail,

    filters,
    setFilters,
    page,
    rowsPerPage,

    openInfoModal,
    openReasonModal,
    modalProps,

    handleFilter,
    handleClearFilter,
    handleChangePage,
    handleChangeRowsPerPage,

    handleOpenModal,
    handleCloseModal,

    handleAcceptShop,
    handleGetShopDetail,
    handleExportData
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
        status={status}
        setFilters={setFilters}
        handleFilter={handleFilter}
        handleClearFilter={handleClearFilter}
        handleExportData={handleExportData}
      />
      {loading && <TableSkeleton columns={9} rows={rowsPerPage} />}
      {!loading && !isDenied && (
        <ShopTable
          shops={shops}
          count={count}
          page={page}
          shopDetail={shopDetail}
          handleGetShopDetail={handleGetShopDetail}
          rowsPerPage={rowsPerPage}
          modalProps={modalProps}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          openReasonModal={openReasonModal}
          openInfoModal={openInfoModal}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
          handleAcceptShop={handleAcceptShop}
        />
      )}
    </Paper>
  )
}

export default AdminShop
