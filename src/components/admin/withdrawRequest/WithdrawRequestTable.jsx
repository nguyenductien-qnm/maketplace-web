import Box from '@mui/material/Box'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'
import TableSkeleton from '../TableSkeleton'
import NoData from '../NoData'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import formatCurrency from '~/utils/formatCurrency'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'
import DoneIcon from '@mui/icons-material/Done'
import BlockIcon from '@mui/icons-material/Block'

function WithdrawRequestTable({
  count,
  loading,
  withdrawRequests,
  handleOpenModal,
  handleApproveWithdrawRequest,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage
}) {
  return (
    <>
      {loading && <TableSkeleton columns={9} rows={12} />}
      {!loading && withdrawRequests?.length === 0 && <NoData />}
      {!loading && withdrawRequests?.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{
            flex: 1,
            overflowY: 'auto',
            width: '100%'
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Paypal email</TableCell>
                <TableCell align="left">Method</TableCell>
                <TableCell align="left">Amount</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Created at</TableCell>
                <TableCell align="left">Processed at</TableCell>
                <TableCell align="left">Detail</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {withdrawRequests?.map((request) => (
                <TableRow
                  key={request?._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">
                    {request?.paypal_email || 'NAN'}
                  </TableCell>
                  <TableCell align="left">
                    {capitalizeFirstLetter(request?.payment_method) || 'NAN'}
                  </TableCell>
                  <TableCell align="left">
                    <b>{formatCurrency(request?.amount) || 'NAN'}</b>
                  </TableCell>
                  <TableCell align="left">
                    {capitalizeFirstLetter(request?.status) || 'NAN'}
                  </TableCell>
                  <TableCell align="left">
                    {request?.createdAt || 'NAN'}
                  </TableCell>
                  <TableCell align="left">
                    {request?.processed_at || 'NAN'}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View detail info">
                      <Box
                        sx={{
                          '&:hover': {
                            cursor: 'pointer'
                          }
                        }}
                        onClick={() =>
                          handleOpenModal({ action: 'detail', request })
                        }
                      >
                        <InfoOutlinedIcon />
                      </Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="left">
                    {request?.status === 'pending' && (
                      <Box>
                        <Tooltip title="Approve request">
                          <Button
                            variant="contained"
                            sx={{ mr: 1 }}
                            onClick={() =>
                              handleApproveWithdrawRequest(request)
                            }
                          >
                            <DoneIcon />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Reject request">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() =>
                              handleOpenModal({ action: 'reject', request })
                            }
                          >
                            <BlockIcon />
                          </Button>
                        </Tooltip>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow
                sx={{
                  position: 'sticky',
                  bottom: 0,
                  backgroundColor: 'background.paper',
                  zIndex: 1
                }}
              >
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  colSpan={9}
                  count={count || 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Rows per page"
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} of ${count}`
                  }
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
export default WithdrawRequestTable
