import Paper from '@mui/material/Paper'
import TransactionDetailModal from '~/components/admin/transaction/TransactionDetailModal'
import TransactionHeader from '~/components/admin/transaction/TransactionHeader'
import TransactionTable from '~/components/admin/transaction/TransactionTable'
import { useAdminTransaction } from '~/hooks/admin/transaction.hook'

function AdminTransaction({ type }) {
  const {
    count,
    filters,
    loading,
    page,
    rowsPerPage,
    setFilters,
    transactionDetail,
    transactions,
    shops,
    users,

    openModal,
    handleCloseModal,
    handleOpenModal,

    handleChangePage,
    handleChangeRowsPerPage,
    handleClearFilter,
    handleFilter
  } = useAdminTransaction({ type })
  return (
    <Paper
      sx={{
        height: 'calc(90vh - 24px)',
        width: 'calc(100% - 24px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <TransactionHeader
        type={type}
        users={users}
        shops={shops}
        filters={filters}
        setFilters={setFilters}
        handleFilter={handleFilter}
        handleClearFilter={handleClearFilter}
      />

      <TransactionTable
        type={type}
        loading={loading}
        transactions={transactions}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleOpenModal={handleOpenModal}
      />

      <TransactionDetailModal
        type={type}
        open={openModal}
        onClose={handleCloseModal}
        transaction={transactionDetail}
      />
    </Paper>
  )
}
export default AdminTransaction
