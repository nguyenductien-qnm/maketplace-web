import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Box from '@mui/material/Box'
import ProductRow from './ProductRow'
import ProductEmpty from './ProductEmpty'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import TableCellHeader from '~/components/common/TableCellHeader'
import { TableContainer, TablePagination } from '@mui/material'

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
                  <TableCellHeader>Image</TableCellHeader>
                  <TableCellHeader>Name</TableCellHeader>
                  <TableCellHeader>SKUs</TableCellHeader>
                  <TableCellHeader>Price</TableCellHeader>
                  <TableCellHeader>Stock</TableCellHeader>
                  <TableCellHeader>Metrics</TableCellHeader>
                  <TableCellHeader>Action</TableCellHeader>
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
