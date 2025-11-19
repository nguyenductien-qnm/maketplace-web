import { navigate } from '~/helpers/navigation'
import { StatusCodes } from 'http-status-codes'
import { useSearchParams } from 'react-router-dom'
import { getCategoriesAPI } from '~/api/category.api'
import { getShopListForFilterAPI } from '~/api/shop.api'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useFilterCompare } from '../common/filterCompare'
import {
  queryProductByAdminAPI,
  getProductDetailByAdminAPI,
  updateProductStatusByAdminAPI,
  exportProductsByAdminAPI
} from '~/api/product.api'
import { getAuditLogDetailByAdminAPI } from '~/api/auditLog.api'

const LOADING_CLASS = [
  '.btn-reason-modal',
  '.btn-admin-product-action',
  '.btn-export-product'
]

const PRODUCT_TABLE_MAP = [
  { key: 'product_image', label: 'Image' },
  { key: 'product_name', label: 'Name' },
  { key: 'product_price_range', label: 'Price' },
  { key: 'product_stock_total', label: 'Stock' },
  { key: 'product_status', label: 'Status' },
  { key: 'product_visibility', label: 'Visibility' },
  { key: 'product_type', label: 'Type' },
  { key: 'detail', label: 'Detail' },
  { key: 'action', label: 'Action' }
]

const DEFAULT_FILTERS = {
  status: 'ALL',
  search: '',
  sort_by: 'newest',
  product_of_shop: '',
  category: '',
  created_from: '',
  created_to: '',
  page: 1,
  limit: 10
}

const PAGE_TITLE = {
  ALL: 'All Products',
  PENDING: 'Pending Products',
  APPROVED: 'Approved Products',
  REJECTED: 'Rejected Products',
  BANNED: 'Banned Products'
}

