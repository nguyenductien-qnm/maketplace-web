import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
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

function WalletTable({
  type,
  count,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleOpenModal,
  loading,
  wallets
}) {
  const isShop = type === 'VENDOR'
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
                <TableCell align="left">Avatar</TableCell>
                <TableCell align="left">
                  {isShop ? 'Shop email' : 'User email'}
                </TableCell>
                <TableCell align="left">
                  {isShop ? 'Shop name' : 'User name'}
                </TableCell>
                <TableCell align="left">Balance</TableCell>
                <TableCell align="left">Created at</TableCell>
                <TableCell align="left">Update at</TableCell>
                <TableCell align="left">Recent trans</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wallets?.map((wallet) => (
                <TableRow
                  key={wallet?._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">
                    <Avatar
                      src={
                        isShop
                          ? wallet?.shop_id?.shop_avatar
                          : wallet?.user_id?.user_avatar
                      }
                    />
                  </TableCell>
                  <TableCell align="left">
                    {isShop
                      ? wallet?.shop_id?.shop_email || 'NAN'
                      : wallet?.user_id?.user_email || 'NAN'}
                  </TableCell>
                  <TableCell align="left">
                    {isShop
                      ? wallet?.shop_id?.shop_name || 'NAN'
                      : wallet?.user_id?.user_name || 'NAN'}
                  </TableCell>
                  <TableCell align="left">
                    <b>
                      {formatCurrency(
                        isShop ? wallet?.shop_balance : wallet?.user_balance
                      ) || 'NAN'}
                    </b>
                  </TableCell>
                  <TableCell align="left">
                    {wallet?.createdAt || 'NAN'}
                  </TableCell>
                  <TableCell align="left">
                    {wallet?.updatedAt || 'NAN'}
                  </TableCell>
                  <TableCell align="left">
                    <Tooltip title="View recent transactions">
                      <Box
                        sx={{
                          '&:hover': {
                            cursor: 'pointer'
                          }
                        }}
                        onClick={() => handleOpenModal({ wallet })}
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
export default WalletTable
