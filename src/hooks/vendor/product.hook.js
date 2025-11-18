import { useState, useEffect, useCallback, useRef } from 'react'
import { StatusCodes } from 'http-status-codes'
import { getCategoriesByOwnerAPI } from '~/api/category.api'
import { useSearchParams } from 'react-router-dom'
import { useFilterCompare } from '../common/filterCompare'
import {
  getProductMetricsByOwnerAPI,
  queryProductByOwnerAPI,
  deleteProductByOwnerAPI,
  getProductSummaryByShopAPI
} from '~/api/product.api'
import { asyncHandlerShop } from '~/helpers/asyncHandler'

const TAB_LABELS = {
  ALL: 'All',
  PUBLISHED: 'Published',
  PENDING: 'Pending',
  BANNED: 'Banned',
  REJECTED: 'Rejected',
  UNPUBLISHED: 'UnPublished'
}

const DEFAULT_FILTERS = {
  status: 'ALL',
  search: '',
  category: '',
  sort_by: 'newest',
  page: 1,
  limit: 10
}

export const useVendorProductList = () => {
  // ============================== STATE ==============================
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0)
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingModal, setLoadingModal] = useState(true)
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [categories, setCategories] = useState(null)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [openMetricsModal, setOpenMetricsModal] = useState(false)
  const [params, setParams] = useSearchParams()

  const [metrics, setMetrics] = useState({
    metrics_active: null,
    metrics_deleted: null,
    sku: null,
    variations: null,
    type: null
  })

  const isInitialized = useRef(false)

  // ============================== API ==============================
  const fetchProductSummary = async () => {
    const { status, resData } = await getProductSummaryByShopAPI()
    if (status === StatusCodes.OK) setSummary(resData.metadata)
  }

  const fetchProducts = useCallback(async ({ filters }) => {
    setLoading(true)
    setProducts([])
    setCount(0)
    try {
      const [res] = await asyncHandlerShop(
        async () =>
          await queryProductByOwnerAPI({
            payload: filters
          })
      )

      if (res?.status === StatusCodes.OK) {
        const { products, count } = res.resData.metadata
        setProducts(products || [])
        setCount(count || 0)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchMetrics = async (product_id) => {
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

  const fetchCategories = async () => {
    const { status, resData } = await getCategoriesByOwnerAPI()
    if (status === StatusCodes.OK) {
      setCategories(resData.metadata)
    }
  }

  const handleDeleteProduct = async () => {
    try {
      setIsDeleting(true)
      const { status } = await deleteProductByOwnerAPI({
        _id: selectedProductId,
        loadingClass: '.btn-confirm-modal'
      })
      if (status === StatusCodes.OK) {
        setProducts((prev) => prev.filter((p) => p._id != selectedProductId))
        setSelectedProductId(null)
        setOpenConfirmDialog(false)
      }
    } finally {
      setIsDeleting(false)
    }
  }

  // ============================== FILTER COMPARE HOOK ==============================
  const { checkAndFetch } = useFilterCompare(fetchProducts)

  // ============================== INIT EFFECT ==============================
  useEffect(() => {
    const urlParams = Object.fromEntries(params.entries())

    if (!urlParams.status || !urlParams.page || !urlParams.limit) {
      const defaultParams = {
        status: 'ALL',
        sort_by: 'newest',
        page: 1,
        limit: 10
      }
      setFilters((prev) => ({ ...prev, ...defaultParams }))
      setParams(defaultParams)
      fetchProducts({ filters: defaultParams })
    } else {
      const merged = { ...DEFAULT_FILTERS, ...urlParams }
      setFilters(merged)
      fetchProducts({ filters: merged })
    }

    fetchCategories()
    fetchProductSummary()
    isInitialized.current = true
  }, [])

  // ============================== HANDLERS ==============================
  const handleOpenConfirmDialog = (productId) => {
    setSelectedProductId(productId)
    setOpenConfirmDialog(true)
  }

  const handleCloseConfirmDialog = () => {
    if (isDeleting) return
    setOpenConfirmDialog(false)
    setSelectedProductId(null)
  }

  const handleOpenMetricsModal = (productId) => {
    setOpenMetricsModal(true)
    fetchMetrics(productId)
  }

  const handleCloseMetricsModal = () => {
    setOpenMetricsModal(false)
  }

  const handleFilter = () => {
    const updatedFilters = { ...filters, page: 1 }

    const params = {}
    for (const [key, value] of Object.entries(updatedFilters)) {
      if (value !== '' && value !== null && value !== undefined) {
        params[key] = value
      }
    }

    setFilters(updatedFilters)
    setParams(params)
    checkAndFetch(updatedFilters)
  }

  const handleClearFilter = () => {
    const resetFilters = {
      ...filters,
      search: '',
      category: '',
      sort_by: 'newest',
      page: 1
    }

    const resetParams = {
      status: filters.status,
      sort_by: 'newest',
      page: 1,
      limit: filters.limit
    }

    setFilters(resetFilters)
    setParams(resetParams)
    checkAndFetch(resetFilters)
  }

  const handleChangeTab = (newValue) => {
    const updatedFilters = { ...filters, status: newValue, page: 1 }

    const params = {}
    for (const [key, value] of Object.entries(updatedFilters)) {
      if (value !== '' && value !== null && value !== undefined) {
        params[key] = value
      }
    }

    setFilters(updatedFilters)
    setParams(params)
    fetchProducts({ filters: updatedFilters })
  }

  const handleChangePage = (e, newValue) => {
    const pageValue = newValue + 1
    const updatedFilters = { ...filters, page: pageValue }

    setFilters(updatedFilters)
    setParams((prevParams) => {
      const updatedParams = new URLSearchParams(prevParams)
      updatedParams.set('page', pageValue)
      return updatedParams
    })

    fetchProducts({ filters: updatedFilters })
  }

  const handleChangeRowsPerPage = (event) => {
    const limitValue = parseInt(event.target.value, 10)
    const updatedFilters = { ...filters, limit: limitValue, page: 1 }

    setFilters(updatedFilters)
    setParams((prevParams) => {
      const updatedParams = new URLSearchParams(prevParams)
      updatedParams.set('limit', limitValue)
      updatedParams.set('page', 1)
      return updatedParams
    })

    fetchProducts({ filters: updatedFilters })
  }

  // ============================== RETURN ==============================
  return {
    ui: {
      loading,
      loadingModal,
      openConfirmDialog,
      openMetricsModal,
      TAB_LABELS
    },
    data: {
      products,
      count,
      metrics,
      filters,
      setFilters,
      categories,
      summary
    },
    handler: {
      handleDeleteProduct,
      handleOpenConfirmDialog,
      handleCloseConfirmDialog,
      handleOpenMetricsModal,
      handleCloseMetricsModal,
      handleChangeRowsPerPage,
      handleChangePage,
      handleChangeTab,
      handleClearFilter,
      handleFilter
    }
  }
}
