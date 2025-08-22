import Paper from '@mui/material/Paper'
import ReasonModal from '~/components/admin/ReasonModal'
import WithdrawRequestDetailModal from '~/components/admin/withdrawRequest/WithdrawRequestDetailModal'
import WithdrawRequestHeader from '~/components/admin/withdrawRequest/WithdrawRequestHeader'
import WithdrawRequestTable from '~/components/admin/withdrawRequest/WithdrawRequestTable'
import { useAdminWithdrawRequest } from '~/hooks/admin/withdrawRequest.hook'

function AdminWithdrawRequest({ type }) {
  const {
    withdrawRequests,
    count,
    loading,
    openReasonModal,
    openDetailModal,
    withdrawRequestDetail,

    filters,
    setFilters,
    page,
    rowsPerPage,
    shops,
    users,

    handleFilter,
    handleClearFilter,
    handleChangePage,
    handleChangeRowsPerPage,
    handleCloseModal,

    handleOpenModal,

    handleApproveWithdrawRequest,
    handleRejectWithdrawRequest
  } = useAdminWithdrawRequest({ type })

  return (
    <Paper
      sx={{
        height: 'calc(90vh - 24px)',
        width: 'calc(100% - 24px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <WithdrawRequestHeader
        type={type}
        shops={shops}
        users={users}
        filters={filters}
        setFilters={setFilters}
        handleFilter={handleFilter}
        handleClearFilter={handleClearFilter}
      />
      <WithdrawRequestTable
        loading={loading}
        withdrawRequests={withdrawRequests}
        handleOpenModal={handleOpenModal}
        handleApproveWithdrawRequest={handleApproveWithdrawRequest}
        page={page}
        count={count}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <WithdrawRequestDetailModal
        open={openDetailModal}
        onClose={handleCloseModal}
        withdrawRequest={withdrawRequestDetail}
      />
      <ReasonModal
        header="Reject withdraw request"
        open={openReasonModal}
        onClose={handleCloseModal}
        onSubmit={handleRejectWithdrawRequest}
        submitText="Reject"
        submitColor="error"
      />
    </Paper>
  )
}
export default AdminWithdrawRequest
