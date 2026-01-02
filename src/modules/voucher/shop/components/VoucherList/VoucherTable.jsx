import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import VoucherRow from './VoucherRow'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import TableContainer from '@mui/material/TableContainer'
import TableCellHeader from '~/components/common/TableCellHeader'
import CircularProgress from '@mui/material/CircularProgress'
import TableCell from '@mui/material/TableCell'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import NoData from '~/components/common/NoData'
import { VOUCHER_TABLE_COLUMNS } from '../../constants/voucher.constant'

function VoucherTable({ ui, data, handler }) {
  const { isFetching, isLoading, page, limit } = ui
  const { vouchers, count } = data
  const { handleChangePage, handleChangeRowsPerPage } = handler

  return (
    <Box sx={{ position: 'relative' }}>
      <TableContainer
        variant="outlined"
        sx={{
          maxHeight: '85vh',
          overflowY: 'auto',
          opacity: isFetching ? 0.2 : 1,
          transition: 'opacity 0.2s'
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {VOUCHER_TABLE_COLUMNS?.map((label, i) => (
                <TableCellHeader key={i} align="left">
                  <b>{label}</b>
                </TableCellHeader>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell
                  colSpan={VOUCHER_TABLE_COLUMNS.length}
                  align="center"
                  sx={{ py: 6 }}
                >
                  <CircularIndeterminate height="30vh" />
                </TableCell>
              </TableRow>
            )}

            {!isLoading && vouchers?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={VOUCHER_TABLE_COLUMNS.length}
                  align="center"
                >
                  <NoData />
                </TableCell>
              </TableRow>
            )}

            {vouchers?.length > 0 &&
              vouchers.map((voucher) => (
                <VoucherRow
                  key={voucher?._id}
                  voucher={voucher}
                  ui={ui.row}
                  handler={handler.row}
                />
              ))}
          </TableBody>

          {vouchers?.length > 0 && (
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
                  colSpan={10}
                  count={Number(count) || 0}
                  rowsPerPage={Number(limit)}
                  page={Number(page - 1)}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Rows per page"
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} of ${count}`
                  }
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>

      {!isLoading && isFetching && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 2
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}
export default VoucherTable
