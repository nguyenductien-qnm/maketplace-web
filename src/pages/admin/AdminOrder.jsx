import Paper from '@mui/material/Paper'
import OrderDetailModal from '~/components/admin/order/OrderDetailModal'
import OrderHeader from '~/components/admin/order/OrderHeader'
import OrderTable from '~/components/admin/order/OrderTable'
import { useAdminOrder } from '~/hooks/admin/order.hook'

function AdminOrder({ status, name }) {
  const {
    filters,
    setFilters,
    provinces,
    orders,
    orderDetail,
    shops,
    count,
    page,
    rowsPerPage,
    openDetailModal,
    loading,
    handleFilter,
    handleClearFilter,
    handleOpenModal,
    handleCloseModal,
    handleChangePage,
    handleChangeRowsPerPage,
    handleMarkOrderAsShipping,
    handleMarkOrderAsDelivered,
    handleExportOrders,
    ORDER_TABLE_HEADERS
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
        provinces={provinces}
        shops={shops}
        setFilters={setFilters}
        handleFilter={handleFilter}
        handleClearFilter={handleClearFilter}
        handleExportOrders={handleExportOrders}
      />

      <OrderTable
        loading={loading}
        status={status}
        orders={orders}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        handleMarkOrderAsShipping={handleMarkOrderAsShipping}
        handleMarkOrderAsDelivered={handleMarkOrderAsDelivered}
        ORDER_TABLE_HEADERS={ORDER_TABLE_HEADERS}
      />

      <OrderDetailModal
        open={openDetailModal}
        onClose={handleCloseModal}
        order={orderDetail}
      />
    </Paper>
  )
}
export default AdminOrder
