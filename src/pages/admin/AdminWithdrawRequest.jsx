import { Paper, Typography } from '@mui/material'
import WithdrawRequestHeader from '~/components/admin/withdrawRequest/WithdrawRequestHeader'
function AdminWithdrawRequest({ type }) {
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
    </Paper>
  )
}
export default AdminWithdrawRequest
