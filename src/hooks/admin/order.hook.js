import { StatusCodes } from 'http-status-codes'
import { useEffect, useRef, useState } from 'react'
import {
  getOrderDetailByAdminAPI,
  queryOrderByAdminAPI,
  updateOrderStatusToDeliveredAPI,
  updateOrderStatusToShippingAPI
} from '~/api/order.api'
import { getShopListForFilterAPI } from '~/api/shop.api'
import { apiGetProvinces } from '~/helpers/getAddress'
import { navigate } from '~/helpers/navigation'

// ================= CONSTANTS =================
const DEFAULT_FILTERS = {
  search: '',
  orderPaymentMethod: '',
  orderPaymentStatus: '',
  createdFrom: '',
  createdTo: '',
  shippingToProvince: '',
  orderOfShop: '',
  totalPriceRange: [0, 2000],
  isHaveDiscount: false
}

const LOADING_CLASS = ['.btn-mark-as-shipping', '.btn-mark-as-delivered']

export const useAdminOrder = ({ status }) => {
  // ================= STATE =================
  const [orders, setOrders] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isDenied, setDenied] = useState(false)
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [provinces, setProvinces] = useState([])
  const [shops, setShops] = useState([])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const skipEffect = useRef(false)

  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [orderDetail, setOrderDetail] = useState(null)

  // ================= EFFECT =================
  useEffect(() => {
    getProvinceList()
    getShopList()
  }, [])

  useEffect(() => {
    if (skipEffect.current) {
      skipEffect.current = false
      return
    }
    fetchOrders({ page, rowsPerPage, status, ...filters })
  }, [status, page, rowsPerPage])

  useEffect(() => {
    if (isDenied) navigate('/unauthorized')
  }, [isDenied])

  // ================= API =================
  const fetchOrders = async (data) => {
    setLoading(true)
    try {
      const { status, resData } = await queryOrderByAdminAPI({ payload: data })
      if (status === StatusCodes.OK) {
        const { orders, count } = resData?.metadata
        setOrders(orders || [])
        setCount(count || 0)
      }
    } catch {
      setDenied(true)
    } finally {
      setLoading(false)
    }
  }

  const fetchOrderDetail = async (order) => {
    const { status, resData } = await getOrderDetailByAdminAPI({
      _id: order?._id
    })
    if (status === StatusCodes.OK) setOrderDetail(resData?.metadata)
  }

  const getProvinceList = async () => {
    const { status, resData } = await apiGetProvinces()
    if (status === StatusCodes.OK) setProvinces(resData?.metadata || [])
  }

  const getShopList = async () => {
    const { status, resData } = await getShopListForFilterAPI()
    if (status === StatusCodes.OK) setShops(resData?.metadata || [])
  }

  // ================= FILTER HANDLER =================
  const handleFilter = () => {
    if (page === 0) {
      fetchOrders({ page, rowsPerPage, status, ...filters })
    } else {
      setPage(0)
    }
  }

  const handleClearFilter = () => {
    skipEffect.current = true
    setFilters(DEFAULT_FILTERS)
  }

  // ================= MODAL HANDLER =================
  const handleOpenModal = ({ order }) => {
    setOpenDetailModal(true)
    fetchOrderDetail(order)
  }

  const handleCloseModal = () => {
    setOpenDetailModal(false)
    setOrderDetail(null)
  }

  // ================= PAGINATION =================
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // ================= STATUS UPDATE =================
  const handleMarkOrderAsShipping = async (data) => {
    const { status, resData } = await updateOrderStatusToShippingAPI({
      payload: data,
      loadingClass: LOADING_CLASS
    })

    if (status === StatusCodes.OK) {
      const updated = resData?.metadata
      setOrders((prev) =>
        prev.map((o) => (o._id === updated._id ? updated : o))
      )
    }
  }

  const handleMarkOrderAsDelivered = async (data) => {
    const { status, resData } = await updateOrderStatusToDeliveredAPI({
      payload: data,
      loadingClass: LOADING_CLASS
    })

    if (status === StatusCodes.OK) {
      const updated = resData?.metadata
      setOrders((prev) =>
        prev.map((o) => (o._id === updated._id ? updated : o))
      )
    }
  }

  // ================= RETURN =================
  return {
    // Filter
    filters,
    setFilters,
    handleFilter,
    handleClearFilter,

    // Location & Shop
    provinces,
    shops,

    // Pagination
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,

    // Modal
    openDetailModal,
    handleOpenModal,
    handleCloseModal,

    // Data
    loading,
    isDenied,
    orders,
    count,
    orderDetail,

    // Actions
    handleMarkOrderAsShipping,
    handleMarkOrderAsDelivered
  }
}
