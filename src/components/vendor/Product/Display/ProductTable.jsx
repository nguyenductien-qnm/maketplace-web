import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box
} from '@mui/material'
import ProductRow from './ProductRow'
import ProductEmpty from './ProductEmpty'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import { queryProductByOwnerAPI } from '~/api/productSPU.api'
import ConfirmActionModal from './ConfirmActionModal'
import ProductFilter from './ProductFilter'

function ProductTable({ status }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [actionType, setActionType] = useState('softDelete')

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await queryProductByOwnerAPI({ status })
        setProducts(res?.data?.metadata || [])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [status])

  const handleOpenModal = (productId, type) => {
    setSelectedProductId(productId)
    setActionType(type)
    setOpenModal(true)
  }

  const handleProductAction = async (productId, actionType) => {
    switch (actionType) {
      case 'softDelete':
        setProducts((prev) =>
          prev.map((p) =>
            p._id === productId ? { ...p, deletedAt: new Date() } : p
          )
        )
        break

      case 'permanentDelete':
        setProducts((prev) => prev.filter((p) => p._id !== productId))
        break

      case 'restore':
        setProducts((prev) =>
          prev.map((p) => (p._id === productId ? { ...p, deletedAt: null } : p))
        )
        break
    }
  }

  const handleFilterProduct = async (payloads) => {
    payloads.status = status
    setLoading(true)
    try {
      const res = await queryProductByOwnerAPI(payloads)
      setProducts(res?.data?.metadata || [])
    } finally {
      setLoading(false)
    }
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
              <TableCell>SKU</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell sx={{ minWidth: '100px' }}>Min price</TableCell>
              <TableCell sx={{ minWidth: '100px' }}>Max price</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product) => (
              <ProductRow
                key={product._id}
                productItem={product}
                onOpenModal={handleOpenModal}
              />
            ))}
          </TableBody>
        </Table>
      )}

      <ConfirmActionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        productId={selectedProductId}
        actionType={actionType}
        handleProductAction={handleProductAction}
      />
    </>
  )
}

export default ProductTable
