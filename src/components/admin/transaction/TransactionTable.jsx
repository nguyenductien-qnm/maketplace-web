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
import { Avatar, Box, TableFooter, TablePagination } from '@mui/material'
import formatCurrency from '~/utils/formatCurrency'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'

function TransactionTable({
  type,
  count,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleOpenModal,
  loading,
  transactions
}) {
  const isShop = type === 'VENDOR'
  return (
    <>
      {loading && <TableSkeleton columns={9} rows={12} />}
      {!loading && transactions?.length === 0 && <NoData />}
      {!loading && transactions?.length > 0 && (
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
                <TableCell align="left">
                  {isShop ? 'Shop avatar' : 'User avatar'}
                </TableCell>
                <TableCell align="left">
                  {isShop ? 'Shop name' : 'User name'}
                </TableCell>
                <TableCell align="left">Amount</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Created at</TableCell>
                <TableCell align="left">Processed at</TableCell>
                <TableCell align="left">Detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions?.map((transaction) => (
                <TableRow
                  key={transaction?._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">
                    <Avatar
                      src={
                        isShop
                          ? transaction?.shop_id?.shop_avatar
                          : transaction?.user_id?.user_avatar
                      }
                    />
                  </TableCell>
                  <TableCell align="left">
                    {isShop
                      ? transaction?.shop_id?.shop_name
                      : transaction?.user_id?.user_name}
                  </TableCell>
                  <TableCell align="left">
                    <b>{formatCurrency(transaction?.amount)}</b>
                  </TableCell>
                  <TableCell align="left">
                    {capitalizeFirstLetter(transaction?.type)}
                  </TableCell>
                  <TableCell align="left">
                    {capitalizeFirstLetter(transaction?.status)}
                  </TableCell>
                  <TableCell align="left">
                    {transaction?.createdAt || 'NAN'}
                  </TableCell>
                  <TableCell align="left">
                    {transaction?.processed_at || 'NAN'}
                  </TableCell>
                  <TableCell align="left">
                    <Tooltip title="View recent transactions">
                      <Box
                        sx={{
                          '&:hover': {
                            cursor: 'pointer'
                          }
                        }}
                        onClick={() => handleOpenModal({ transaction })}
                      >
                        <InfoOutlinedIcon />
                      </Box>
                    </Tooltip>
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
export default TransactionTable
