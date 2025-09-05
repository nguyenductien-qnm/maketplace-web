import Paper from '@mui/material/Paper'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSkeleton from '../TableSkeleton'
import NoData from '../NoData'
import WalletRow from './WalletRow'

function WalletTable({
  count,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleOpenModal,
  loading,
  wallets,
  WALLET_TABLE_MAP
}) {
  return (
    <>
      {loading && <TableSkeleton columns={9} rows={12} />}
      {!loading && wallets?.length === 0 && <NoData />}
      {!loading && wallets?.length > 0 && (
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
                {WALLET_TABLE_MAP?.map(({ key, label }) => (
                  <TableCell key={key} align="left">
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {wallets?.map((wallet) => (
                <WalletRow
                  key={wallet?._id}
                  wallet={wallet}
                  handleOpenModal={handleOpenModal}
                  WALLET_TABLE_MAP={WALLET_TABLE_MAP}
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
export default WalletTable
