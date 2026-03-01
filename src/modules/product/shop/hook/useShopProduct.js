import useShopProductState from '../state/product.list.state'
import useCustomSearchParams from '~/hooks/common/searchParam.hook'
import {
  useShopProductListQuery,
  useShopProductSummaryQuery,
  useShopProductDetailQuery,
  useShopProductRevenueQuery,
  useShopProductAuditLogQuery,
  useShopDeleteProductMutation
} from '../server/product.list.server'
import { useShopCategoryQuery } from '~/modules/_shared/shop/server/category.server'
import { buildBanReasonMarkdown } from '~/helpers/buildBanReasonMarkdown'
import { PRODUCT_DELETE_CONFIRM_DIALOG } from '../constants/product.constant'
import { useEffect } from 'react'
import { useShopProductCacheActions } from '../server/product.list.adapter'
const useShopProduct = () => {
  const [params, paramsReady, setParams] = useCustomSearchParams({
    defaultParams: { status: 'ALL' }
  })

  const { trimList, resetAll } = useShopProductCacheActions()

  const {
    tempFilters,
    selectedProductId,
    isOpenDetailModal,
    isOpenConfirmDialog,
    isOpenRevenueModal,
    isOpenReasonDialog,
    openDetailModal,
    closeDetailModal,
    openReasonDialog,
    closeReasonDialog,
    openRevenueModal,
    closeRevenueModal,
    openConfirmDialog,
    closeConfirmDialog,
    setTempFilters,
    updateTempFilter,
    clearTempFilters
  } = useShopProductState()

  useEffect(() => {
    setTempFilters(params)
  }, [params, setTempFilters])

  const listQuery = useShopProductListQuery({ filters: params, paramsReady })

  const summaryQuery = useShopProductSummaryQuery()

  const categoryList = useShopCategoryQuery()

  const detailQuery = useShopProductDetailQuery({
    _id: selectedProductId,
    enabled: isOpenDetailModal
  })

  const revenueQuery = useShopProductRevenueQuery({
    _id: selectedProductId,
    enabled: isOpenRevenueModal
  })

  const auditLogQuery = useShopProductAuditLogQuery({
    _id: selectedProductId,
    enabled: isOpenReasonDialog
  })

  const deleteMutation = useShopDeleteProductMutation({
    _id: selectedProductId
  })

  const handleChangeTab = (newValue) => {
    trimList()
    const updatedParams = { ...params, status: newValue, page: 1 }
    setParams(updatedParams)
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

  const handleOpenConfirmDialog = ({ product }) =>
    openConfirmDialog(product._id)

  const handleOpenReasonDialog = ({ product }) => openReasonDialog(product._id)

  const handleDeleteVoucher = () => {
    console.log('delete')
  }

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

  const handleRefresh = () => resetAll()

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
          limit: params.limit
        }
      },

      detailModal: {
        isOpen: isOpenDetailModal,
        isLoadingDetail: detailQuery.isFetching
      },

      confirmDialog: {
        isOpen: isOpenConfirmDialog,
        isSubmitting: deleteMutation.isPending,
        ...PRODUCT_DELETE_CONFIRM_DIALOG
      },

      reasonDialog: {
        isOpen: isOpenReasonDialog,
        title: 'Product ban reason',
        isLoading: auditLogQuery.isFetching
      }
    },

    data: {
      tab: {
        summary: summaryQuery.data,
        table: {
          products: listQuery.data?.products ?? [],
          count: listQuery.data?.count ?? 0
        }
      },

      detailModal: {
        product: detailQuery.data
      },

      filter: {
        tempFilters,
        categories: categoryList.data
      },

      auditLog: {
        content: buildBanReasonMarkdown(auditLogQuery.data)
      }
    },

    handler: {
      header: {
        handleRefresh,
        filter: {
          handleApplyFilter,
          handleClearTempFilters,
          handleFilterChange
        }
      },

      tab: {
        handleChangeTab,
        table: {
          row: {
            handleOpenDetailModal,
            handleOpenConfirmDialog,
            handleOpenReasonDialog
          },
          handleChangePage,
          handleChangeRowsPerPage
        }
      },

      detailModal: {
        handleClose: closeDetailModal
      },

      confirmDialog: {
        handleClose: closeConfirmDialog,
        handleConfirm: handleDeleteVoucher
      },

      reasonDialog: {
        handleClose: closeReasonDialog
      }
    }
  }
}
export default useShopProduct
