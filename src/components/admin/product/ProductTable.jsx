import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import NoData from '../NoData'
import TableSkeleton from '../TableSkeleton'
import ProductRow from './ProductRow'
import TableCellHeader from '~/components/common/TableCellHeader'

function ProductTable({ ui, data, handler }) {
  const { loading, PRODUCT_TABLE_MAP } = ui
  const { filters, count, products } = data
  const {
    handleApproveProduct,
    handleOpenModal,
    handleChangePage,
    handleChangeRowsPerPage
  } = handler

  return (
    <>
      {loading && <TableSkeleton columns={10} rows={filters?.limit} />}
      {!loading && products?.length === 0 && <NoData />}
      {!loading && products?.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{
            flex: 1,
            overflowY: 'auto',
            width: '100%',
            p: 2
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {PRODUCT_TABLE_MAP?.map(({ key, label }) => (
                  <TableCellHeader key={key} align="left">
                    {label}
                  </TableCellHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((p) => (
                <ProductRow
                  key={p?._id}
                  product={p}
                  handleOpenModal={handleOpenModal}
                  handleApproveProduct={handleApproveProduct}
                  PRODUCT_TABLE_MAP={PRODUCT_TABLE_MAP}
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
                  colSpan={10}
                  count={count || 0}
                  rowsPerPage={Number(filters?.limit)}
                  page={filters?.page - 1}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
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
