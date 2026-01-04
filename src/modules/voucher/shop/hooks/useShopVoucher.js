import useCustomSearchParams from '~/hooks/common/searchParam.hook'
import { useShopVoucherStore } from '../state/voucher.list.store'
import { buildBanReasonMarkdown } from '~/helpers/buildBanReasonMarkdown'
import { useShopVoucherCacheActions } from '../server/voucher.cache.adapter'
import { useEffect } from 'react'
import { VOUCHER_DELETE_CONFIRM_DIALOG } from '../constants/voucher.constant'
import {
  useShopVoucherListQuery,
  useShopVoucherSummaryQuery,
  useShopVoucherDetailQuery,
  useShopVoucherAuditLogQuery,
  useShopEnableVoucherMutation,
  useShopDisableVoucherMutation,
  useShopDeleteVoucherMutation,
  useShopVoucherProductsQuery
} from '../server/voucher.list.server'

export const useShopVoucher = () => {
  const [params, paramsReady, setParams] = useCustomSearchParams({
    defaultParams: { status: 'ALL' }
  })

  const {
    isOpenDetailModal,
    isOpenConfirmDialog,
    isOpenReasonDialog,
    selectedVoucherId,
    tempFilters,
    openReasonDialog,
    closeReasonDialog,
    openDetailModal,
    closeDetailModal,
    openConfirmDialog,
    closeConfirmDialog,
    setTempFilters,
    updateTempFilter,
    clearTempFilters
  } = useShopVoucherStore()

  const { resetAll, trimList } = useShopVoucherCacheActions()

  useEffect(() => {
    setTempFilters(params)
  }, [params, setTempFilters])

  // ============================== API ==============================
  const listQuery = useShopVoucherListQuery({ filters: params, paramsReady })

  const summaryQuery = useShopVoucherSummaryQuery()

  const detailQuery = useShopVoucherDetailQuery({
    _id: selectedVoucherId,
    enabled: isOpenDetailModal
  })

  const auditLogQuery = useShopVoucherAuditLogQuery({
    _id: selectedVoucherId,
    enabled: isOpenReasonDialog
  })

  const productsQuery = useShopVoucherProductsQuery({
    _id: selectedVoucherId
  })

  const enableMutation = useShopEnableVoucherMutation()

  const disableMutation = useShopDisableVoucherMutation()

  const deleteMutation = useShopDeleteVoucherMutation()

  // ============================== FILTER HANDLERS ==============================
  const handleApplyFilter = () => {
    trimList()
    setParams({ ...tempFilters, page: 1 })
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
  // ============================== API HANDLERS ==============================
  const handleFetchProducts = () => {
    if (!selectedVoucherId) return
    productsQuery.refetch()
  }

  const handleToggleVoucher = ({ action, voucher }) => {
    const api = {
      enable: enableMutation,
      disable: disableMutation
    }

    if (!api[action]) return

    api[action].mutate({ _id: voucher._id })
  }

  const handleDeleteVoucher = () => {
    if (!selectedVoucherId) return

    deleteMutation.mutate(
      { _id: selectedVoucherId },
      { onSuccess: () => closeConfirmDialog() }
    )
  }
  // ============================== UI HANDLERS ==============================
  const handleOpenDetailModal = ({ voucher }) => openDetailModal(voucher._id)

  const handleCloseDetailModal = () => closeDetailModal()

  const handleOpenConfirmDialog = ({ voucher }) => {
    openConfirmDialog(voucher._id)
  }

  const handleCloseConfirmDialog = () => {
    if (deleteMutation.isPending) return
    closeConfirmDialog()
  }

  const handleOpenReasonDialog = ({ voucher }) => {
    openReasonDialog(voucher._id)
  }

  const handleChangeTab = (newValue) => {
    trimList()
    const updatedParams = { ...params, status: newValue, page: 1 }
    setParams(updatedParams)
  }

  const handleRefresh = () => resetAll()

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
        isRefreshing: listQuery.isFetching || summaryQuery.isFetching
      },

      tab: {
        value: params.status,
        table: {
          isLoading: listQuery.isLoading,
          isFetching: listQuery.isFetching,
          page: params.page,
          limit: params.limit,
          row: {
            isPending: isVoucherToggleInProgress
          }
        }
      },

      detailModal: {
        isOpen: isOpenDetailModal,
        isLoadingDetail: detailQuery.isFetching,
        isLoadingProducts: productsQuery.isFetching
      },

      confirmDialog: {
        isOpen: isOpenConfirmDialog,
        isSubmitting: deleteMutation.isPending,
        ...VOUCHER_DELETE_CONFIRM_DIALOG
      },

      reasonDialog: {
        isOpen: isOpenReasonDialog,
        title: 'Voucher ban reason',
        isLoading: auditLogQuery.isFetching
      }
    },

    data: {
      tab: {
        summary: summaryQuery.data,
        table: {
          vouchers: listQuery.data?.vouchers ?? [],
          count: listQuery.data?.count ?? 0
        }
      },

      detailModal: {
        voucher: detailQuery.data,
        products: productsQuery.data
      },

      filter: {
        tempFilters
      },

      auditLog: {
        content: buildBanReasonMarkdown(auditLogQuery.data)
      }
    },

    handler: {
      tab: {
        handleChangeTab,
        table: {
          row: {
            handleOpenDetailModal,
            handleToggleVoucher,
            handleOpenConfirmDialog,
            handleOpenReasonDialog
          },
          handleChangePage,
          handleChangeRowsPerPage
        }
      },

      header: {
        handleRefresh,
        filter: {
          handleApplyFilter,
          handleClearTempFilters,
          handleFilterChange
        }
      },

      detailModal: {
        handleClose: handleCloseDetailModal,
        handleFetchProducts
      },

      confirmDialog: {
        handleClose: handleCloseConfirmDialog,
        handleConfirm: handleDeleteVoucher
      },

      reasonDialog: {
        handleClose: closeReasonDialog
      }
    }
  }
}
