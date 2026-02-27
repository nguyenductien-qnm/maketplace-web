import { useEffect } from 'react'
import { useAdminVoucherStore } from '../state/voucher.list.state'
import {
  VOUCHER_FORM_TITLE,
  VOUCHER_PAGE_TITLE,
  VOUCHER_REASON_CONTENT
} from '../constants/voucher.constant'
import {
  useAdminVoucherAuditLogQuery,
  useAdminVoucherDetailQuery,
  useAdminVoucherListQuery,
  useAdminVoucherProductsQuery,
  useAdminVoucherSummaryQuery,
  useAdminBanVoucherMutation,
  useAdminUnbanVoucherMutation,
  useAdminEnableVoucherMutation,
  useAdminDisableVoucherMutation,
  useVoucherFormSnapshotQuery,
  useAdminCreateVoucherMutation,
  useAdminUpdateVoucherMutation
} from '../server/voucher.list.server'
import { useAdminVoucherCacheActions } from '../server/voucher.list.adapter'
import useCustomSearchParams from '~/hooks/common/searchParam.hook'

import {
  useAdminShopFilterQuery,
  useAdminStaffFilterQuery
} from '~/modules/_shared/admin/server/reference.server'

export const useAdminVoucher = () => {
  const [params, paramsReady, setParams] = useCustomSearchParams({
    defaultParams: { status: 'ONGOING' }
  })

  const {
    action,
    commandAction,
    tempFilters,
    updateTempFilter,
    setTempFilters,
    selectedVoucherId,
    isOpenDetailModal,
    isOpenReasonModal,
    isOpenForm,
    openDetailModal,
    closeDetailModal,
    openReasonModal,
    closeReasonModal,
    openForm,
    closeForm,
    clearTempFilters
  } = useAdminVoucherStore()

  const { resetAll, trimList } = useAdminVoucherCacheActions()

  useEffect(() => {
    setTempFilters(params)
  }, [params])

  const listQuery = useAdminVoucherListQuery({ filters: params, paramsReady })

  const summaryQuery = useAdminVoucherSummaryQuery()

  const detailQuery = useAdminVoucherDetailQuery({
    _id: selectedVoucherId,
    enabled: isOpenDetailModal
  })

  const productsQuery = useAdminVoucherProductsQuery({
    _id: selectedVoucherId
  })

  const auditLogQuery = useAdminVoucherAuditLogQuery({ _id: selectedVoucherId })

  const shopQuery = useAdminShopFilterQuery()

  const staffQuery = useAdminStaffFilterQuery()

  const snapshotQuery = useVoucherFormSnapshotQuery({
    _id: selectedVoucherId,
    enabled: isOpenForm
  })

  const createMutation = useAdminCreateVoucherMutation()

  const updateMutation = useAdminUpdateVoucherMutation()

  const banMutation = useAdminBanVoucherMutation()

  const unbanMutation = useAdminUnbanVoucherMutation()

  const enableMutation = useAdminEnableVoucherMutation()

  const disableMutation = useAdminDisableVoucherMutation()

  const handleOpenForm = ({ voucherId = null }) => {
    openForm(voucherId)
  }

  const handleCloseForm = () => {
    if (createMutation.isPending || updateMutation.isPending) return
    closeForm()
  }

  const handleOpenDetailModal = ({ voucher }) => openDetailModal(voucher._id)

  const handleCloseDetailModal = () => closeDetailModal()

  const handleOpenReasonModal = ({ action, voucher }) => {
    const { _id } = voucher
    openReasonModal(_id, action)
  }

  const handleCloseReasonModal = () => {
    if (banMutation.isPending || unbanMutation.isPending) return
    closeReasonModal()
  }

  // ============================== HANDLER FILTER ==============================
  const handleApplyFilter = () => {
    trimList()
    const hasDateFilter =
      tempFilters.created_from ||
      tempFilters.created_to ||
      tempFilters.active_from ||
      tempFilters.active_to

    if (hasDateFilter && tempFilters.status !== 'ALL') {
      setParams({ ...tempFilters, status: 'ALL' })
      toast.info('Searching across all voucher statuses with date filter.')
    } else {
      setParams({ ...tempFilters, page: 1 })
    }
  }

  const handleRemoveParam = (key) => {
    if (key === 'sort_by') return
    trimList()

    const clone = { ...params, page: 1 }

    delete clone[key]

    if (key === 'creator_role') {
      delete clone.creator_selected
    }

    setParams(clone)
  }

  const handleClearAllFilter = () => {
    trimList()
    setParams({
      status: params.status,
      page: 1,
      limit: params.limit ?? 10,
      sort_by: 'newest'
    })
  }

  const handleClearTempFilters = () => {
    clearTempFilters({ currentStatus: params.status, limit: params.limit })
  }

  const handleFilterChange = (field, value) => {
    updateTempFilter(field, value)
  }

  const handleChangePage = (_, newPage) => {
    trimList()
    setParams({ ...params, page: newPage + 1 })
  }

  const handleChangeRowsPerPage = (event) => {
    trimList()
    setParams({ ...params, limit: Number(event.target.value), page: 1 })
  }

  // ============================== HANDLER FILTER ==============================
  const handleFetchProducts = () => {
    productsQuery.refetch()
  }

  const handleFetchAuditLog = () => {
    auditLogQuery.refetch()
  }

  const handleCreateVoucher = async (data) => {
    createMutation.mutate(
      { payload: data, pageLimit: params.limit },
      {
        onSuccess: () => closeForm()
      }
    )
  }

  const handleUpdateVoucher = async (data) => {
    updateMutation.mutate(
      { _id: selectedVoucherId, payload: data },
      {
        onSuccess: () => closeForm()
      }
    )
  }

  const handleToggleVoucher = async ({ action, voucher }) => {
    const api = {
      enable: enableMutation,
      disable: disableMutation
    }

    if (!api[action]) return

    api[action].mutate({ _id: voucher._id })
  }

  const handleBanVoucher = async (data) => {
    if (!selectedVoucherId) return

    banMutation.mutate(
      {
        _id: selectedVoucherId,
        payload: { action: 'ban', reason: data.reason }
      },
      { onSuccess: () => closeReasonModal() }
    )
  }

  const handleUnbanVoucher = async (data) => {
    if (!selectedVoucherId) return

    unbanMutation.mutate(
      {
        _id: selectedVoucherId,
        payload: { action: 'unban', reason: data.reason }
      },
      { onSuccess: () => closeReasonModal() }
    )
  }

  const handleRefresh = () => resetAll()

  const VOUCHER_MODERATION_HANDLERS = {
    create: handleCreateVoucher,
    update: handleUpdateVoucher,
    ban: handleBanVoucher,
    unban: handleUnbanVoucher
  }

  const isVoucherToggleInProgress = (voucher) => {
    const isEnabling =
      enableMutation.isPending && enableMutation.variables?._id === voucher._id

    const isDisabling =
      disableMutation.isPending &&
      disableMutation.variables?._id === voucher._id

    return isEnabling || isDisabling
  }

  return {
    ui: {
      header: {
        pageTitle: VOUCHER_PAGE_TITLE[params.status],
        isRefreshing: listQuery.isFetching
      },

      summary: {
        isLoading: summaryQuery.isLoading
      },

      filter: {
        isFetching: listQuery.isFetching
      },

      table: {
        isLoading: listQuery.isLoading,
        isFetching: listQuery.isFetching,
        page: params.page,
        limit: params.limit,
        row: {
          isPending: isVoucherToggleInProgress
        }
      },

      form: {
        isOpen: isOpenForm,
        isLoading: snapshotQuery.isFetching,
        title: VOUCHER_FORM_TITLE[action],
        isUpdate: action == 'update' ? true : false,
        action,
        isSubmitting: createMutation.isPending || updateMutation.isPending
      },

      detailModal: {
        isOpen: isOpenDetailModal,
        isLoadingDetail: detailQuery.isFetching,
        isLoadingProducts: productsQuery.isFetching,
        isLoadingAuditLog: auditLogQuery.isFetching
      },

      reasonModal: {
        isOpen: isOpenReasonModal,
        isSubmitting: banMutation.isPending || unbanMutation.isPending,
        ...VOUCHER_REASON_CONTENT[commandAction]
      }
    },

    data: {
      table: {
        vouchers: listQuery.data?.vouchers ?? [],
        count: listQuery.data?.count ?? 0
      },

      summary: summaryQuery.data,

      form: {
        voucher: snapshotQuery.data
      },

      detailModal: {
        voucher: detailQuery.data,
        products: productsQuery.data,
        log: auditLogQuery.data
      },

      filters: {
        params,
        tempFilters,
        shops: shopQuery.data ?? [],
        staffs: staffQuery.data ?? []
      }
    },

    handler: {
      header: {
        handleOpenForm,
        handleRefresh
      },

      table: {
        row: {
          handleOpenDetailModal,
          handleOpenReasonModal,
          handleOpenForm,
          handleToggleVoucher
        },
        handleChangePage,
        handleChangeRowsPerPage
      },

      filter: {
        handleApplyFilter,
        handleRemoveParam,
        handleClearAllFilter,
        handleClearTempFilters,
        handleFilterChange
      },

      form: {
        handleSubmitForm: VOUCHER_MODERATION_HANDLERS[action],
        handleClose: handleCloseForm
      },

      detailModal: {
        handleClose: handleCloseDetailModal,
        handleFetchProducts,
        handleFetchAuditLog
      },

      modal: {
        handleCloseDetailModal
      },

      reasonModal: {
        onsubmit: VOUCHER_MODERATION_HANDLERS[commandAction],
        handleClose: handleCloseReasonModal
      }
    }
  }
}
