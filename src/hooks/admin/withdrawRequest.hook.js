import { StatusCodes } from 'http-status-codes'
import { useEffect, useRef, useState } from 'react'
import { getShopListForFilterAPI } from '~/api/shop.api'
import { getUserListForFilterAPI } from '~/api/user.api'
import {
  getWithdrawRequestDetailByAdminAPI,
  queryWithdrawRequestByAdminAPI,
  approvalWithdrawRequestByAdminAPI,
  rejectWithdrawRequestByAdminAPI
} from '~/api/withdrawRequest.api'
import { navigate } from '~/helpers/navigation'

export const useAdminWithdrawRequest = ({ type }) => {
  // ============================== STATE ==============================
  const defaultFilters = {
    search: '',
    status: 'ALL',
    createdFrom: '',
    createdTo: '',
    requestOfShop: '',
    requestOfUser: '',
    amountRange: [50, 500]
  }
  const [isDenied, setDenied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [openReasonModal, setOpenReasonModal] = useState(false)
  const [withdrawRequestDetail, setWithdrawRequestDetail] = useState(null)
  const [selectedWithdrawRequest, setSelectedWithdrawRequest] = useState(null)

  const [shops, setShops] = useState([])
  const [users, setUsers] = useState([])

  const [filters, setFilters] = useState(defaultFilters)
  const skipEffect = useRef(false)

  const [count, setCount] = useState(null)
  const [withdrawRequests, setWithdrawRequests] = useState([])

  // ============================== EFFECT ==============================

  useEffect(() => {
    if (isDenied) navigate('/unauthorized')
  }, [isDenied])

  useEffect(() => {
    if (skipEffect.current) {
      skipEffect.current = false
      return
    }

    queryWithdrawRequest({ page, rowsPerPage, type, ...filters })
    if (type == 'VENDOR') {
      getShopList()
    } else if (type == 'CUSTOMER') {
      getUserList()
    }
  }, [status, page, rowsPerPage])

  // ============================== API ==============================

  const queryWithdrawRequest = async (data) => {
    setLoading(true)
    try {
      const { status, resData } = await queryWithdrawRequestByAdminAPI({
        payload: data
      })

      if (status === StatusCodes.OK) {
        const { count, withdrawRequests } = resData?.metadata
        setCount(count || 0)
        setWithdrawRequests(withdrawRequests || [])
      }
    } catch {
      setDenied(true)
    } finally {
      setLoading(false)
    }
  }

  const getShopList = async () => {
    const res = await getShopListForFilterAPI()
    setShops(res?.data?.metadata || [])
  }

  const getUserList = async () => {
    const { status, resData } = await getUserListForFilterAPI()
    if (status === StatusCodes.OK) setUsers(resData?.metadata || [])
  }

  // ============================== HANDLER ==============================

  const handleFilter = () => {
    if (page === 0) {
      queryWithdrawRequest({ page, rowsPerPage, type, ...filters })
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

  const handleOpenModal = ({ action, request }) => {
    if (action === 'detail') {
      handleGetWithdrawRequestDetail(request)
      setOpenDetailModal(true)
    } else if (action === 'reject') {
      setOpenReasonModal(true)
      setSelectedWithdrawRequest(request)
    }
  }

  const handleCloseModal = () => {
    setOpenDetailModal(false)
    setWithdrawRequestDetail(null)
    setOpenReasonModal(false)
    setSelectedWithdrawRequest(null)
  }

  const handleGetWithdrawRequestDetail = async (data) => {
    const { status, resData } = await getWithdrawRequestDetailByAdminAPI({
      _id: data?._id
    })
    if (status === StatusCodes.OK) setWithdrawRequestDetail(resData?.metadata)
  }

  const handleApprovalWithdrawRequest = async (data) => {
    const { status, resData } = await approvalWithdrawRequestByAdminAPI({
      _id: data?._id
    })
    if (status === StatusCodes.OK) {
      const update = resData?.metadata
      setWithdrawRequests((prev) =>
        prev?.map((w) => (w?._id === update?._id ? update : w))
      )
    }
  }

  const handleRejectWithdrawRequest = async (data) => {
    const payload = { _id: selectedWithdrawRequest?._id, reason: data }
    const { status, resData } = await rejectWithdrawRequestByAdminAPI({
      payload
    })

    if (status === StatusCodes.OK) {
      const update = resData?.metadata
      setWithdrawRequests((prev) =>
        prev?.map((w) => (w?._id === update?._id ? update : w))
      )
      handleCloseModal()
    }
  }

  // ============================== MODAL CONFIG ==============================

  // ============================== RETURN ==============================

  return {
    openReasonModal,
    openDetailModal,
    withdrawRequestDetail,
    withdrawRequests,
    count,
    loading,
    isDenied,

    filters,
    setFilters,
    page,
    rowsPerPage,
    shops,
    users,

    handleFilter,
    handleClearFilter,
    handleChangePage,
    handleChangeRowsPerPage,
    handleCloseModal,

    handleOpenModal,

    handleApprovalWithdrawRequest,
    handleRejectWithdrawRequest
  }
}
