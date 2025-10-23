import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  getProductMetricsByOwnerAPI,
  queryProductByOwnerAPI
} from '~/api/product.api'
import {
  deletePermanentProductAPI,
  restoreProductAPI,
  softDeleteProductAPI
} from '~/api/product.api'
import { StatusCodes } from 'http-status-codes'

const TAB_LABELS = {
  ALL: 'All',
  PUBLIC: 'Published',
  OUT_OF_STOCK: 'Out of Stock',
  PENDING_REVIEW: 'Pending',
  VIOLATE: 'Violate',
  DRAFT: 'Draft'
}

export const useVendorProductList = () => {
  // ============================== STATE ==============================
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadingModal, setLoadingModal] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [productStatus, setProductStatus] = useState('ALL')

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [openMetricsModal, setOpenMetricsModal] = useState(false)

  const [metrics, setMetrics] = useState({
    metrics_active: null,
    metrics_deleted: null,
    sku: null,
    variations: null,
    type: null
  })

  const [selectedProductId, setSelectedProductId] = useState(null)

  // ============================== EFFECT ==============================
  useEffect(() => {
    fetchProducts()
  }, [])

  // ============================== API ==============================

  const fetchProducts = async (filters = {}) => {
    setLoading(true)
    try {
      const { status, resData } = await queryProductByOwnerAPI({
        productStatus,
        ...filters
      })
      if (status === StatusCodes.OK) {
        const { products, count } = resData.metadata
        setProducts(products || [])
        setCount(count || 0)
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchMetrics = async ({ product_id }) => {
    try {
      setLoadingModal(true)
      const { status, resData } = await getProductMetricsByOwnerAPI({
        _id: product_id
      })
      if (status === StatusCodes.OK) {
        const { metadata } = resData
        setMetrics(metadata)
      }
    } finally {
      setLoadingModal(false)
    }
  }

  const handleProductAction = useCallback((productId, actionType) => {
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
      default:
        break
    }
  }, [])

  const handleOpenConfirmDialog = (productId) => {
    setSelectedProductId(productId)
    setOpenConfirmDialog(true)
  }

  const handleCloseConfirmDialog = useCallback(() => {
    setOpenConfirmDialog(false)
  }, [])

  const handleOpenMetricsModal = (productId) => {
    setOpenMetricsModal(true)
    fetchMetrics({ product_id: productId })
  }
  const handleCloseMetricsModal = () => {
    setOpenMetricsModal(false)
  }

  return {
    ui: {
      loading,
      loadingModal,
      page,
      rowsPerPage,
      status: productStatus,
      openConfirmDialog,
      openMetricsModal,
      TAB_LABELS
    },
    data: {
      products,
      count,
      metrics
    },
    handler: {
      handleOpenConfirmDialog,
      handleCloseConfirmDialog,
      handleOpenMetricsModal,
      handleCloseMetricsModal
    }
  }
}
