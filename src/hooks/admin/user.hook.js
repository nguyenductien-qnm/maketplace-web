import { useEffect, useRef, useState } from 'react'
import {
  banUserAPI,
  exportUserDataAPI,
  getUserDetailForAdminAPI,
  queryUserByAdminAPI,
  unbanUserAPI,
  updateUserPasswordForAdminAPI
} from '~/api/user.api'
import { navigate } from '~/helpers/navigation'

export const useAdminUser = ({ status }) => {
  // ============================== STATE ==============================
  const defaultFilters = {
    search: '',
    isShop: false,
    gender: '',
    createdFrom: '',
    createdTo: ''
  }

  const [users, setUsers] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isDenied, setDenied] = useState(false)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [filters, setFilters] = useState(defaultFilters)
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
      const res = await queryUserByAdminAPI({ data })
      if (res.status === 200) {
        setUsers(res.data?.metadata?.users)
        setCount(res.data?.metadata?.count)
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

  const handleOpenModal = ({ action, user }) => {
    setAction(action)
    setSelectedUser(user)
    if (action === 'detail') {
      setOpenInfoModal(true)
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

  const handleBanUser = async (data) => {
    await banUserAPI(data)
    setUsers((prev) => prev.filter((u) => u._id !== data._id))
    handleCloseModal()
  }

  const handleUnbanUser = async (data) => {
    await unbanUserAPI(data)
    setUsers((prev) => prev.filter((u) => u._id !== data._id))
    handleCloseModal()
  }

  const handleGetUserDetail = async (data) => {
    const res = await getUserDetailForAdminAPI({ _id: data?._id })
    setUserDetail(res?.data?.metadata)
  }

  const handleUpdatePassword = async (data) => {
    const res = await updateUserPasswordForAdminAPI(data)
    if (res?.status === 200) handleCloseModal()
  }

  const handleExportData = async () => {
    await exportUserDataAPI({ status, ...filters })
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
    isDenied,
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
    handleExportData
  }
}
