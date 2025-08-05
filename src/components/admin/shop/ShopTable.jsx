import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import BlockIcon from '@mui/icons-material/Block'
import NoData from '../NoData'
import TableSkeleton from '../TableSkeleton'

function ShopTable({
  loading,
  shops,
  count,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleOpenModal,
  handleApproveShop
}) {
  return (
    <>
      {loading && <TableSkeleton columns={9} rows={rowsPerPage} />}
      {!loading && shops?.length === 0 && <NoData />}
      {!loading && shops?.length > 0 && (
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
                <TableCell>Avatar</TableCell>
                <TableCell align="left">Shop name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Product count</TableCell>
                <TableCell align="left">Follower count</TableCell>
                <TableCell align="left">Rating</TableCell>
                <TableCell align="left">Detail</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shops?.map((shop) => (
                <TableRow
                  key={shop._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar src={shop?.shop_avatar} />
                  </TableCell>
                  <TableCell align="left">{shop.shop_name}</TableCell>
                  <TableCell align="left">{shop.shop_email}</TableCell>
                  <TableCell align="left">{shop.shop_phone}</TableCell>
                  <TableCell align="left">{shop.shop_product_count}</TableCell>
                  <TableCell align="left">{shop.shop_follower_count}</TableCell>
                  <TableCell align="left">{shop.shop_rating}</TableCell>
                  <TableCell align="left">
                    <Tooltip title="View detail info">
                      <Box
                        sx={{
                          '&:hover': {
                            cursor: 'pointer'
                          }
                        }}
                        onClick={() => {
                          handleOpenModal({ action: 'detail', shop })
                        }}
                      >
                        <InfoOutlinedIcon />
                      </Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="left">
                    {(shop?.shop_status === 'approved' ||
                      shop?.shop_status === 'paused') && (
                      <Tooltip title="Ban shop">
                        <Button
                          className="btn-admin-shop-action"
                          color="error"
                          variant="contained"
                          onClick={() =>
                            handleOpenModal({ action: 'ban', shop })
                          }
                        >
                          <BlockIcon />
                        </Button>
                      </Tooltip>
                    )}

                    {shop?.shop_status === 'blocked' && (
                      <Tooltip title="Unban shop">
                        <Button
                          className="btn-admin-shop-action"
                          variant="contained"
                          onClick={() =>
                            handleOpenModal({ action: 'unban', shop })
                          }
                        >
                          <LockOpenIcon />
                        </Button>
                      </Tooltip>
                    )}

                    {shop?.shop_status === 'pending' && (
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'nowrap' }}>
                        <Tooltip title="Accept">
                          <Button
                            className="btn-admin-shop-action"
                            color="success"
                            variant="contained"
                            onClick={() =>
                              handleApproveShop({
                                _id: shop._id,
                                action: 'approve'
                              })
                            }
                          >
                            <CheckOutlinedIcon />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Reject">
                          <Button
                            className="btn-admin-shop-action"
                            color="error"
                            variant="contained"
                            onClick={() =>
                              handleOpenModal({ action: 'reject', shop })
                            }
                          >
                            <ClearOutlinedIcon />
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
export default ShopTable
