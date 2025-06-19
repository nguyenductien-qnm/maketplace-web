import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import { Box, Button, Chip, Tooltip } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import NoData from '../NoData'
import VoucherDetailModal from './VoucherDetailModal'
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'

function VoucherTable({
  status,
  vouchers,
  count,
  page,
  voucherDetail,
  handleGetVoucherDetail,
  rowsPerPage,
  modalProps,
  handleChangePage,
  handleChangeRowsPerPage,
  handleOpenForm,
  openReasonModal,
  openDetailModal,
  handleOpenModal,
  handleCloseModal
}) {
  const canUpdate = ['ACTIVE', 'NOT_STARTED'].includes(status)

  return (
    <>
      {vouchers?.length === 0 && <NoData />}
      {vouchers?.length > 0 && (
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
                <TableCell align="right">CODE</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Start date</TableCell>
                <TableCell align="right">End date</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Creator role</TableCell>
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
                  <TableCell align="right">{voucher.voucher_code}</TableCell>
                  <TableCell align="right">{voucher.voucher_name}</TableCell>
                  <TableCell align="right">
                    {voucher.voucher_start_date}
                  </TableCell>
                  <TableCell align="right">
                    {voucher.voucher_end_date}
                  </TableCell>
                  <TableCell align="right">
                    {voucher?.voucher_type === 'percent' && (
                      <Chip label="Percent" />
                    )}

                    {voucher?.voucher_type === 'fixed_amount' && (
                      <Chip label="Fixed amount" variant="outlined" />
                    )}
                  </TableCell>
                  <TableCell align="right">
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
                  <TableCell align="right">
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

                  <TableCell align="right">
                    {canUpdate && voucher.voucher_creator_role === 'admin' && (
                      <Tooltip title="Update">
                        <Button
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

          <VoucherDetailModal
            open={openDetailModal}
            onClose={handleCloseModal}
            voucher={voucherDetail}
          />
        </TableContainer>
      )}
    </>
  )
}
export default VoucherTable
