import { StatusCodes } from 'http-status-codes'
import { useEffect, useRef, useState } from 'react'
import {
  queryUserByAdminAPI,
  banUserByAdminAPI,
  unbanUserByAdminAPI,
  exportUserDataAPI,
  getUserDetailByAdminAPI,
  updateUserPasswordByAdminAPI
} from '~/api/user.api'
import { navigate } from '~/helpers/navigation'

const LOADING_CLASS = [
  '.btn-reason-modal',
  '.btn-admin-user-action',
  '.btn-export-user'
]

const USER_TABLE_MAP = [
  { key: 'user_name', label: 'Full Name' },
  { key: 'user_email', label: 'Email' },
  { key: 'user_phone', label: 'Phone' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'user_gender', label: 'Gender' },
  { key: 'user_role', label: 'Is Shop' },
  { key: 'detail', label: 'Detail' },
  { key: 'action', label: 'Action' }
]

const DEFAULT_FILTERS = {
  search: '',
  isShop: false,
  gender: 'ALL',
  createdFrom: '',
  createdTo: '',
  sortBy: 'createdAt_desc'
}

export const useAdminUser = ({ status }) => {
  // ============================== STATE ==============================

  const [users, setUsers] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isDenied, setDenied] = useState(false)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const skipEffect = useRef(false)

  const [openReasonModal, setOpenReasonModal] = useState(false)
  const [openInfoModal, setOpenInfoModal] = useState(false)
  const [openUpdatePasswordModal, setOpenUpdatePasswordModal] = useState(false)
  const [action, setAction] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [userDetail, setUserDetail] = useState(null)

  // ============================== EFFECT ==============================

  useEffect(() => {
    if (isDenied) navigate('/unauthorized')
  }, [isDenied])

  useEffect(() => {
    if (skipEffect.current) {
      skipEffect.current = false
      return
    }

    queryUserByAdmin({ page, rowsPerPage, status, ...filters })
  }, [status, page, rowsPerPage])

  // ============================== API ==============================

  const queryUserByAdmin = async (data) => {
    setLoading(true)
    try {
      const { status, resData } = await queryUserByAdminAPI({ payload: data })
      if (status === StatusCodes.OK) {
        const { users, count } = resData?.metadata
        setUsers(users || [])
        setCount(count || 0)
      }
    } catch (err) {
      if (err?.status !== StatusCodes.UNPROCESSABLE_ENTITY) setDenied(true)
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
    setFilters({ ...DEFAULT_FILTERS })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleOpenModal = ({ action, user }) => {
    setAction(action)
    setSelectedUser(user)
    if (action === 'detail') {
      setOpenInfoModal(true)
      handleGetUserDetail(user)
    } else if (action === 'update-password') {
      setOpenUpdatePasswordModal(true)
    } else {
      setOpenReasonModal(true)
    }
  }

  const handleCloseModal = () => {
    setOpenInfoModal(false)
    setOpenReasonModal(false)
    setOpenUpdatePasswordModal(false)
    setAction(null)
    setSelectedUser(null)
    setUserDetail(null)
  }

  const handleBanUser = async ({ data }) => {
    const { status, resData } = await banUserByAdminAPI({
      payload: data,
      loadingClass: LOADING_CLASS
    })
    if (status === StatusCodes.OK) {
      const updated = resData?.metadata
      handleCloseModal()
      setUsers((prev) =>
        prev.map((u) => (u?._id === updated?._id ? updated : u))
      )
    }
  }

  const handleUnbanUser = async ({ data }) => {
    const { status, resData } = await unbanUserByAdminAPI({
      payload: data,
      loadingClass: LOADING_CLASS
    })
    if (status === StatusCodes.OK) {
      const updated = resData?.metadata
      handleCloseModal()
      setUsers((prev) =>
        prev.map((u) => (u?._id === updated?._id ? updated : u))
      )
    }
  }

  const handleGetUserDetail = async (data) => {
    const { status, resData } = await getUserDetailByAdminAPI({
      _id: data?._id
    })
    if (status === StatusCodes.OK) setUserDetail(resData?.metadata)
  }

  const handleUpdatePassword = async (data) => {
    const { status, resData } = await updateUserPasswordByAdminAPI({
      payload: data,
      loadingClass: LOADING_CLASS
    })
    if (status === StatusCodes.OK) handleCloseModal()
  }

  const handleExportData = async () => {
    const { status: apiStatus, resData } = await exportUserDataAPI({
      payload: { status, ...filters },
      loadingClass: LOADING_CLASS
    })

    if (apiStatus === StatusCodes.OK) {
      const blob = resData
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'users.csv'
      a.click()
      window.URL.revokeObjectURL(url)
    }
  }

  // ============================== MODAL CONFIG ==============================

  const modalProps = {
    ban: {
      type: 'reason',
      header: 'Ban User',
      open: openReasonModal,
      onSubmit: (value) => {
        handleBanUser({
          data: { _id: selectedUser?._id, reason: value, action }
        })
      },
      submitText: 'Ban',
      submitColor: 'error'
    },
    unban: {
      type: 'reason',
      header: 'Unban User',
      open: openReasonModal,
      onSubmit: (value) => {
        handleUnbanUser({
          data: { _id: selectedUser?._id, reason: value, action }
        })
      },
      submitText: 'Unban',
      submitColor: 'success'
    }
  }

  // ============================== RETURN ==============================

  return {
    users,
    count,
    loading,
    userDetail,
    selectedUser,

    filters,
    setFilters,
    page,
    rowsPerPage,

    openInfoModal,
    openReasonModal,
    openUpdatePasswordModal,
    modalProps: modalProps[action],

    handleFilter,
    handleClearFilter,
    handleChangePage,
    handleChangeRowsPerPage,

    handleOpenModal,
    handleCloseModal,

    handleGetUserDetail,
    handleUpdatePassword,
    handleExportData,

    USER_TABLE_MAP
  }
}
