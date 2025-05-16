import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { useState } from 'react'
import NotificationModal from '~/components/common/NotificationModal'
import WithdrawModal from './WithdrawModal'
import formatCurrency from '~/utils/formatCurrency'
import { toast } from 'react-toastify'

function BalanceWidget({
  balance,
  accounts,
  requestWithdraws,
  handleRequestWithdraw
}) {
  const [openModalNotification, setOpenModalNotification] = useState(false)
  const [openModalWithdraw, setOpenModalWithdraw] = useState(false)
  const [header, setHeader] = useState('')
  const [content, setContent] = useState('')

  const handleClickButton = () => {
    if (balance < 50) {
      setHeader('Send Withdraw Request')
      setContent('You dont have sufficient balance for a withdraw request!')
      setOpenModalNotification(true)
    } else if (accounts.length === 0) {
      setHeader('Send Withdraw Request')
      setContent(
        'You dont have a linked payment account. Please add one before requesting a withdrawal!'
      )
      setOpenModalNotification(true)
    } else {
      setOpenModalWithdraw(true)
    }
  }

  const customHandleRequestWithdraw = async (data) => {
    data.amount = Number(data.amount.replace(/[$,]/g, ''))
    if (data.amount > balance) {
      toast.error('Withdrawal amount exceeds your available balance.')
      return
    } else {
      const res = await handleRequestWithdraw(data)
      if (res.status === 200) setOpenModalWithdraw(false)
    }
  }

  return (
    <Box>
      <Card sx={{ p: '20px' }}>
        <CardHeader title="Balance" />
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex' }}>
              <Typography>Your Balance:</Typography>
              <Typography>{formatCurrency(balance)}</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography>Minimum Withdraw Amount:</Typography>
              <Typography>$50.00</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => handleClickButton()}
              variant="contained"
              color="primary"
            >
              Request withdraw
            </Button>
          </CardActions>
        </Box>
        <Divider />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>Withdraw Requests:</Typography>
            {requestWithdraws.length === 0 ? (
              <Typography>No withdraw requests yet</Typography>
            ) : (
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Processed at</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Amount&nbsp;($)</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requestWithdraws.map((withdraw) => (
                    <TableRow
                      key={withdraw._id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 }
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {withdraw.processed_at}
                      </TableCell>
                      <TableCell align="right">
                        {withdraw.paypal_email}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(withdraw.amount)}
                      </TableCell>
                      <TableCell align="right">
                        {withdraw.status === 'pending' && 'Pending'}
                        {withdraw.status === 'approved' && 'Approved'}
                        {withdraw.status === 'completed' && 'Completed'}
                        {withdraw.status === 'rejected' && 'Rejected'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>
        </CardContent>
      </Card>
      <NotificationModal
        open={openModalNotification}
        onClose={() => setOpenModalNotification(false)}
        header={header}
        content={content}
      />
      <WithdrawModal
        open={openModalWithdraw}
        onClose={() => setOpenModalWithdraw(false)}
        handleRequestWithdraw={customHandleRequestWithdraw}
        balance={balance}
        accounts={accounts}
      />
    </Box>
  )
}
export default BalanceWidget
