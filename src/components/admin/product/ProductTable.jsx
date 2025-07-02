import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import { Box, Button, Tooltip } from '@mui/material'
import ReasonModal from '../ReasonModal'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import BlockIcon from '@mui/icons-material/Block'
import NoData from '../NoData'
import formatCurrency from '~/utils/formatCurrency'
function ProductTable({
  status,
  products,
  count,
  page,
  rowsPerPage,
  handleOpenModal,
  openDetailModal,
  handleCloseModal,
  handleChangePage,
  handleChangeRowsPerPage
}) {
  return (
    <>
      {products?.length === 0 && <NoData />}
      {products?.length > 0 && (
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
                <TableCell>Thumb</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Price range</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="left">Visibility</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="left">Review count</TableCell>
                <TableCell align="left">Detail</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((p) => (
                <TableRow
                  key={p._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      loading="lazy"
                      src={p?.product_thumb}
                      style={{ width: '50px' }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{ maxWidth: '400px' }}>
                    {p.product_name}
                  </TableCell>
                  <TableCell align="right">
                    {p.product_min_price === p.product_max_price
                      ? formatCurrency(p.product_min_price)
                      : `${formatCurrency(
                          p.product_min_price
                        )} - ${formatCurrency(p.product_max_price)}`}
                  </TableCell>
                  <TableCell align="right">{p.product_stock}</TableCell>
                  <TableCell align="right">{p.product_status}</TableCell>
                  <TableCell align="right">{p.product_visibility}</TableCell>
                  <TableCell align="right">
                    {p.product_rating_average}
                  </TableCell>
                  <TableCell align="right">{p.product_review_count}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="View detail info">
                      <Box
                        sx={{
                          '&:hover': {
                            cursor: 'pointer'
                          }
                        }}
                        onClick={() => {
                          handleOpenModal({ action: 'detail', product: p })
                        }}
                      >
                        <InfoOutlinedIcon />
                      </Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right"></TableCell>

                  {/* <TableCell align="right">
                    {(shop?.shop_status === 'active' ||
                      shop?.shop_status === 'paused') && (
                      <Tooltip title="Ban shop">
                        <Button
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

                    {shop?.shop_status === 'block' && (
                      <Tooltip title="Unban shop">
                        <Button
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
                            color="success"
                            variant="contained"
                            onClick={() =>
                              handleAcceptShop({
                                _id: shop._id,
                                action: 'accept'
                              })
                            }
                          >
                            <CheckOutlinedIcon />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Reject">
                          <Button
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
                  </TableCell> */}
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
export default ProductTable
