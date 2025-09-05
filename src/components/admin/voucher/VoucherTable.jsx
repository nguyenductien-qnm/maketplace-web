import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import NoData from '../NoData'
import TableSkeleton from '../TableSkeleton'
import VoucherRow from './VoucherRow'

function VoucherTable({
  loading,
  status,
  vouchers,
  count,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleOpenForm,
  handleOpenModal,
  VOUCHER_TABLE_MAP
}) {
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
                {VOUCHER_TABLE_MAP?.map(({ key, label }) => (
                  <TableCell key={key} align="left">
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {vouchers?.map((voucher) => (
                <VoucherRow
                  key={voucher?._id}
                  status={status}
                  voucher={voucher}
                  handleOpenForm={handleOpenForm}
                  handleOpenModal={handleOpenModal}
                  VOUCHER_TABLE_MAP={VOUCHER_TABLE_MAP}
                />
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
