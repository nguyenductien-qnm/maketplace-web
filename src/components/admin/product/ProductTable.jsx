import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import BlockIcon from '@mui/icons-material/Block'
import DoneIcon from '@mui/icons-material/Done'
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined'
import NoData from '../NoData'
import formatCurrency from '~/utils/formatCurrency'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'

function ProductTable({
  products,
  count,
  page,
  rowsPerPage,
  handleApprovalProduct,
  handleOpenModal,
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
                <TableCell align="right">Visibility</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right">Review count</TableCell>
                <TableCell align="right">Detail</TableCell>
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
                  <TableCell align="right">
                    <Chip
                      label={capitalizeFirstLetter(p.product_status)}
                      color={
                        p.product_status === 'approval'
                          ? 'success'
                          : p.product_status === 'reject'
                          ? 'error'
                          : p.product_status === 'ban'
                          ? 'warning'
                          : p.product_status === 'pending'
                          ? 'info'
                          : 'default'
                      }
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Chip
                      label={capitalizeFirstLetter(p.product_visibility)}
                      color={
                        p.product_visibility === 'public'
                          ? 'success'
                          : 'default'
                      }
                      variant="contained"
                      size="small"
                      sx={{ width: '60px' }}
                    />
                  </TableCell>
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

                  <TableCell align="left">
                    {p?.product_status == 'approved' &&
                      p?.product_visibility == 'public' && (
                        <Tooltip title="Ban product">
                          <Button
                            color="error"
                            variant="contained"
                            onClick={() =>
                              handleOpenModal({ action: 'ban', product: p })
                            }
                          >
                            <BlockIcon />
                          </Button>
                        </Tooltip>
                      )}

                    {p?.product_status == 'pending' &&
                      p?.product_visibility == 'public' && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Accept product">
                            <Button
                              variant="contained"
                              onClick={() =>
                                handleApprovalProduct({ product: p })
                              }
                            >
                              <DoneIcon />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Reject product">
                            <Button
                              color="error"
                              variant="contained"
                              onClick={() =>
                                handleOpenModal({
                                  action: 'reject',
                                  product: p
                                })
                              }
                            >
                              <DoDisturbOnOutlinedIcon />
                            </Button>
                          </Tooltip>
                        </Box>
                      )}

                    {p?.product_status == 'ban' && (
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'nowrap' }}>
                        <Tooltip title="Unban product">
                          <Button
                            color="success"
                            variant="contained"
                            onClick={() =>
                              handleOpenModal({ action: 'unban', product: p })
                            }
                          >
                            <LockOpenIcon />
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
                  colSpan={10}
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
