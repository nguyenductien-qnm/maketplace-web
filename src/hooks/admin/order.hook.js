import { useEffect, useRef, useState } from 'react'
import {
  getOrderDetailByAdminAPI,
  queryOrderByAdminAPI,
  updateOrderStatusToDeliveredAPI,
  updateOrderStatusToShippingAPI
} from '~/api/order.api'
import { getShopListForFilterAPI } from '~/api/shop.api'
import { apiGetProvinces } from '~/helpers/getAddress'

export const useAdminOrder = ({ status }) => {
  const defaultFilters = {
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

  const [orders, setOrders] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isDenied, setDenied] = useState(false)
  const [provinces, setProvinces] = useState([])
  const [shops, setShops] = useState([])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [filters, setFilters] = useState(defaultFilters)
  const skipEffect = useRef(false)

  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [openUpdateStatusModal, setOpenUpdateStatusModal] = useState(false)
  const [action, setAction] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderDetail, setOrderDetail] = useState(null)

  useEffect(() => {
    const fetchProvinces = async () => {
      const res = await apiGetProvinces()
      setProvinces(res)
    }
    const fetchShops = async () => {
      const res = await getShopListForFilterAPI()
      setShops(res?.data?.metadata)
    }
    fetchProvinces()
    fetchShops()
  }, [])

  useEffect(() => {
    if (skipEffect.current) {
      skipEffect.current = false
      return
    }

    queryOrderByAdmin({ page, rowsPerPage, status, ...filters })
  }, [status, page, rowsPerPage])

  const queryOrderByAdmin = async (data) => {
    setLoading(true)
    try {
      const res = await queryOrderByAdminAPI(data)
      if (res.status === 200) {
        setOrders(res?.data?.metadata?.orders)
        setCount(res?.data?.metadata?.count)
      } else {
        setDenied(true)
      }
    } catch (err) {
      setDenied(true)
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = () => {
    if (page == 0) {
      queryOrderByAdmin({ page, rowsPerPage, status, ...filters })
    } else {
      setPage(0)
    }
  }

  const handleClearFilter = () => {
    skipEffect.current = true
    setFilters(defaultFilters)
  }

  const handleGetOrderDetail = async (data) => {
    const res = await getOrderDetailByAdminAPI({ _id: data?._id })
    setOrderDetail(res?.data?.metadata)
  }

  const handleOpenModal = ({ action, order }) => {
    setAction(action)
    setSelectedOrder(order)
    if (action === 'detail') {
      setOpenDetailModal(true)
      handleGetOrderDetail(order)
    } else if (action === 'update-status') {
      setOpenUpdateStatusModal(true)
    }
  }

  const handleCloseModal = () => {
    setOpenDetailModal(false)
    setOpenUpdateStatusModal(false)
    setAction(null)
    setSelectedOrder(null)
    setOrderDetail(null)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleMarkOrderAsShipping = async (data) => {
    const res = await updateOrderStatusToShippingAPI(data)

    if (res?.status === 200) {
      const orderUpdated = res?.data?.metadata
      setOrders((prev) =>
        prev.map((o) => (o._id === orderUpdated._id ? orderUpdated : o))
      )
    }
  }

  const handleMarkOrderAsDelivered = async (data) => {
    const res = await updateOrderStatusToDeliveredAPI(data)

    if (res?.status === 200) {
      const orderUpdated = res?.data?.metadata
      setOrders((prev) =>
        prev.map((o) => (o._id === orderUpdated._id ? orderUpdated : o))
      )
    }
  }

  return {
    filters,
    setFilters,
    handleFilter,
    handleClearFilter,
    provinces,
    shops,
    handleChangePage,
    handleChangeRowsPerPage,
    handleOpenModal,
    handleCloseModal,
    loading,
    isDenied,
    orders,
    count,
    page,
    rowsPerPage,
    orderDetail,
    openDetailModal,
    openUpdateStatusModal,
    selectedOrder,
    handleMarkOrderAsShipping,
    handleMarkOrderAsDelivered
  }
}