export const useAdminProduct = ({ status }) => {
  // ============================== STATE ==============================
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadingProductDetail, setLoadingProductDetail] = useState(true)
  const [loadingAuditLog, setLoadingAuditLog] = useState(null)
  const [isDenied, setDenied] = useState(false)
  const [categories, setCategories] = useState([])
  const [shops, setShops] = useState([])
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [openReasonModal, setOpenReasonModal] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [action, setAction] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productDetail, setProductDetail] = useState(null)
  const [params, setParams] = useSearchParams()

  const isInitialized = useRef(false)

  // ============================== API ==============================
  const fetchProducts = useCallback(async ({ filters }) => {
    setLoading(true)
    try {
      const { status, resData } = await queryProductByAdminAPI({
        payload: filters
      })

      if (status === StatusCodes.OK) {
        const { products, count } = resData.metadata
        setProducts(products || [])
        setCount(count || 0)
      }
    } catch (err) {
      if (err?.status !== StatusCodes.UNPROCESSABLE_ENTITY) setDenied(true)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchShops = async () => {
    const { status, resData } = await getShopListForFilterAPI()
    if (status === StatusCodes.OK) setShops(resData?.metadata || [])
  }

  const fetchCategories = async () => {
    const { status, resData } = await getCategoriesAPI()
    if (status === StatusCodes.OK) setCategories(resData?.metadata || [])
  }

  const handleGetAuditLogDetail = async (data) => {
    try {
      setLoadingAuditLog(true)
      const { status, resData } = await getAuditLogDetailByAdminAPI({
        _id: data._id,
        entity: 'product',
        action: data?.product_status
      })
      if (status === StatusCodes.OK)
        setProductDetail((prev) => ({
          ...prev,
          log: resData?.metadata
        }))
    } finally {
      setLoadingAuditLog(false)
    }
  }

  const handleGetProductDetail = async (data) => {
    try {
      setLoadingProductDetail(true)
      const { status, resData } = await getProductDetailByAdminAPI({
        _id: data._id
      })
      if (status === StatusCodes.OK) setProductDetail(resData?.metadata)
    } finally {
      setLoadingProductDetail(false)
    }
  }

  const handleApproveProduct = async ({ product }) => {
    const payload = {
      _id: product?._id,
      action: 'approve'
    }

    const { status, resData } = await updateProductStatusByAdminAPI({
      payload,
      loadingClass: LOADING_CLASS,
      action: 'approve'
    })

    if (status === StatusCodes.OK) {
      const update = resData.metadata
      setProducts((prev) =>
        prev?.map((p) =>
          p._id === update._id
            ? { ...p, product_status: update.product_status }
            : p
        )
      )
    }
  }

  const handleRejectProduct = async (data) => {
    const payload = {
      _id: selectedProduct?._id,
      action: 'reject',
      reason: data
    }

    const { status, resData } = await updateProductStatusByAdminAPI({
      payload,
      loadingClass: LOADING_CLASS,
      action: 'reject'
    })

    if (status === StatusCodes.OK) {
      handleCloseModal()
      const update = resData.metadata
      setProducts((prev) =>
        prev?.map((p) =>
          p._id === update._id
            ? { ...p, product_status: update.product_status }
            : p
        )
      )
    }
  }

  const handleBanProduct = async (data) => {
    const payload = {
      _id: selectedProduct?._id,
      action: 'ban',
      reason: data
    }

    const { status, resData } = await updateProductStatusByAdminAPI({
      payload,
      loadingClass: LOADING_CLASS,
      action: 'ban'
    })

    if (status === StatusCodes.OK) {
      handleCloseModal()
      const update = resData.metadata
      setProducts((prev) =>
        prev?.map((p) =>
          p._id === update._id
            ? { ...p, product_status: update.product_status }
            : p
        )
      )
    }
  }

  const handleUnbanProduct = async (data) => {
    const payload = {
      _id: selectedProduct?._id,
      action: 'unban',
      reason: data
    }
    const { status, resData } = await updateProductStatusByAdminAPI({
      payload,
      loadingClass: LOADING_CLASS,
      action: 'unban'
    })
    if (status === StatusCodes.OK) {
      handleCloseModal()
      const update = resData.metadata
      setProducts((prev) =>
        prev?.map((p) =>
          p._id === update._id
            ? { ...p, product_status: update.product_status }
            : p
        )
      )
    }
  }

  const handleExportProducts = async () => {
    const { status: apiStatus, resData } = await exportProductsByAdminAPI({
      payload: { status, ...filters },
      loadingClass: LOADING_CLASS
    })

    if (apiStatus === StatusCodes.OK) {
      const blob = resData
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'products.csv'
      a.click()
      window.URL.revokeObjectURL(url)
    }
  }

  // ============================== FILTER COMPARE HOOK ==============================
  const { checkAndFetch } = useFilterCompare(fetchProducts)

  // ============================== EFFECT ==============================
  useEffect(() => {
    if (isDenied) navigate('/access-denied')
  }, [isDenied])

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
    fetchShops()
    isInitialized.current = true
  }, [])

  // ============================== HANDLER ==============================

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
      product_of_shop: '',
      category: '',
      created_from: '',
      created_to: '',
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

  const handleOpenModal = ({ action, product }) => {
    setSelectedProduct(product)
    if (action === 'detail') {
      setOpenDetailModal(true)
      handleGetProductDetail(product)
    } else {
      setAction(action)
      setOpenReasonModal(true)
    }
  }

  const handleCloseModal = () => {
    setOpenDetailModal(false)
    setOpenReasonModal(false)
    setAction(null)
    setSelectedProduct(null)
    setProductDetail(null)
  }

  const modalProps = {
    ban: {
      type: 'reason',
      header: 'Ban Product',
      open: openReasonModal,
      onSubmit: (value) => handleBanProduct(value),
      submitText: 'Ban',
      submitColor: 'error'
    },
    unban: {
      type: 'reason',
      header: 'Unban Product',
      open: openReasonModal,
      onSubmit: (value) => handleUnbanProduct(value),
      submitText: 'Unban',
      submitColor: 'success'
    },
    reject: {
      type: 'reason',
      header: 'Reject Product',
      open: openReasonModal,
      onSubmit: (value) => handleRejectProduct(value),
      submitText: 'Reject',
      submitColor: 'error'
    }
  }

  return {
    ui: {
      loading,
      loadingProductDetail,
      loadingAuditLog,
      openDetailModal,
      openReasonModal,
      modalProps: modalProps[action],
      PRODUCT_TABLE_MAP,
      pageTitle: PAGE_TITLE[filters?.status]
    },

    data: { products, count, productDetail, filters, categories, shops },

    handler: {
      setFilters,
      handleFilter,
      handleClearFilter,
      handleChangePage,
      handleChangeRowsPerPage,
      handleApproveProduct,
      handleExportProducts,
      handleOpenModal,
      handleCloseModal,
      handleGetAuditLogDetail
    }
  }
}
