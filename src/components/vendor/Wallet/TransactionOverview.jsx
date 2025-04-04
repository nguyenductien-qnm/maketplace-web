import {
  Alert,
  Box,
  Button,
  Card,
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
import formatCurrency from '~/utils/formatCurrency'

function TransactionOverview({ transactions }) {
  return (
    <Card sx={{ p: '20px' }}>
      <CardHeader
        title="Transaction overview"
        action={
          <Button variant="contained" color="primary">
            View transaction
          </Button>
        }
      />
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <CardContent sx={{ width: '100%' }}>
          {transactions.length === 0 ? (
            <Alert variant="filled" severity="info">
              You don’t have any transactions yet.
            </Alert>
          ) : (
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Processed at</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Amount&nbsp;($)</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow
                    key={transaction._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {transaction.processed_at}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {transaction.type}
                    </TableCell>
                    <TableCell align="right">
                      {transaction.withdrawal_details.email}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell align="right">
                      {transaction.status === 'pending' && 'Pending'}
                      {transaction.status === 'completed' && 'Completed'}
                      {transaction.status === 'failed' && 'Failed'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Box>
    </Card>
  )
}
export default TransactionOverview
