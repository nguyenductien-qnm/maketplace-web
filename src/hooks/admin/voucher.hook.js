import { navigate } from '~/helpers/navigation'
import { StatusCodes } from 'http-status-codes'
import { useState, useEffect } from 'react'
import { getShopListForFilterAPI } from '~/api/shop.api'
import { getStaffListForFilterAPI } from '~/api/user.api'
import {
  createVoucherByAdminAPI,
  disableVoucherByAdminAPI,
  enableVoucherByAdminAPI,
  exportVoucherDataByAdminAPI,
  getVoucherApplicableProductsAPI,
  getVoucherDetailByAdminAPI,
  getVoucherSummaryByAdminAPI,
  queryVoucherByAdminAPI,
  updateVoucherByAdminAPI,
  banShopVoucherByAdminAPI,
  unbanShopVoucherByAdminAPI
} from '~/api/voucher.api'
import useCustomSearchParams from '../common/searchParam.hook'
import { toast } from 'react-toastify'
import { getAuditLogDetailByAdminAPI } from '~/api/auditLog.api'

const LOADING_CLASS = [
  '.btn-admin-voucher-action',
  '.btn-admin-voucher-form',
  '.btn-reason-modal',
  '.btn-export-voucher'
]

const VOUCHER_TABLE_MAP = [
  { key: 'creator', label: 'Creator By' },
  { key: 'voucher_name', label: 'CODE' },
  { key: 'voucher_type', label: 'Type' },
  { key: 'voucher_visibility', label: 'Visibility' },
  { key: 'voucher_disable', label: 'Active' },
  { key: 'active_period', label: 'Active Period' },
  { key: 'voucher_quantity', label: 'Quantity' },
  { key: 'voucher_reserved_count', label: 'Used' },
  { key: 'voucher_value', label: 'Value' },
  { key: 'action', label: 'Action' }
]

const PAGE_TITLE = {
  ONGOING: 'Ongoing Vouchers',
  UPCOMING: 'Upcoming Vouchers',
  EXPIRED: 'Expired Vouchers',
  BANNED: 'Banned Vouchers',
  ALL: 'All Vouchers',
  ACTIVE: 'Active Vouchers',
  DISABLED: 'Disable Vouchers'
}

const VOUCHER_ACTION_API = {
  enable: enableVoucherByAdminAPI,
  disable: disableVoucherByAdminAPI,
  ban: banShopVoucherByAdminAPI,
  unban: unbanShopVoucherByAdminAPI
}

