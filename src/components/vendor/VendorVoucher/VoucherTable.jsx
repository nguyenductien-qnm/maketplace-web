import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import VoucherRow from './VoucherRow'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import VoucherEmpty from './VoucherEmpty'
import TableContainer from '@mui/material/TableContainer'
import TableCellHeader from '~/components/common/TableCellHeader'
import { TablePagination } from '@mui/material'

function VoucherTable({ ui, data, handler }) {
  const { loading } = ui

  const { vouchers, count, filters } = data

  const { handleChangePage, handleChangeRowsPerPage, handleOpenConfirmDialog } =
    handler
  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: '50px',
            height: '750px'
          }}
        >
          <CircularIndeterminate />
        </Box>
      ) : vouchers.length === 0 ? (
        <VoucherEmpty />
      ) : (
        <Box sx={{ height: '750px' }}>
          <TableContainer sx={{ maxHeight: 700, overflowY: 'auto' }}>
            <Table stickyHeader sx={{ width: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCellHeader>Name</TableCellHeader>
                  <TableCellHeader>Apply</TableCellHeader>
                  <TableCellHeader>Value</TableCellHeader>
                  <TableCellHeader>Quantity</TableCellHeader>
                  <TableCellHeader>Used</TableCellHeader>
                  <TableCellHeader>Time</TableCellHeader>
                  <TableCellHeader>Enabled</TableCellHeader>
                  <TableCellHeader>Action</TableCellHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {vouchers.map((voucher) => (
                  <VoucherRow
                    key={voucher._id}
                    voucher={voucher}
                    handleOpenConfirmDialog={handleOpenConfirmDialog}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={count}
            rowsPerPage={Number(filters?.limit)}
            page={filters?.page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
    </>
  )
}
export default VoucherTable
