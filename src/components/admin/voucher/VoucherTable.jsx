import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import NoData from '../NoData'
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import TableSkeleton from '../TableSkeleton'

function VoucherTable({
  loading,
  status,
  vouchers,
  count,
  page,
  handleGetVoucherDetail,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleOpenForm,
  handleOpenModal
}) {
  const canUpdate = ['ACTIVE', 'NOT_STARTED'].includes(status)

  return (
    <>
      {loading && <TableSkeleton columns={8} rows={rowsPerPage} />}
      {!loading && vouchers?.length === 0 && <NoData />}
      {!loading && vouchers?.length > 0 && (
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
                <TableCell align="left">CODE</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Start date</TableCell>
                <TableCell align="left">End date</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">Creator role</TableCell>
                <TableCell align="left">Detail</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vouchers?.map((voucher) => (
                <TableRow
                  key={voucher._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{voucher.voucher_code}</TableCell>
                  <TableCell align="left">{voucher.voucher_name}</TableCell>
                  <TableCell align="left">
                    {voucher.voucher_start_date}
                  </TableCell>
                  <TableCell align="left">{voucher.voucher_end_date}</TableCell>
                  <TableCell align="left">
                    {voucher?.voucher_type === 'percent' && (
                      <Chip label="Percent" />
                    )}

                    {voucher?.voucher_type === 'fixed_amount' && (
                      <Chip label="Fixed amount" variant="outlined" />
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {voucher.voucher_creator_role === 'shop' && (
                      <Chip
                        label="Shop"
                        size="small"
                        sx={{
                          backgroundColor: '#1976d2',
                          color: 'white',
                          width: '60px'
                        }}
                      />
                    )}
                    {voucher.voucher_creator_role === 'admin' && (
                      <Chip
                        label="Admin"
                        size="small"
                        sx={{
                          backgroundColor: '#d32f2f',
                          color: 'white',
                          width: '60px'
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <Tooltip title="View detail info">
                      <Box
                        sx={{
                          '&:hover': {
                            cursor: 'pointer'
                          }
                        }}
                        onClick={() => {
                          handleOpenModal({ action: 'detail', voucher })
                          handleGetVoucherDetail(voucher)
                        }}
                      >
                        <InfoOutlinedIcon />
                      </Box>
                    </Tooltip>
                  </TableCell>

                  <TableCell align="left">
                    {canUpdate && voucher.voucher_creator_role === 'admin' && (
                      <Tooltip title="Update">
                        <Button
                          className="btn-admin-voucher-action"
                          variant="contained"
                          onClick={() =>
                            handleOpenForm({ action: 'update', voucher })
                          }
                        >
                          <EditOutlinedIcon />
                        </Button>
                      </Tooltip>
                    )}

                    {voucher.voucher_creator_role === 'shop' && (
                      <Box>
                        {voucher?.voucher_disable == false && (
                          <Tooltip title="Disable">
                            <Button
                              className="btn-admin-voucher-action"
                              variant="contained"
                              color="error"
                              onClick={() =>
                                handleOpenModal({ action: 'disable', voucher })
                              }
                            >
                              <NotInterestedOutlinedIcon />
                            </Button>
                          </Tooltip>
                        )}
                        {voucher?.voucher_disable == true && (
                          <Tooltip title="Enable">
                            <Button
                              className="btn-admin-voucher-action"
                              variant="contained"
                              color="success"
                              onClick={() =>
                                handleOpenModal({ action: 'enable', voucher })
                              }
                            >
                              <ReplayOutlinedIcon />
                            </Button>
                          </Tooltip>
                        )}
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
export default VoucherTable
