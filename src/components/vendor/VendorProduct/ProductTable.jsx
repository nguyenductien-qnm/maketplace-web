import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Box from '@mui/material/Box'
import ProductRow from './ProductRow'
import ProductEmpty from './ProductEmpty'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import { grey } from '@mui/material/colors'
import { TableContainer, TablePagination } from '@mui/material'

const TableCellCustom = ({ children, props }) => (
  <TableCell
    sx={{
      backgroundColor: grey[100],
      fontWeight: 600
    }}
    {...props}
  >
    {children}
  </TableCell>
)

function ProductTable({ ui, data, handler }) {
  const { loading } = ui
  const { products, count, filters } = data
  const {
    handleChangePage,
    handleChangeRowsPerPage,
    handleOpenConfirmDialog,
    handleOpenMetricsModal
  } = handler
  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: '50px',
            height: '600px'
          }}
        >
          <CircularIndeterminate />
        </Box>
      ) : products?.length === 0 ? (
        <ProductEmpty />
      ) : (
        <>
          <TableContainer sx={{ maxHeight: 800, overflowY: 'auto' }}>
            <Table stickyHeader sx={{ width: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCellCustom>Image</TableCellCustom>
                  <TableCellCustom>Name</TableCellCustom>
                  <TableCellCustom>SKUs</TableCellCustom>
                  <TableCellCustom>Price</TableCellCustom>
                  <TableCellCustom>Stock</TableCellCustom>
                  <TableCellCustom>Metrics</TableCellCustom>
                  <TableCellCustom>Action</TableCellCustom>
                </TableRow>
              </TableHead>
              <TableBody>
                {products?.map((product) => (
                  <ProductRow
                    key={product._id}
                    product={product}
                    handleOpenConfirmDialog={handleOpenConfirmDialog}
                    handleOpenMetricsModal={handleOpenMetricsModal}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={count}
            rowsPerPage={Number(filters?.limit)}
            page={filters?.page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </>
  )
}

export default ProductTable
