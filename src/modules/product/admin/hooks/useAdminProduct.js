import {
  useAdminProductListQuery,
  useAdminProductSummaryQuery,
  useAdminProductDetailQuery,
  useAdminProductAuditLogQuery,
  useAdminBanProductMutation,
  useAdminUnbanProductMutation,
  useAdminRejectProductMutation,
  useAdminApproveProductMutation
} from '../server/product.list.server'
import useCustomSearchParams from '~/hooks/common/searchParam.hook'
import { useEffect } from 'react'
import { useAdminProductStore } from '../state/product.list.state'
import {
  PRODUCT_PAGE_TITLE,
  PRODUCT_REASON_CONTENT
} from '../constants/product.constant'
import { useAdminProductCacheActions } from '../server/product.list.adapter'
import {
  useAdminShopFilterQuery,
  useAdminCategoryQuery
} from '~/modules/admin/shared/server/reference.server'

export const useAdminProduct = () => {
  const [params, paramsReady, setParams] = useCustomSearchParams({
    defaultParams: { status: 'ALL' }
  })

  const {
    commandAction,
    selectedProductId,
    isOpenReasonModal,
    isOpenDetailModal,
    tempFilters,
    openDetailModal,
    closeDetailModal,
    openReasonModal,
    closeReasonModal,
    setTempFilters,
    updateTempFilter,
    clearTempFilters
  } = useAdminProductStore()

  const { resetAll, trimList } = useAdminProductCacheActions()

  useEffect(() => {
    setTempFilters(params)
  }, [params])

  const listQuery = useAdminProductListQuery({ filters: params, paramsReady })

  const summaryQuery = useAdminProductSummaryQuery()

  const detailQuery = useAdminProductDetailQuery({
    _id: selectedProductId,
    enabled: isOpenDetailModal
  })

  const auditLogQuery = useAdminProductAuditLogQuery({
    _id: selectedProductId,
    action: detailQuery?.data?.product_status
  })

  const shopQuery = useAdminShopFilterQuery()

  const categoryQuery = useAdminCategoryQuery()

  const banMutation = useAdminBanProductMutation()

  const unbanMutation = useAdminUnbanProductMutation()

  const approveMutation = useAdminApproveProductMutation()

  const rejectMutation = useAdminRejectProductMutation()

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

  const handleOpenDetailModal = ({ product }) => openDetailModal(product._id)

  const handleCloseDetailModal = () => closeDetailModal()

  // ============================== HANDLER FILTER ==============================
  const handleFetchAuditLog = () => {
    auditLogQuery.refetch()
  }

  const handleBanProduct = (data) => {
    if (!selectedProductId) return

    banMutation.mutate(
      {
        _id: selectedProductId,
        payload: { action: 'ban', reason: data.reason }
      },
      { onSuccess: () => closeReasonModal() }
    )
  }

  const handleUnbanProduct = (data) => {
    if (!selectedProductId) return

    unbanMutation.mutate(
      {
        _id: selectedProductId,
        payload: { action: 'unban', reason: data.reason }
      },
      { onSuccess: () => closeReasonModal() }
    )
  }

  const handleRejectProduct = (data) => {
    if (!selectedProductId) return

    rejectMutation.mutate(
      {
        _id: selectedProductId,
        payload: { action: 'reject', reason: data.reason }
      },
      { onSuccess: () => closeReasonModal() }
    )
  }

  const handleOpenReasonModal = ({ action, product }) => {
    const { _id } = product
    openReasonModal(_id, action)
  }

  const handleCloseReasonModal = () => {
    if (
      banMutation.isPending ||
      unbanMutation.isPending ||
      rejectMutation.isPending
    )
      return
    closeReasonModal()
  }

  const handleRefresh = () => resetAll()

  const PRODUCT_MODERATION_HANDLERS = {
    ban: handleBanProduct,
    unban: handleUnbanProduct,
    reject: handleRejectProduct
  }

  return {
    ui: {
      header: {
        pageTitle: PRODUCT_PAGE_TITLE[params.status],
        isRefreshing: listQuery.isFetching
      },

      summary: { isLoading: summaryQuery.isLoading },

      filter: { isFetching: listQuery.isFetching },

      table: {
        isLoading: listQuery.isLoading,
        isFetching: listQuery.isFetching,
        page: params.page,
        limit: params.limit
      },

      detailModal: {
        isOpen: isOpenDetailModal,
        isLoadingDetail: detailQuery.isFetching,
        isLoadingAuditLog: auditLogQuery.isFetching
      },

      reasonModal: {
        isOpen: isOpenReasonModal,
        isSubmitting:
          banMutation.isPending ||
          unbanMutation.isPending ||
          rejectMutation.isPending,
        ...PRODUCT_REASON_CONTENT[commandAction]
      }
    },
    data: {
      table: {
        products: listQuery.data?.products ?? [],
        count: listQuery.data?.count ?? 0
      },

      summary: summaryQuery.data,

      detailModal: {
        product: detailQuery.data,
        log: auditLogQuery.data
      },

      filters: {
        params,
        tempFilters,
        shops: shopQuery.data ?? [],
        categories: categoryQuery.data ?? []
      }
    },

    handler: {
      header: { handleRefresh },

      filter: {
        handleApplyFilter,
        handleRemoveParam,
        handleClearAllFilter,
        handleClearTempFilters,
        handleFilterChange
      },

      table: {
        row: {
          handleOpenDetailModal,
          handleOpenReasonModal
        },
        handleChangePage,
        handleChangeRowsPerPage
      },

      detailModal: {
        handleClose: handleCloseDetailModal,
        handleFetchAuditLog
      },

      reasonModal: {
        onsubmit: PRODUCT_MODERATION_HANDLERS[commandAction],
        handleClose: handleCloseReasonModal
      }
    }
  }
}
