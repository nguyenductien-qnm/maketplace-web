import { StatusCodes } from 'http-status-codes'
import { useEffect, useRef, useState } from 'react'
import {
  exportOrderDataByAdminAPI,
  getOrderDetailByAdminAPI,
  queryOrderByAdminAPI,
  updateOrderStatusToDeliveredAPI,
  updateOrderStatusToShippingAPI
} from '~/api/order.api'
import { getShopListForFilterAPI } from '~/api/shop.api'
// import { apiGetProvinces } from '~/helpers/getAddress'
import { navigate } from '~/helpers/navigation'

// ================= CONSTANTS =================
const ORDER_TABLE_MAP = [
  { key: 'shop_name', label: 'Shop name' },
  { key: 'order_payment_method', label: 'Payment method' },
  { key: 'order_payment_status', label: 'Payment status' },
  { key: 'isHaveVoucher', label: 'Have voucher' },
  { key: 'order_total_price', label: 'Total price' },
  { key: 'createdAt', label: 'Created at' },
  { key: 'detail', label: 'Detail' },
  { key: 'action', label: 'Action' }
]

const DEFAULT_FILTERS = {
  search: '',
  sortBy: 'newest',
  orderPaymentMethod: '',
  orderPaymentStatus: '',
  createdFrom: '',
  createdTo: '',
  shippingToProvince: '',
  orderOfShop: '',
  totalPriceRange: [0, 2000],
  isHaveDiscount: false
}

const LOADING_CLASS = [
  '.btn-mark-as-shipping',
  '.btn-mark-as-delivered',
  '.btn-export-orders'
]

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
    // getProvinceList()
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
    if (isDenied) navigate('/access-denied')
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
    } catch (err) {
      if (err?.status !== StatusCodes.UNPROCESSABLE_ENTITY) setDenied(true)
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

  // const getProvinceList = async () => {
  //   const { status, resData } = await apiGetProvinces()
  //   if (status === StatusCodes.OK) setProvinces(resData?.metadata || [])
  // }

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
    setFilters({ ...DEFAULT_FILTERS })
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

  const handleExportOrders = async () => {
    const { status: apiStatus, resData } = await exportOrderDataByAdminAPI({
      payload: { ...filters, status },
      loadingClass: LOADING_CLASS
    })

    if (apiStatus === StatusCodes.OK) {
      const blob = resData
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'orders.csv'
      a.click()
      window.URL.revokeObjectURL(url)
    }
  }

  // ================= RETURN =================
  return {
    filters,
    loading,
    orders,
    count,
    orderDetail,
    provinces,
    shops,
    page,
    rowsPerPage,
    openDetailModal,
    setFilters,
    handleFilter,
    handleClearFilter,
    handleChangePage,
    handleChangeRowsPerPage,
    handleOpenModal,
    handleCloseModal,
    handleMarkOrderAsShipping,
    handleMarkOrderAsDelivered,
    handleExportOrders,
    ORDER_TABLE_MAP
  }
}
