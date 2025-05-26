import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Box from '@mui/material/Box'
import ProductRow from './ProductRow'
import ProductEmpty from './ProductEmpty'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import ProductFilter from './ProductFilter'
import ConfirmModal from '~/components/common/ConfirmModal'
import { useVendorProductList } from '~/hooks/vendor/product.hook'

function ProductTable({ status }) {
  const {
    products,
    loading,
    fetchProducts,
    openModal,
    openConfirmModal,
    closeModal,
    handleConfirmAction,
    modalProps
  } = useVendorProductList(status)

  const handleFilterProduct = async (filters) => {
    await fetchProducts(filters)
  }

  return (
    <>
      <Box>
        <ProductFilter handleFilterProduct={handleFilterProduct} />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '50px' }}>
          <CircularIndeterminate />
        </Box>
      ) : products.length === 0 ? (
        <ProductEmpty />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Visibility</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell sx={{ minWidth: '100px' }}>Min price</TableCell>
              <TableCell sx={{ minWidth: '100px' }}>Max price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <ProductRow
                key={product._id}
                productItem={product}
                onOpenModal={openConfirmModal}
              />
            ))}
          </TableBody>
        </Table>
      )}

      <ConfirmModal
        open={openModal}
        onClose={closeModal}
        onConfirm={handleConfirmAction}
        {...modalProps}
      />
    </>
  )
}

export default ProductTable
