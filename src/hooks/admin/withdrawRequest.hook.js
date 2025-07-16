import { StatusCodes } from 'http-status-codes'
import { useEffect, useRef, useState } from 'react'
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
    status: '',
    createFrom: '',
    createdTo: ''
  }

  const [isDenied, setDenied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [openReasonModal, setOpenReasonModal] = useState(false)
  const [withdrawRequestDetail, setWithdrawRequestDetail] = useState(null)
  const [selectedWithdrawRequest, setSelectedWithdrawRequest] = useState(null)

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

  // ============================== HANDLER ==============================

  const handleFilter = () => {
    if (page === 0) {
      queryUserByAdmin({ page, rowsPerPage, status, ...filters })
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
  }

  const handleRejectWithdrawRequest = async (data) => {
    const payload = { _id: selectedWithdrawRequest?._id, reason: data }
    const { status, resData } = await rejectWithdrawRequestByAdminAPI({
      payload
    })
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
