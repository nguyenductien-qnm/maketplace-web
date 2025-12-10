import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import NoData from '../NoData'
import VoucherRow from './VoucherRow'
import TableCellHeader from '~/components/common/TableCellHeader'
import { Box, CircularProgress } from '@mui/material'

function VoucherTable({ ui, data, handler }) {
  const { loading, page, limit, VOUCHER_TABLE_MAP } = ui
  const { vouchers, count } = data
  const {
    handleOpenModal,
    handleChangePage,
    handleChangeRowsPerPage,
    handleOpenForm
  } = handler

  return (
    <>
      {!loading && vouchers?.length === 0 && <NoData />}
      {vouchers?.length > 0 && (
        <Box sx={{ position: 'relative' }}>
          {loading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                backdropFilter: 'blur(2px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                borderRadius: 1
              }}
            >
              <CircularProgress />
            </Box>
          )}

          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{
              flex: 1,
              maxHeight: '80vh',
              overflowY: 'auto',
              width: '100%',
              opacity: loading ? 0.6 : 1,
              transition: 'opacity 0.2s'
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {VOUCHER_TABLE_MAP?.map(({ key, label }) => (
                    <TableCellHeader key={key} align="left">
                      <b>{label}</b>
                    </TableCellHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {vouchers?.map((voucher) => (
                  <VoucherRow
                    key={voucher?._id}
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
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  )
}
export default VoucherTable