export const useAdminVoucher = () => {
  // ============================== STATE ==============================
  const [params, paramsReady, setParams] = useCustomSearchParams({
    defaultParams: { status: 'ONGOING' }
  })
  const [tempFilters, setTempFilters] = useState({})
  const [vouchers, setVouchers] = useState([])
  const [count, setCount] = useState(0)

  const [isDenied, setDenied] = useState(false)
  const [shops, setShops] = useState([])
  const [staffs, setStaffs] = useState([])
  const [openReasonModal, setOpenReasonModal] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [openVoucherForm, setOpenVoucherForm] = useState(false)
  const [action, setAction] = useState(null)
  const [selectedVoucher, setSelectedVoucher] = useState(null)
  const [voucherDetail, setVoucherDetail] = useState(null)
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingDetail, setLoadingDetail] = useState(true)
  const [loadingAuditLog, setLoadingAuditLog] = useState(null)
  const [loadingProducts, setLoadingProducts] = useState(null)

  // ============================== EFFECT ==============================
  useEffect(() => {
    if (isDenied) navigate('/access-denied')
  }, [isDenied])

  useEffect(() => {
    fetchShops()
    fetchStaffs()
    fetchVoucherSummary()
  }, [])

  useEffect(() => {
    if (paramsReady) fetchVouchers({ filters: params })
    setTempFilters({ ...params })
  }, [params, paramsReady])

  // ============================== FETCH DATA ==============================
  const fetchVoucherSummary = async () => {
    const { status, resData } = await getVoucherSummaryByAdminAPI()
    if (status === StatusCodes.OK) setSummary(resData?.metadata || {})
  }

  const fetchVouchers = async ({ filters }) => {
    setLoading(true)
    try {
      const { status, resData } = await queryVoucherByAdminAPI({
        payload: filters
      })
      if (status === StatusCodes.OK) {
        const { vouchers, count } = resData?.metadata
        setVouchers(vouchers || [])
        setCount(count || 0)
      }
    } catch (err) {
      setVouchers([])
      if (err?.status !== StatusCodes.UNPROCESSABLE_ENTITY) setDenied(true)
    } finally {
      setLoading(false)
    }
  }

  const fetchShops = async () => {
    const { status, resData } = await getShopListForFilterAPI()
    if (status === StatusCodes.OK) setShops(resData?.metadata || [])
  }

  const fetchStaffs = async () => {
    const { status, resData } = await getStaffListForFilterAPI()
    if (status === StatusCodes.OK) setStaffs(resData?.metadata || [])
  }

  // ============================== HANDLER FILTER ==============================

  const handleApplyFilter = () => {
    const hasDateFilter =
      tempFilters.created_from ||
      tempFilters.created_to ||
      tempFilters.active_from ||
      tempFilters.active_to
    if (hasDateFilter && tempFilters.status !== 'ALL') {
      const clone = { ...tempFilters }
      clone.status = 'ALL'
      setParams(clone)
      toast.info('Searching across all voucher statuses with date filter.')
    } else setParams(tempFilters)
  }

  const handleRemoveParam = (key) => {
    if (key === 'sort_by') return
    const clone = { ...params }
    delete clone[key]
    if (key == 'creator_selected') delete clone.creator_id
    setParams(clone)
  }

  const handleClearAllFilter = () => {
    const cleared = {
      status: params.status,
      page: 1,
      limit: params.limit ?? 10,
      sort_by: 'newest'
    }
    setParams(cleared)
  }

  const handleClearTempFilters = () => {
    setTempFilters({
      sort_by: 'newest'
    })
  }

  const handleFilterChange = (field, value) => {
    setTempFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleChangePage = (e, newValue) => {
    setParams({ ...params, page: newValue + 1 })
  }

  const handleChangeRowsPerPage = (event) => {
    setParams({ ...params, limit: event.target.value })
  }

  // ============================== HANDLER FETCH DETAIL ==============================
  const handleGetVoucherDetail = async (data) => {
    try {
      setLoadingDetail(true)
      const { status, resData } = await getVoucherDetailByAdminAPI({
        _id: data?._id
      })
      if (status === StatusCodes.OK)
        setVoucherDetail({ voucher: resData?.metadata })
    } finally {
      setLoadingDetail(false)
    }
  }

  const handleGetApplicableProducts = async () => {
    try {
      setLoadingProducts(true)
      const { status, resData } = await getVoucherApplicableProductsAPI({
        _id: voucherDetail?.voucher?._id
      })
      if (status === StatusCodes.OK)
        setVoucherDetail((prev) => ({ ...prev, products: resData?.metadata }))
    } finally {
      setLoadingProducts(false)
    }
  }

  const handleGetAuditLogDetail = async () => {
    try {
      setLoadingAuditLog(true)
      const { status, resData } = await getAuditLogDetailByAdminAPI({
        _id: voucherDetail?.voucher?._id,
        entity: 'voucher',
        action: 'banned'
      })
      if (status === StatusCodes.OK)
        setVoucherDetail((prev) => ({ ...prev, log: resData?.metadata }))
    } finally {
      setLoadingAuditLog(false)
    }
  }

  // ============================== HANDLER MODAL ==============================
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

  // ============================== HANDLER FORM ==============================
  const handleOpenForm = ({ action, voucher }) => {
    setAction(action)
    setOpenVoucherForm(true)
    if (voucher) {
      handleGetVoucherDetail(voucher)
    } else {
      setLoadingDetail(false)
    }
  }

  const handleCloseForm = () => {
    setOpenVoucherForm(false)
    setVoucherDetail(null)
    setAction(null)
  }

  // ============================== HANDLER VOUCHER ==============================

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
      _id: voucherDetail.voucher._id,
      payload,
      loadingClass: LOADING_CLASS
    })
    if (status === StatusCodes.OK) {
      const updated = resData?.metadata
      setVouchers((prev) =>
        prev.map((v) => {
          if (v._id !== updated._id) return v
          return { ...v, ...updated }
        })
      )
      handleCloseForm()
    }
  }

  const handleToggleVoucher = async ({ _id, is_enabled }) => {
    const action = is_enabled ? 'disable' : 'enable'
    const api = VOUCHER_ACTION_API[action]
    if (!action) return

    const { status, resData } = await api({
      _id,
      payload: { action },
      loadingClass: LOADING_CLASS
    })

    if (status === StatusCodes.OK) {
      const updated = resData?.metadata
      setVouchers((prev) =>
        prev.map((v) => (v._id === updated._id ? { ...v, ...updated } : v))
      )

      fetchVoucherSummary()
    }
  }

  const handleChangeShopVoucherStatus = async (data) => {
    const { _id, action, reason } = data
    const api = VOUCHER_ACTION_API[action]
    if (!api) return

    const { status, resData } = await api({
      _id,
      payload: { action, reason },
      loadingClass: LOADING_CLASS
    })

    if (status === StatusCodes.OK) {
      const updated = resData?.metadata
      setVouchers((prev) =>
        prev.map((v) => (v._id === updated._id ? { ...v, ...updated } : v))
      )
      handleCloseModal()
      fetchVoucherSummary()
    }
  }

  // ============================== HANDLER EXPORT ==============================

  const handleExportVouchers = async () => {
    const { status: apiStatus, resData } = await exportVoucherDataByAdminAPI({
      payload: { status, ...filters },
      loadingClass: LOADING_CLASS
    })

    if (apiStatus === StatusCodes.OK) {
      const blob = resData
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'vouchers.csv'
      a.click()
      window.URL.revokeObjectURL(url)
    }
  }

  // ============================== MODAL CONTENT ==============================
  const modalProps = {
    ban: {
      type: 'reason',
      header: '	Ban Shop Voucher',
      open: openReasonModal,
      onSubmit: (value) => {
        handleChangeShopVoucherStatus({
          _id: selectedVoucher?._id,
          reason: value,
          action
        })
      },
      submitText: 'Confirm',
      submitColor: 'error'
    },
    unban: {
      type: 'reason',
      header: '	Unban Shop Voucher',
      open: openReasonModal,
      onSubmit: (value) => {
        handleChangeShopVoucherStatus({
          _id: selectedVoucher?._id,
          reason: value,
          action
        })
      },
      submitText: 'Confirm',
      submitColor: 'success'
    }
  }

  return {
    ui: {
      modalProps: modalProps[action],
      selectedVoucher,
      action,
      header: {
        pageTitle: PAGE_TITLE[params?.status]
      },

      table: {
        loading,
        page: params.page,
        limit: params.limit,
        VOUCHER_TABLE_MAP
      },

      modal: {
        openDetailModal,
        openReasonModal,
        loadingDetail,
        loadingAuditLog,
        loadingProducts
      },

      form: { openVoucherForm, loadingDetail }
    },

    data: {
      voucherDetail,
      summary,
      filter: { tempFilters, shops, staffs, params },
      table: { vouchers, count },
      modal: { voucherDetail }
    },

    handler: {
      handleCreateVoucher,
      handleUpdateVoucher,

      header: {
        handleOpenForm,
        handleExportVouchers
      },

      filter: {
        handleApplyFilter,
        handleClearAllFilter,
        handleRemoveParam,
        handleFilterChange,
        handleClearTempFilters
      },

      table: {
        handleChangePage,
        handleChangeRowsPerPage,
        row: {
          handleToggleVoucher,
          handleOpenModal,
          handleOpenForm
        }
      },
      modal: {
        handleOpenModal,
        handleCloseModal,
        handleGetApplicableProducts,
        handleGetAuditLogDetail
      },
      form: {
        handleOpenForm,
        handleCloseForm
      }
    }
  }
}
