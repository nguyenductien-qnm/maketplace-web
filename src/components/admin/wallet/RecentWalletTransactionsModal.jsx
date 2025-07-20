import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import NoData from '../NoData'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'
import formatCurrency from '~/utils/formatCurrency'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import { Box } from '@mui/material'

function RecentWalletTransactionsModal({ open, onClose, recentTransactions }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Recent wallet transactions</DialogTitle>
      <DialogContent>
        {!recentTransactions && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 5
            }}
          >
            <CircularIndeterminate />
          </Box>
        )}
        {recentTransactions?.length == 0 && <NoData />}
        {recentTransactions?.length > 0 && (
          <TableContainer
            sx={{
              flex: 1,
              overflowY: 'auto',
              width: '100%'
            }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Type</TableCell>
                  <TableCell align="left">Amount</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Created at</TableCell>
                  <TableCell align="left">Processed at</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentTransactions?.map((trans) => (
                  <TableRow
                    key={trans?._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">
                      {capitalizeFirstLetter(trans?.type)}
                    </TableCell>
                    <TableCell align="left">
                      <b>{formatCurrency(trans?.amount)}</b>
                    </TableCell>
                    <TableCell align="left">
                      {capitalizeFirstLetter(trans?.status)}
                    </TableCell>
                    <TableCell align="left">{trans?.createdAt}</TableCell>
                    <TableCell align="left">{trans?.processed_at}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default RecentWalletTransactionsModal
