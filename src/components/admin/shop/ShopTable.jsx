import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import { Box, Button } from '@mui/material'
import ReasonModal from '../ReasonModal'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ShopModal from './ShopModal'
function ShopTable({
  shops,
  count,
  page,
  rowsPerPage,
  modalProps,
  handleChangePage,
  handleChangeRowsPerPage,
  openReasonModal,
  openInfoModal,
  selectedShop,
  handleOpenModal,
  handleCloseModal,
  handleAcceptShop
}) {
  return (
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
            <TableCell align="right">Shop name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Product count</TableCell>
            <TableCell align="right">Follower count</TableCell>
            <TableCell align="right">Rating</TableCell>
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
                <img
                  loading="lazy"
                  src={shop?.shop_avatar}
                  style={{ width: '50px' }}
                />
              </TableCell>
              <TableCell align="right">{shop.shop_name}</TableCell>
              <TableCell align="right">{shop.shop_email}</TableCell>
              <TableCell align="right">{shop.shop_phone}</TableCell>
              <TableCell align="right">{shop.shop_product_count}</TableCell>
              <TableCell align="right">{shop.shop_follower_count}</TableCell>
              <TableCell align="right">{shop.shop_rating}</TableCell>
              <TableCell align="right">
                <Box
                  sx={{
                    '&:hover': {
                      cursor: 'pointer'
                    }
                  }}
                  onClick={() => handleOpenModal({ action: 'detail', shop })}
                >
                  <InfoOutlinedIcon />
                </Box>
              </TableCell>
              <TableCell align="right">
                {(shop?.shop_status === 'active' ||
                  shop?.shop_status === 'paused') && (
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleOpenModal({ action: 'ban', shop })}
                  >
                    Ban
                  </Button>
                )}

                {shop?.shop_status === 'block' && (
                  <Button
                    variant="contained"
                    onClick={() => handleOpenModal({ action: 'unban', shop })}
                  >
                    Unban
                  </Button>
                )}

                {shop?.shop_status === 'pending' && (
                  <Box>
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
                      Accept
                    </Button>

                    <Button
                      color="error"
                      variant="contained"
                      onClick={() =>
                        handleOpenModal({ action: 'reject', shop })
                      }
                    >
                      Reject
                    </Button>
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
      {modalProps?.type === 'reason' && (
        <ReasonModal
          open={openReasonModal}
          onClose={handleCloseModal}
          header={modalProps.header}
          submitText={modalProps.submitText}
          submitColor={modalProps.submitColor}
          onSubmit={modalProps.onSubmit}
        />
      )}

      <ShopModal
        open={openInfoModal}
        onClose={handleCloseModal}
        shop={selectedShop}
      />
    </TableContainer>
  )
}
export default ShopTable
