import { navigate } from '~/helpers/navigation'
import { StatusCodes } from 'http-status-codes'
import { getCategoriesAPI } from '~/api/category.api'
import { getShopListForFilterAPI } from '~/api/shop.api'
import { useEffect, useState } from 'react'
import { getAuditLogDetailByAdminAPI } from '~/api/auditLog.api'
import {
  queryProductByAdminAPI,
  getProductDetailByAdminAPI,
  updateProductStatusByAdminAPI,
  exportProductsByAdminAPI
} from '~/api/product.api'
import useCustomSearchParams from '../common/searchParam.hook'

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

const PAGE_TITLE = {
  ALL: 'All Products',
  PENDING: 'Pending Products',
  APPROVED: 'Approved Products',
  REJECTED: 'Rejected Products',
  BANNED: 'Banned Products'
}

export const useAdminProduct = () => {
  // ============================== STATE ==============================
  const [params, paramsReady, setParams] = useCustomSearchParams({
    defaultParams: { status: 'ALL' }
  })
  const [anchorEl, setAnchorEl] = useState(null)
  const [tempFilters, setTempFilters] = useState({})
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadingProductDetail, setLoadingProductDetail] = useState(true)
  const [loadingAuditLog, setLoadingAuditLog] = useState(null)
  const [isDenied, setDenied] = useState(false)
  const [categories, setCategories] = useState([])
  const [shops, setShops] = useState([])
  const [openReasonModal, setOpenReasonModal] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [action, setAction] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productDetail, setProductDetail] = useState(null)

  // ============================== EFFECT ==============================
  useEffect(() => {
    if (isDenied) navigate('/access-denied')
  }, [isDenied])

  useEffect(() => {
    fetchCategories()
    fetchShops()
  }, [])

  useEffect(() => {
    if (paramsReady) fetchProducts({ filters: params })
  }, [params, paramsReady])

  // ============================== FETCH DATA ==============================
  const fetchProducts = async ({ filters }) => {
    setLoading(true)
    setProducts([])
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
  }

  const fetchShops = async () => {
    const { status, resData } = await getShopListForFilterAPI()
    if (status === StatusCodes.OK) setShops(resData?.metadata || [])
  }

  const fetchCategories = async () => {
    const { status, resData } = await getCategoriesAPI()
    if (status === StatusCodes.OK) setCategories(resData?.metadata || [])
  }

  // ============================== HANDLER FILTER ==============================
  const handleOpenFilter = (e) => {
    setTempFilters({ ...params })
    setAnchorEl(e.currentTarget)
  }

  const handleCloseFilter = () => {
    setAnchorEl(null)
  }

  const handleApplyFilter = () => {
    setParams(tempFilters)
  }

  const handleClearFilter = () => {
    const cleared = {
      status: params.status,
      page: 1,
      limit: params.limit ?? 10,
      sort_by: 'newest'
    }

    setParams(cleared)
  }

  const handleChangePage = (e, newValue) => {
    setParams({ ...params, page: newValue + 1 })
  }

  const handleChangeRowsPerPage = (event) => {
    setParams({ ...params, limit: event.target.value })
  }

  // ============================== HANDLER PRODUCT STATUS ==============================
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

  // ============================== HANDLER FETCH DETAIL ==============================
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

  // ============================== HANDLER EXPORT ==============================
  const handleExportProducts = async () => {
    const { status: apiStatus, resData } = await exportProductsByAdminAPI({
      payload: { ...params },
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

  // ============================== HANDLER MODAL ==============================
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
      loadingProductDetail,
      loadingAuditLog,
      modalProps: modalProps[action],
      header: {
        pageTitle: PAGE_TITLE[params?.status],
        anchorEl
      },

      table: {
        loading,
        page: params.page,
        limit: params.limit,
        PRODUCT_TABLE_MAP
      },

      modal: {
        openDetailModal,
        openReasonModal
      }
    },

    data: {
      productDetail,
      filter: { shops, categories, tempFilters },
      table: { products, count }
    },

    handler: {
      header: {
        filter: {
          handleOpenFilter,
          handleCloseFilter,
          handleApplyFilter,
          handleClearFilter,
          setTempFilters
        },
        handleExportProducts
      },

      table: {
        handleChangePage,
        handleChangeRowsPerPage,
        handleOpenModal,
        handleApproveProduct
      },

      modal: {
        handleOpenModal,
        handleCloseModal
      },

      handleGetAuditLogDetail
    }
  }
}
