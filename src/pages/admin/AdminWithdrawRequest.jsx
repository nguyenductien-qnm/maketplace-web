import { Paper } from '@mui/material'
import ReasonModal from '~/components/admin/ReasonModal'
import WithdrawRequestDetailModal from '~/components/admin/withdrawRequest/WithdrawRequestDetailModal'
import WithdrawRequestHeader from '~/components/admin/withdrawRequest/WithdrawRequestHeader'
import WithdrawRequestTable from '~/components/admin/withdrawRequest/WithdrawRequestTable'
import { useAdminWithdrawRequest } from '~/hooks/admin/withdrawRequest.hook'
function AdminWithdrawRequest({ type }) {
  const {
    withdrawRequests,
    handleOpenModal,
    loading,
    openDetailModal,
    openReasonModal,
    withdrawRequestDetail,
    handleCloseModal,
    handleApprovalWithdrawRequest,
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
      <WithdrawRequestHeader type={type} />
      <WithdrawRequestTable
        loading={loading}
        withdrawRequests={withdrawRequests}
        handleOpenModal={handleOpenModal}
        handleApprovalWithdrawRequest={handleApprovalWithdrawRequest}
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
