import { useState, useEffect, useCallback, useMemo } from 'react'
import { queryProductByOwnerAPI } from '~/api/product.api'
import {
  getDetailProductByOwnerAPI,
  updateProductAPI,
  deletePermanentProductAPI,
  restoreProductAPI,
  softDeleteProductAPI
} from '~/api/product.api'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { prepareImageForStorage } from '~/helpers/resizeImage'
import { StatusCodes } from 'http-status-codes'

const MODAL_PROPS = {
  softDelete: {
    header: 'Confirm Temporary Deletion',
    content:
      'Are you sure you want to temporarily delete this product? You can restore it within 15 days.',
    confirmText: 'Soft Delete',
    confirmColor: 'warning'
  },
  permanentDelete: {
    header: 'Confirm Permanent Deletion',
    content:
      'This action cannot be undone! Are you sure you want to permanently delete this product?',
    confirmText: 'Delete Permanently',
    confirmColor: 'error'
  },
  restore: {
    header: 'Confirm Restore',
    content: 'Are you sure you want to restore this product?',
    confirmText: 'Restore',
    confirmColor: 'primary'
  }
}

export const useVendorProductList = ({ productStatus }) => {
  // ============================== STATE ==============================
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [openModal, setOpenModal] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [actionType, setActionType] = useState('softDelete')

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

  const openConfirmModal = useCallback((productId, type) => {
    setSelectedProductId(productId)
    setActionType(type)
    setOpenModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setOpenModal(false)
  }, [])

  const handleConfirmAction = useCallback(async () => {
    if (!selectedProductId || !actionType) return
    try {
      switch (actionType) {
        case 'softDelete':
          await softDeleteProductAPI(selectedProductId)
          break
        case 'permanentDelete':
          await deletePermanentProductAPI(selectedProductId)
          break
        case 'restore':
          await restoreProductAPI(selectedProductId)
          break
      }
      handleProductAction(selectedProductId, actionType)
    } finally {
      closeModal()
    }
  }, [selectedProductId, actionType, handleProductAction, closeModal])

  return {
    ui: {
      loading,
      page,

      rowsPerPage,
      openModal,
      modalProps: MODAL_PROPS[actionType]
    },
    data: {
      products,
      count
    },
    fetchProducts,
    openConfirmModal,
    closeModal,
    handleConfirmAction
  }
}
