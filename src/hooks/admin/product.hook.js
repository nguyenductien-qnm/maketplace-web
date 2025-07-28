import { StatusCodes } from 'http-status-codes'
import { useEffect, useRef, useState } from 'react'
import {
  approvalProductByAdminAPI,
  banProductByAdminAPI,
  getProductDetailByAdminAPI,
  queryProductByAdminAPI,
  rejectProductByAdminAPI,
  unbanProductByAdminAPI
} from '~/api/product.api'
import { getShopListForFilterAPI } from '~/api/shop.api'
import { navigate } from '~/helpers/navigation'
import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

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
    const fetchShops = async () => {
      const { status, resData } = await getShopListForFilterAPI()
      if (status === StatusCodes.OK) setShops(resData?.metadata || [])
    }
    const fetchCategories = async () => {
      const res = await authorizedAxios.get(`${API_ROOT}/v1/api/category`)
      setCategories(res?.data?.metadata)
    }
    fetchShops()
    fetchCategories()
  }, [])

  useEffect(() => {
    if (skipEffect.current) {
      skipEffect.current = false
      return
    }

    queryProductByAdmin({ page, rowsPerPage, status, ...filters })
  }, [status, page, rowsPerPage])

  // ============================== API ==============================

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
    const res = await getProductDetailByAdminAPI({ _id: data._id })
    if (res.status === 200) setProductDetail(res?.data?.metadata)
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

  const handleApprovalProduct = async ({ product }) => {
    const payload = {
      _id: product?._id,
      action: 'approval'
    }
    const { status, resData } = await approvalProductByAdminAPI({ payload })
    if (status === StatusCodes.OK) {
      const update = resData.metadata
      setProducts((prev) =>
        prev?.map((p) => (p._id === update._id ? update : p))
      )
    }
  }

  const handleRejectProduct = async (data) => {
    const payload = {
      _id: selectedProduct?._id,
      action: 'reject',
      reason: data
    }
    const { status, resData } = await rejectProductByAdminAPI({ payload })
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
    const { status, resData } = await banProductByAdminAPI({ payload })
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
    const { status, resData } = await unbanProductByAdminAPI({ payload })
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
    isDenied,
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
    handleApprovalProduct,

    handleOpenModal,
    handleCloseModal
  }
}
