import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
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
import NoData from '../NoData'
import formatCurrency from '~/utils/formatCurrency'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'

function OrderTable({
  status,
  orders,
  count,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleOpenModal,
  handleMarkOrderAsShipping,
  handleMarkOrderAsDelivered
}) {
  return (
    <>
      {orders?.length === 0 && <NoData />}
      {orders?.length > 0 && (
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
                <TableCell align="left">Shop</TableCell>
                <TableCell align="left">Payment method</TableCell>
                <TableCell align="left">Payment status</TableCell>
                <TableCell align="left">Order status</TableCell>
                <TableCell align="left">Have voucher</TableCell>
                <TableCell align="left">Total price</TableCell>
                <TableCell align="left">Created at</TableCell>
                <TableCell align="left">Detail</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => (
                <TableRow
                  key={order?._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{order.shop_name}</TableCell>
                  <TableCell align="left">
                    <Chip
                      label={order.order_payment_method?.toUpperCase()}
                      size="small"
                      sx={{
                        width: '80px',
                        color: 'white',
                        backgroundColor:
                          order.order_payment_method === 'paypal'
                            ? '#1976d2'
                            : '#ff9800'
                      }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Chip
                      label={order.order_payment_status?.toUpperCase()}
                      size="small"
                      sx={{
                        width: '80px',
                        color: 'white',
                        backgroundColor:
                          order.order_payment_status === 'paid'
                            ? '#4caf50'
                            : '#f44336'
                      }}
                    />
                  </TableCell>

                  <TableCell align="left">
                    <Chip
                      label={order.order_status.toUpperCase()}
                      size="small"
                      sx={{
                        backgroundColor: {
                          pending: '#9e9e9e',
                          confirmed: '#1976d2',
                          shipping: '#00bcd4',
                          delivered: '#4caf50',
                          cancel_requested: '#ffb300',
                          cancelled: '#f44336',
                          rejected: '#795548'
                        }[order.order_status],
                        color: 'white',
                        fontWeight: 500,
                        width: '100px'
                      }}
                    />
                  </TableCell>

                  <TableCell align="left">
                    {order.isHaveVoucher ? (
                      <CheckOutlinedIcon sx={{ color: '#4caf50' }} />
                    ) : (
                      <ClearOutlinedIcon sx={{ color: '#f44336' }} />
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <b>{formatCurrency(order.order_total_price)}</b>
                  </TableCell>

                  <TableCell align="left">{order.createdAt}</TableCell>

                  <TableCell align="left">
                    <Tooltip title="View detail order">
                      <Box
                        sx={{
                          '&:hover': {
                            cursor: 'pointer'
                          }
                        }}
                        onClick={() => {
                          handleOpenModal({ order })
                        }}
                      >
                        <InfoOutlinedIcon />
                      </Box>
                    </Tooltip>
                  </TableCell>

                  <TableCell align="left">
                    {status === 'CONFIRMED' &&
                      order?.order_status === 'confirmed' && (
                        <Tooltip title="Mark as shipping">
                          <Button
                            className="btn-mark-as-shipping"
                            variant="contained"
                            onClick={() =>
                              handleMarkOrderAsShipping({ _id: order?._id })
                            }
                          >
                            <LocalShippingOutlinedIcon />
                          </Button>
                        </Tooltip>
                      )}

                    {status === 'SHIPPING' &&
                      order?.order_status === 'shipping' && (
                        <Tooltip title="Mark as delivered">
                          <Button
                            className="btn-mark-as-delivered"
                            variant="contained"
                            onClick={() =>
                              handleMarkOrderAsDelivered({ _id: order?._id })
                            }
                          >
                            <DoneOutlinedIcon />
                          </Button>
                        </Tooltip>
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
export default OrderTable
