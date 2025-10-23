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
import { TableFooter, TablePagination } from '@mui/material'

function ProductTable({ ui, data, handler }) {
  const { page, loading, rowsPerPage } = ui
  const { products, count } = data
  const {
    handleChangePage,
    handleChangeRowsPerPage,
    handleOpenConfirmDialog,
    handleOpenMetricsModal
  } = handler
  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '50px' }}>
          <CircularIndeterminate />
        </Box>
      ) : products?.length === 0 ? (
        <ProductEmpty />
      ) : (
        <Table sx={{ width: '100%' }}>
          <TableHead sx={{ backgroundColor: grey[100] }}>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>SKUs</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Metrics</TableCell>
              <TableCell>Action</TableCell>
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
                colSpan={7}
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
      )}
    </>
  )
}

export default ProductTable
