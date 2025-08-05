import { StatusCodes } from 'http-status-codes'
import { useEffect, useRef, useState } from 'react'
import { getCategoriesAPI } from '~/api/category.api'
import {
  getProductDetailByAdminAPI,
  queryProductByAdminAPI,
  updateProductStatusByAdminAPI
} from '~/api/product.api'
import { getShopListForFilterAPI } from '~/api/shop.api'
import { navigate } from '~/helpers/navigation'

const LOADING_CLASS = [
  '.btn-reason-modal-submit',
  '.btn-reason-modal-cancel',
  '.btn-admin-product-action'
]

export const useAdminProduct = ({ status }) => {
  // ============================== STATE ==============================

  const defaultFilters = {
    search: '',
    productOfShop: '',
    category: '',
    createdFrom: '',
    createdTo: '',
    priceRange: [0, 2000]
  }

  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isDenied, setDenied] = useState(false)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [categories, setCategories] = useState([])
  const [shops, setShops] = useState([])

  const [filters, setFilters] = useState(defaultFilters)
  const skipEffect = useRef(false)

  const [openReasonModal, setOpenReasonModal] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [action, setAction] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productDetail, setProductDetail] = useState(null)

  // ============================== EFFECT ==============================
  useEffect(() => {
    if (isDenied) navigate('/unauthorized')
  }, [isDenied])

  useEffect(() => {
    getShopList()
    getCategories()
  }, [])

  useEffect(() => {
    if (skipEffect.current) {
      skipEffect.current = false
      return
    }

    queryProductByAdmin({ page, rowsPerPage, status, ...filters })
  }, [status, page, rowsPerPage])

  // ============================== API ==============================

  const getShopList = async () => {
    const { status, resData } = await getShopListForFilterAPI()
    if (status === StatusCodes.OK) setShops(resData?.metadata || [])
  }

  const getCategories = async () => {
    const { status, resData } = await getCategoriesAPI()
    if (status === StatusCodes.OK) setCategories(resData?.metadata || [])
  }

  const queryProductByAdmin = async (data) => {
    setLoading(true)
    try {
      const { status, resData } = await queryProductByAdminAPI({
        payload: data
      })
      if (status === StatusCodes.OK) {
        const { products, count } = resData.metadata
        setProducts(products)
        setCount(count)
      } else {
        setDenied(true)
      }
    } catch (err) {
      setDenied(true)
    } finally {
      setLoading(false)
    }
  }

  // ============================== HANDLER ==============================
  const handleGetProductDetail = async (data) => {
    const { status, resData } = await getProductDetailByAdminAPI({
      _id: data._id
    })
    if (status === StatusCodes.OK) setProductDetail(resData?.metadata)
  }

  const handleFilter = () => {
    if (page === 0) {
      queryProductByAdmin({ page, rowsPerPage, status, ...filters })
    } else {
      setPage(0)
    }
  }

  const handleClearFilter = () => {
    skipEffect.current = true
    setFilters(defaultFilters)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleOpenModal = ({ action, product }) => {
    setAction(action)
    setSelectedProduct(product)
    if (action === 'detail') {
      setOpenDetailModal(true)
      handleGetProductDetail(product)
    } else {
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
        prev?.map((p) => (p._id === update._id ? update : p))
      )
    }
  }

  const handleRejectProduct = async (data) => {
    console.log('data')
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
        prev?.map((p) => (p._id === update._id ? update : p))
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
        prev?.map((p) => (p._id === update._id ? update : p))
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
        prev?.map((p) => (p._id === update._id ? update : p))
      )
    }
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
    products,
    count,
    loading,
    productDetail,
    shops,
    categories,

    filters,
    setFilters,
    page,
    rowsPerPage,

    openDetailModal,
    openReasonModal,
    modalProps: modalProps[action],

    handleFilter,
    handleClearFilter,
    handleChangePage,
    handleChangeRowsPerPage,
    handleApproveProduct,

    handleOpenModal,
    handleCloseModal
  }
}
