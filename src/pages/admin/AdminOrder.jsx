import { Paper } from '@mui/material'
import OrderDetailModal from '~/components/admin/order/OrderDetailModal'
import OrderHeader from '~/components/admin/order/OrderHeader'
import OrderTable from '~/components/admin/order/OrderTable'
import TableSkeleton from '~/components/admin/TableSkeleton'
import { useAdminOrder } from '~/hooks/admin/order.hook'

function AdminOrder({ status, name }) {
  const {
    filters,
    setFilters,
    handleFilter,
    handleClearFilter,
    provinces,
    loading,
    isDenied,
    orders,
    count,
    page,
    rowsPerPage,
    shops,
    handleOpenModal,
    handleCloseModal,
    openDetailModal,
    handleChangePage,
    handleChangeRowsPerPage,
    orderDetail,
    openUpdateStatusModal,
    selectedOrder,
    handleMarkOrderAsShipping,
    handleMarkOrderAsDelivered
  } = useAdminOrder({ status })
  return (
    <Paper
      sx={{
        height: 'calc(90vh - 24px)',
        width: 'calc(100% - 24px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <OrderHeader
        name={name}
        filters={filters}
        status={status}
        setFilters={setFilters}
        handleFilter={handleFilter}
        handleClearFilter={handleClearFilter}
        provinces={provinces}
        shops={shops}
      />

      {loading && <TableSkeleton columns={8} rows={rowsPerPage} />}
      {!loading && !isDenied && (
        <OrderTable
          status={status}
          orders={orders}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          handleOpenModal={handleOpenModal}
          openDetailModal={openDetailModal}
          handleCloseModal={handleCloseModal}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleMarkOrderAsShipping={handleMarkOrderAsShipping}
          handleMarkOrderAsDelivered={handleMarkOrderAsDelivered}
        />
      )}

      <OrderDetailModal
        open={openDetailModal}
        onClose={handleCloseModal}
        order={orderDetail}
      />
    </Paper>
  )
}
export default AdminOrder
