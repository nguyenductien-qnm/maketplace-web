import { StatusCodes } from 'http-status-codes'
import { useState, useRef, useEffect } from 'react'
import { getShopListForFilterAPI } from '~/api/shop.api'
import { getStaffListForFilterAPI } from '~/api/user.api'
import {
  createVoucherByAdminAPI,
  disableShopVoucherByAdminAPI,
  enableShopVoucherByAdminAPI,
  getVoucherDetailForAdminAPI,
  queryVoucherByAdminAPI,
  updateVoucherByAdminAPI
} from '~/api/voucher.api'
import { navigate } from '~/helpers/navigation'

const LOADING_CLASS = [
  '.btn-admin-voucher-action',
  '.btn-voucher-form',
  '.btn-reason-modal'
]

const DEFAULT_FILTERS = {
  search: '',
  type: 'all',
  startDate: '',
  endDate: '',
  createdFrom: '',
  createdTo: '',
  createdBy: 'all',
  creatorSelect: '',
  discountValueRange: [0, 200],
  applies: 'all',
  reservedRange: [0, 500],
  quantityRange: [0, 500]
}

const VOUCHER_TABLE_MAP = [
  { key: 'voucher_code', label: 'CODE' },
  { key: 'voucher_name', label: 'Name' },
  { key: 'voucher_start_date', label: 'Start date' },
  { key: 'voucher_end_date', label: 'End date' },
  { key: 'voucher_type', label: 'Type' },
  { key: 'voucher_creator_role', label: 'Creator role' },
  { key: 'detail', label: 'Detail' },
  { key: 'action', label: 'Action' }
]

export const useAdminVoucher = ({ status }) => {
  // ============================== STATE ==============================

  const [vouchers, setVouchers] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isDenied, setDenied] = useState(false)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const skipEffect = useRef(false)

  const [shops, setShops] = useState([])
  const [staffs, setStaffs] = useState([])
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
    if (!filters) return

    let newMax

    if (filters.type === 'percent') {
      newMax = 100
    } else if (filters.type === 'fixed_amount') {
      newMax = filters.createdBy === 'shop' ? 100 : 200
    } else {
      return
    }

    if (filters.discountValueRange?.[1] !== newMax) {
      setFilters((prev) => ({
        ...prev,
        discountValueRange: [prev.discountValueRange?.[0] ?? 0, newMax]
      }))
    }
  }, [filters?.type, filters?.createdBy])

  useEffect(() => {
    if (skipEffect.current) {
      skipEffect.current = false
      return
    }

    queryVoucherByAdmin({ page, rowsPerPage, status, ...filters })
  }, [status, page, rowsPerPage])

  useEffect(() => {
    getShopList()
    getStaffList()
  }, [])
  // ============================== API ==============================
  const getShopList = async () => {
    const { status, resData } = await getShopListForFilterAPI()
    if (status === StatusCodes.OK) setShops(resData?.metadata || [])
  }

  const getStaffList = async () => {
    const { status, resData } = await getStaffListForFilterAPI()
    if (status === StatusCodes.OK) setStaffs(resData?.metadata || [])
  }

  const queryVoucherByAdmin = async (data) => {
    setLoading(true)
    try {
      const { status, resData } = await queryVoucherByAdminAPI({
        payload: data
      })
      if (status === StatusCodes.OK) {
        const { vouchers, count } = resData?.metadata
        setVouchers(vouchers)
        setCount(count)
      }
    } catch (err) {
      if (err?.status !== StatusCodes.UNPROCESSABLE_ENTITY) setDenied(true)
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
      handleGetVoucherDetail(voucher)
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
    setFilters({ ...DEFAULT_FILTERS })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleGetVoucherDetail = async (data) => {
    const { status, resData } = await getVoucherDetailForAdminAPI({
      _id: data?._id
    })
    if (status === StatusCodes.OK) setVoucherDetail(resData?.metadata)
  }

  const handleCreateVoucher = async (data) => {
    const { status, resData } = await createVoucherByAdminAPI({
      payload: data,
      loadingClass: LOADING_CLASS
    })
    if (status === StatusCodes.OK) {
      const created = resData?.metadata
      setVouchers((p) => [created, ...p])
      handleCloseForm()
    }
  }

  const handleUpdateVoucher = async (data) => {
    const { voucher_applies, ...payload } = data
    const { status, resData } = await updateVoucherByAdminAPI({
      payload,
      loadingClass: LOADING_CLASS
    })
    if (status === StatusCodes.OK) {
      const updated = resData?.metadata
      setVouchers((prev) =>
        prev.map((v) => (v._id === updated._id ? updated : v))
      )
      handleCloseForm()
    }
  }

  const handleDisableShopVoucher = async (data) => {
    const { status, resData } = await disableShopVoucherByAdminAPI({
      payload: data,
      loadingClass: LOADING_CLASS
    })
    if (status === StatusCodes.OK) {
      const updated = resData?.metadata
      setVouchers((prev) =>
        prev.map((v) => (v._id === updated._id ? updated : v))
      )
      handleCloseModal()
    }
  }

  const handleEnableShopVoucher = async (data) => {
    const { status, resData } = await enableShopVoucherByAdminAPI({
      payload: data,
      loadingClass: LOADING_CLASS
    })
    if (status === StatusCodes.OK) {
      const updated = resData?.metadata
      setVouchers((prev) =>
        prev.map((v) => (v._id === updated._id ? updated : v))
      )
      handleCloseModal()
    }
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
    shops,
    staffs,
    action,
    vouchers,
    count,
    loading,
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
    handleOpenForm,
    handleCloseForm,
    handleCreateVoucher,
    handleUpdateVoucher,

    VOUCHER_TABLE_MAP
  }
}
