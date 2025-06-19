import { useState, useRef, useEffect } from 'react'
import {
  adminCreateVoucherAPI,
  disableShopVoucherByAdminAPI,
  enableShopVoucherByAdminAPI,
  getVoucherDetailForAdminAPI,
  queryVoucherByAdminAPI,
  updateVoucherByAdminAPI
} from '~/api/voucher.api'
import { navigate } from '~/helpers/navigation'

export const useAdminVoucher = ({ status }) => {
  // ============================== STATE ==============================
  const defaultFilters = {
    search: '',
    type: '',
    startDate: '',
    endDate: '',
    createdFrom: '',
    createdTo: '',
    createdBy: 'admin',
    creatorSelect: '',
    discountValueRange: [0, 100],
    applies: '',
    reservedRange: [0, 500],
    quantityRange: [0, 500]
  }

  const [vouchers, setVouchers] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isDenied, setDenied] = useState(false)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [filters, setFilters] = useState(defaultFilters)
  const skipEffect = useRef(false)

  const [openReasonModal, setOpenReasonModal] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [openVoucherForm, setOpenVoucherForm] = useState(false)
  const [action, setAction] = useState(null)
  const [selectedVoucher, setSelectedVoucher] = useState(null)
  const [voucherDetail, setVoucherDetail] = useState(null)

  // ============================== EFFECT ==============================
  useEffect(() => {
    if (isDenied) navigate('/unauthorized')
  }, [isDenied])

  useEffect(() => {
    if (filters?.type === 'percent') {
      defaultFilters.discountValueRange[1] = 100
    } else {
      if (filters?.createdBy === 'admin') {
        defaultFilters.discountValueRange[1] = 200
      } else {
        defaultFilters.discountValueRange[1] = 100
      }
    }
  }, [filters])

  useEffect(() => {
    if (skipEffect.current) {
      skipEffect.current = false
      return
    }

    queryVoucherByAdmin({ page, rowsPerPage, status, ...filters })
  }, [status, page, rowsPerPage])

  // ============================== API ==============================

  const queryVoucherByAdmin = async (data) => {
    setLoading(true)
    try {
      const res = await queryVoucherByAdminAPI(data)
      if (res.status === 200) {
        setVouchers(res.data?.metadata?.vouchers)
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

  const handleOpenModal = ({ action, voucher }) => {
    setAction(action)
    setSelectedVoucher(voucher)
    if (action === 'detail') {
      setOpenDetailModal(true)
    } else {
      setOpenReasonModal(true)
    }
  }

  const handleCloseModal = () => {
    setOpenDetailModal(false)
    setOpenReasonModal(false)
    setAction(null)
    setSelectedVoucher(null)
    setVoucherDetail(null)
  }

  const handleOpenForm = ({ action, voucher }) => {
    setAction(action)
    setOpenVoucherForm(true)
    if (voucher) setSelectedVoucher(voucher)
  }

  const handleCloseForm = () => {
    setOpenVoucherForm(false)
    setSelectedVoucher(null)
  }

  const handleFilter = () => {
    if (page === 0) {
      queryVoucherByAdmin({ page, rowsPerPage, status, ...filters })
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

  const handleGetVoucherDetail = async (data) => {
    const res = await getVoucherDetailForAdminAPI({ _id: data?._id })
    setVoucherDetail(res?.data?.metadata)
  }

  const handleCreateVoucher = async (data) => {
    const res = await adminCreateVoucherAPI(data)
    setVouchers((prev) => [
      res.data.metadata,
      ...prev.slice(0, prev.length - 1)
    ])
    handleCloseForm()
  }

  const handleUpdateVoucher = async (data) => {
    const res = await updateVoucherByAdminAPI(data)
    const updated = res?.data?.metadata
    setVouchers((prev) =>
      prev.map((v) => (v._id === updated._id ? updated : v))
    )
    handleCloseForm()
  }

  const handleDisableShopVoucher = async (data) => {
    const res = await disableShopVoucherByAdminAPI(data)
    const updated = res?.data?.metadata
    setVouchers((prev) =>
      prev.map((v) => (v._id === updated._id ? updated : v))
    )
    handleCloseModal()
  }

  const handleEnableShopVoucher = async (data) => {
    const res = await enableShopVoucherByAdminAPI(data)
    const updated = res?.data?.metadata
    setVouchers((prev) =>
      prev.map((v) => (v._id === updated._id ? updated : v))
    )
    handleCloseModal()
  }

  const modalProps = {
    disable: {
      type: 'reason',
      header: '	Disable Shop Voucher',
      open: openReasonModal,
      onSubmit: (value) => {
        handleDisableShopVoucher({
          _id: selectedVoucher?._id,
          reason: value,
          action
        })
      },
      submitText: 'Disable',
      submitColor: 'error'
    },
    enable: {
      type: 'reason',
      header: '	Enable Shop Voucher',
      open: openReasonModal,
      onSubmit: (value) => {
        handleEnableShopVoucher({
          _id: selectedVoucher?._id,
          reason: value,
          action
        })
      },
      submitText: 'Enable',
      submitColor: 'success'
    }
  }

  return {
    action,
    vouchers,
    count,
    loading,
    isDenied,
    voucherDetail,
    selectedVoucher,

    filters,
    setFilters,
    page,
    rowsPerPage,

    openDetailModal,
    openReasonModal,
    openVoucherForm,
    modalProps: modalProps[action],

    handleFilter,
    handleClearFilter,
    handleChangePage,
    handleChangeRowsPerPage,
    handleOpenModal,
    handleCloseModal,
    handleGetVoucherDetail,
    handleOpenForm,
    handleCloseForm,
    handleCreateVoucher,
    handleUpdateVoucher
  }
}
