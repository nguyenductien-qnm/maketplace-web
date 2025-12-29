import { StatusCodes } from 'http-status-codes'
import { useFilterCompare } from '../common/filterCompare'
import { useSearchParams } from 'react-router-dom'
import { useState, useEffect, useCallback, useRef } from 'react'
import { asyncHandlerShop } from '~/helpers/asyncHandler'
import {
  deleteVoucherByShopAPI,
  getVoucherSummaryByShopAPI,
  queryVoucherByShopAPI
} from '~/api/voucher.api'

const TAB_LABELS = {
  ALL: 'All',
  ACTIVE: 'Active',
  ONGOING: 'Ongoing',
  UPCOMING: 'Upcoming',
  EXPIRED: 'Expired',
  DISABLED: 'Disabled',
  BANNED: 'Banned'
}

const DEFAULT_FILTERS = {
  status: 'ALL',
  search: '',
  voucher_apply: '',
  voucher_type: '',
  voucher_visibility: '',
  sort_by: 'newest',
  page: 1,
  limit: 10
}

export const useVendorVoucher = () => {
  const [vouchers, setVouchers] = useState([])
  const [summary, setSummary] = useState(null)
  const [count, setCount] = useState(0)
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedVoucherId, setSelectedVoucherId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [params, setParams] = useSearchParams()

  const isInitialized = useRef(false)

  // ============================== API ==============================
  const fetchVoucherSummary = async () => {
    const { status, resData } = await getVoucherSummaryByShopAPI()
    if (status === StatusCodes.OK) setSummary(resData.metadata)
  }

  const fetchVouchers = useCallback(async ({ filters }) => {
    setLoading(true)
    setVouchers([])
    setCount(0)
    try {
      const [res] = await asyncHandlerShop(
        async () =>
          await queryVoucherByShopAPI({
            payload: filters
          })
      )

      if (res?.status === StatusCodes.OK) {
        const { vouchers, count } = res.resData.metadata
        setVouchers(vouchers || [])
        setCount(count || 0)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const handleDeleteVoucher = async () => {
    try {
      setIsDeleting(true)
      const { status } = await deleteVoucherByShopAPI({
        _id: selectedVoucherId,
        loadingClass: '.btn-confirm-modal'
      })
      if (status === StatusCodes.OK) {
        setVouchers((prev) => [
          ...prev.filter((v) => v._id != selectedVoucherId)
        ])
        setSelectedVoucherId(null)
        setOpenConfirmDialog(false)
      }
    } finally {
      setIsDeleting(false)
    }
  }

  // ============================== FILTER COMPARE HOOK ==============================
  const { checkAndFetch } = useFilterCompare(fetchVouchers)

  // ============================== INIT EFFECT ==============================
  useEffect(() => {
    const urlParams = Object.fromEntries(params.entries())

    if (!urlParams.status || !urlParams.page || !urlParams.limit) {
      const defaultParams = {
        status: 'ALL',
        sort_by: 'newest',
        page: 1,
        limit: 10
      }
      setFilters((prev) => ({ ...prev, ...defaultParams }))
      setParams(defaultParams)
      fetchVouchers({ filters: defaultParams })
    } else {
      const merged = { ...DEFAULT_FILTERS, ...urlParams }
      setFilters(merged)
      fetchVouchers({ filters: merged })
    }
    fetchVoucherSummary()
    isInitialized.current = true
  }, [])

  // ============================== HANDLER ==============================
  const handleOpenConfirmDialog = (voucher) => {
    setOpenConfirmDialog(true)
    if (voucher) setSelectedVoucherId(voucher?._id)
  }

  const handleCloseConfirmDialog = () => {
    if (isDeleting) return
    setSelectedVoucherId(null)
    setOpenConfirmDialog(false)
  }

  const handleFilter = () => {
    const updatedFilters = { ...filters, page: 1 }

    const params = {}
    for (const [key, value] of Object.entries(updatedFilters)) {
      if (value !== '' && value !== null && value !== undefined) {
        params[key] = value
      }
    }

    setFilters(updatedFilters)
    setParams(params)
    checkAndFetch(updatedFilters)
  }

  const handleClearFilter = () => {
    const resetFilters = {
      ...filters,
      search: '',
      voucher_apply: '',
      voucher_type: '',
      voucher_visibility: '',
      sort_by: 'newest',
      page: 1
    }

    const resetParams = {
      status: filters.status,
      sort_by: 'newest',
      page: 1,
      limit: filters.limit
    }

    setFilters(resetFilters)
    setParams(resetParams)
    checkAndFetch(resetFilters)
  }

  const handleChangeTab = (newValue) => {
    const updatedFilters = { ...filters, status: newValue, page: 1 }

    const params = {}
    for (const [key, value] of Object.entries(updatedFilters)) {
      if (value !== '' && value !== null && value !== undefined) {
        params[key] = value
      }
    }

    setFilters(updatedFilters)
    setParams(params)
    fetchVouchers({ filters: updatedFilters })
  }

  const handleChangePage = (e, newValue) => {
    const pageValue = newValue + 1
    const updatedFilters = { ...filters, page: pageValue }

    setFilters(updatedFilters)
    setParams((prevParams) => {
      const updatedParams = new URLSearchParams(prevParams)
      updatedParams.set('page', pageValue)
      return updatedParams
    })

    fetchVouchers({ filters: updatedFilters })
  }

  const handleChangeRowsPerPage = (event) => {
    const limitValue = parseInt(event.target.value, 10)
    const updatedFilters = { ...filters, limit: limitValue, page: 1 }

    setFilters(updatedFilters)
    setParams((prevParams) => {
      const updatedParams = new URLSearchParams(prevParams)
      updatedParams.set('limit', limitValue)
      updatedParams.set('page', 1)
      return updatedParams
    })

    fetchVouchers({ filters: updatedFilters })
  }

  return {
    ui: { loading, isDeleting, openConfirmDialog, TAB_LABELS },
    data: { vouchers, count, filters, summary },
    handler: {
      handleOpenConfirmDialog,
      handleCloseConfirmDialog,
      setFilters,
      handleChangePage,
      handleChangeRowsPerPage,
      handleChangeTab,
      handleFilter,
      handleClearFilter,
      handleDeleteVoucher
    }
  }
}
