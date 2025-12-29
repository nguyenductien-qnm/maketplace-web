import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import TableCellHeader from '~/components/common/TableCellHeader'
import TypographyTitle from '~/components/common/TypographyTitle'
import formatCurrency from '~/utils/formatCurrency'
import ProductEmpty from '~/components/vendor/VendorProduct/ProductEmpty'
import ProductFilter from '~/components/vendor/VendorProduct/ProductFilter'
import { modalConfig, modalStyle } from '~/config/modal'
import { useProductSelection } from '~/hooks/vendor/voucher/productSelection.hook'

function ProductSelectionModal({ open, handle, selected }) {
  const { handleConfirmProducts, handleCloseModal } = handle

  const { ui, data, handler } = useProductSelection({ selected })

  const {
    count,
    loading,
    MAX_PRODUCT,
    allCurrentPageSelected,
    someCurrentPageSelected
  } = ui

  const { filters, products, selectedProducts, categories } = data

  const {
    handleSelectAllCurrentPage,
    handleSelectProduct,
    handleChangePage,
    handleChangeRowsPerPage,
    setFilters,
    handleFilter,
    handleClearFilter
  } = handler

  return (
    <Modal open={open} onClose={handleCloseModal} {...modalConfig}>
      <Fade in={open}>
        <Box sx={modalStyle(950)}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <TypographyTitle>Select Products</TypographyTitle>

            <ProductFilter
              filters={filters}
              setFilters={setFilters}
              categories={categories}
              handleFilter={handleFilter}
              handleClearFilter={handleClearFilter}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            {loading && (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 570
                }}
              >
                <CircularIndeterminate />
              </Box>
            )}

            {!loading && products.length === 0 && <ProductEmpty />}
            {!loading && products.length > 0 && (
              <>
                <TableContainer
                  sx={{ maxHeight: 516, height: 516, overflowY: 'auto' }}
                >
                  <Table stickyHeader sx={{ width: '100%' }}>
                    <TableHead>
                      <TableRow>
                        <TableCellHeader>
                          <Checkbox
                            checked={allCurrentPageSelected}
                            onChange={handleSelectAllCurrentPage}
                            disabled={selectedProducts?.length >= MAX_PRODUCT}
                            indeterminate={
                              someCurrentPageSelected && !allCurrentPageSelected
                            }
                          />
                        </TableCellHeader>
                        <TableCellHeader>Image</TableCellHeader>
                        <TableCellHeader>Name</TableCellHeader>
                        <TableCellHeader>Price</TableCellHeader>
                        <TableCellHeader>Stock</TableCellHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {!loading && products.length > 0 && (
                        <>
                          {products?.map((product) => (
                            <TableRow
                              key={product._id}
                              sx={{
                                backgroundColor: selectedProducts.some(
                                  (p) => p._id === product._id
                                )
                                  ? '#e0f7fa'
                                  : 'inherit'
                              }}
                            >
                              <TableCell>
                                <Checkbox
                                  checked={selectedProducts.some(
                                    (p) => p._id === product._id
                                  )}
                                  disabled={
                                    selectedProducts?.length >= MAX_PRODUCT &&
                                    !selectedProducts.some(
                                      (p) => p._id === product._id
                                    )
                                  }
                                  onChange={() => handleSelectProduct(product)}
                                />
                              </TableCell>
                              <TableCell sx={{ width: '100px' }}>
                                <img
                                  src={product.product_image}
                                  style={{ width: '50px', height: '50px' }}
                                  alt={product.product_name}
                                />
                              </TableCell>
                              <TableCell sx={{ width: '400px' }}>
                                <Typography>{product.product_name}</Typography>
                                <Typography
                                  variant="caption"
                                  sx={{ color: 'grey' }}
                                >
                                  CODE: {product?.product_code}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                {product.product_price_min ===
                                product.product_price_max
                                  ? formatCurrency(product.product_price_min)
                                  : `${formatCurrency(
                                      product.product_price_min
                                    )} - ${formatCurrency(
                                      product.product_price_max
                                    )}`}
                              </TableCell>
                              <TableCell>
                                {product.product_stock_total}
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      )}
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
                  slotProps={{
                    toolbar: {
                      sx: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        '&::before': {
                          content: `"Selected: ${selectedProducts?.length}/${MAX_PRODUCT} products"`,
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: '0.875rem',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                          color:
                            selectedProducts?.length >= MAX_PRODUCT
                              ? 'warning.main'
                              : 'text.primary'
                        }
                      }
                    }
                  }}
                />
              </>
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1, mt: 2 }}>
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={
                selectedProducts?.length > MAX_PRODUCT ||
                selectedProducts?.length === 0
              }
              onClick={() => handleConfirmProducts(selectedProducts)}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}
export default ProductSelectionModal
