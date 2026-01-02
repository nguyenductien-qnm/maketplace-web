import useCustomSearchParams from '~/hooks/common/searchParam.hook'
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
import { useShopVoucherStore } from '../state/voucher.list.store'
import { useEffect } from 'react'
import { buildBanReasonMarkdown } from '~/helpers/buildBanReasonMarkdown'
import { useShopVoucherCacheActions } from '../server/voucher.cache.adapter'

export const useShopVoucher = () => {
  const [params, paramsReady, setParams] = useCustomSearchParams({
    defaultParams: { status: 'ACTIVE' }
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
  }, [params])

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

  // ============================== HANDLER FILTER ==============================
  const handleApplyFilter = () => {
    trimList()
    setParams(tempFilters)
  }

  const handleClearTempFilters = () => {
    clearTempFilters()
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
  const handleOpenDetailModal = ({ voucher }) => openDetailModal(voucher._id)

  const handleCloseDetailModal = () => closeDetailModal()

  const handleOpenConfirmDialog = ({ voucher }) =>
    openConfirmDialog(voucher._id)

  const handleCloseConfirmDialog = () => closeConfirmDialog()

  const handleFetchProducts = () => productsQuery.refetch()

  const handleToggleVoucher = async ({ action, voucher }) => {
    const api = {
      enable: enableMutation,
      disable: disableMutation
    }

    if (!api[action]) return

    api[action].mutate({ _id: voucher._id })
  }

  const isVoucherToggleInProgress = (voucher) => {
    const isEnabling =
      enableMutation.isPending && enableMutation.variables?._id === voucher._id

    const isDisabling =
      disableMutation.isPending &&
      disableMutation.variables?._id === voucher._id

    return isEnabling || isDisabling
  }

  const handleChangeTab = (newValue) => {
    trimList()
    const updatedParams = { ...params, status: newValue, page: 1 }
    setParams(updatedParams)
  }

  const handleOpenReasonDialog = ({ voucher }) => {
    openReasonDialog(voucher._id)
  }

  const handleRefresh = () => resetAll()

  return {
    ui: {
      header: {
        isRefreshing: listQuery.isFetching || summaryQuery.isFetching,
        filter: {
          isFetching: listQuery.isFetching
        }
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
        isOpen: isOpenConfirmDialog
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

      filters: {
        params,
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
        handleCloseConfirmDialog
      },

      reasonDialog: {
        handleClose: closeReasonDialog
      }
    }
  }
}
