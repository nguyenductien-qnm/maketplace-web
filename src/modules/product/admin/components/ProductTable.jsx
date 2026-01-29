import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import NoData from '~/components/common/NoData'
import ProductRow from './ProductRow'
import TableCellHeader from '~/components/common/TableCellHeader'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import { PRODUCT_TABLE_COLUMNS } from '../constants/product.constant'

function ProductTable({ ui, data, handler }) {
  const { isLoading, isFetching, page, limit } = ui
  const { products, count } = data
  const { handleChangePage, handleChangeRowsPerPage, row } = handler

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{
            flex: 1,
            maxHeight: '80vh',
            overflowY: 'auto',
            width: '100%',
            opacity: isFetching ? 0.2 : 1,
            transition: 'opacity 0.2s'
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {PRODUCT_TABLE_COLUMNS?.map((label, i) => (
                  <TableCellHeader key={i} align="left">
                    <b>{label}</b>
                  </TableCellHeader>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell
                    colSpan={PRODUCT_TABLE_COLUMNS.length}
                    align="center"
                    sx={{ py: 6 }}
                  >
                    <CircularIndeterminate height="30vh" />
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && products?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={PRODUCT_TABLE_COLUMNS.length}
                    align="center"
                  >
                    <NoData />
                  </TableCell>
                </TableRow>
              )}

              {products?.length > 0 &&
                products.map((product) => (
                  <ProductRow
                    key={product?._id}
                    product={product}
                    ui={ui.row}
                    handler={row}
                  />
                ))}
            </TableBody>

            {products?.length > 0 && (
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
                    count={Number(count) || 0}
                    rowsPerPage={Number(limit)}
                    page={Number(page - 1)}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Rows per page"
                    labelDisplayedRows={({ from, to, count }) =>
                      `${from}-${to} of ${count}`
                    }
                  />
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </TableContainer>

        {!isLoading && isFetching && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 2
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </>
  )
}
export default ProductTable
