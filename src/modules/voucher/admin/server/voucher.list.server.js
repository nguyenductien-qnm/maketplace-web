import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData
} from '@tanstack/react-query'

import {
  banShopVoucherByAdminAPI,
  createVoucherByAdminAPI,
  enableVoucherByAdminAPI,
  getVoucherApplicableProductsAPI,
  getVoucherDetailByAdminAPI,
  getVoucherFormSnapshotAPI,
  getVoucherSummaryByAdminAPI,
  queryVoucherByAdminAPI,
  unbanShopVoucherByAdminAPI,
  updateVoucherByAdminAPI
} from '~/api/voucher.api'
import VoucherCachePolicy from '../policies/voucher.cache.policy'
import ReferenceCachePolicy from '~/modules/admin/policies/reference.cache.policy'
import VoucherQueryKeys from '../policies/voucher.queryKeys'
import ReferenceQueryKeys from '~/modules/admin/policies/reference.queryKeys'
import {
  invalidateAfterUnbanVoucher,
  invalidateAfterCreateVoucher,
  invalidateAfterUpdateVoucher,
  invalidateAfterVoucherStatusChange
} from '../policies/voucher.invalidate.policy'
import { StatusCodes } from 'http-status-codes'
import { getShopListForFilterAPI } from '~/api/shop.api'
import { getStaffListForFilterAPI } from '~/api/user.api'
import { optimisticToggleVoucherInList } from '../policies/voucher.cache.updater'
import { getAuditLogDetailByAdminAPI } from '~/api/auditLog.api'

// ============================== QUERY ==============================
const useAdminVoucherListQuery = ({ filters, paramsReady }) => {
  return useQuery({
    staleTime: VoucherCachePolicy.list,
    enabled: paramsReady,
    placeholderData: keepPreviousData,
    queryKey: VoucherQueryKeys.list(filters),
    queryFn: async () => {
      const { status, resData } = await queryVoucherByAdminAPI({
        payload: filters
      })
      if (status !== StatusCodes.OK) throw Error()
      return resData.metadata
    }
  })
}

const useAdminVoucherSummaryQuery = () => {
  return useQuery({
    staleTime: VoucherCachePolicy.summary,
    queryKey: VoucherQueryKeys.summary(),
    queryFn: async () => {
      const { status, resData } = await getVoucherSummaryByAdminAPI()
      if (status !== StatusCodes.OK) throw Error()
      return resData.metadata
    }
  })
}

const useAdminVoucherDetailQuery = ({ _id, enabled }) => {
  return useQuery({
    staleTime: VoucherCachePolicy.detail,
    enabled: Boolean(_id) && enabled,
    queryKey: VoucherQueryKeys.detail(_id),
    queryFn: async () => {
      const { status, resData } = await getVoucherDetailByAdminAPI({ _id })
      if (status !== StatusCodes.OK) throw Error()
      return resData.metadata
    }
  })
}

const useVoucherFormSnapshotQuery = ({ _id, enabled }) => {
  return useQuery({
    staleTime: VoucherCachePolicy.formSnapshot,
    enabled: Boolean(_id) && enabled,
    queryKey: VoucherQueryKeys.form(_id),
    queryFn: async () => {
      const { status, resData } = await getVoucherFormSnapshotAPI({ _id })
      if (status !== StatusCodes.OK) throw Error()
      return resData.metadata
    }
  })
}

const useAdminVoucherProductsQuery = ({ _id }) => {
  return useQuery({
    staleTime: VoucherCachePolicy.products,
    enabled: false,
    queryKey: VoucherQueryKeys.products(_id),
    queryFn: async () => {
      const { status, resData } = await getVoucherApplicableProductsAPI({ _id })
      if (status !== StatusCodes.OK) throw Error()
      return resData.metadata
    }
  })
}

const useAdminVoucherAuditLogQuery = ({ _id }) => {
  return useQuery({
    staleTime: VoucherCachePolicy.auditLog,
    enabled: false,
    queryKey: VoucherQueryKeys.auditLog(_id),
    queryFn: async () => {
      const { status, resData } = await getAuditLogDetailByAdminAPI({
        _id,
        entity: 'voucher',
        action: 'banned'
      })
      if (status !== StatusCodes.OK) throw Error()
      return resData.metadata
    }
  })
}

const useAdminShopFilterQuery = () => {
  return useQuery({
    staleTime: ReferenceCachePolicy.shop,
    queryKey: ReferenceQueryKeys.shop(),
    queryFn: async () => {
      const { status, resData } = await getShopListForFilterAPI()
      if (status !== StatusCodes.OK) throw Error()
      return resData.metadata
    }
  })
}

const useAdminStaffFilterQuery = () => {
  return useQuery({
    staleTime: ReferenceCachePolicy.staff,
    queryKey: ReferenceQueryKeys.staff(),
    queryFn: async () => {
      const { status, resData } = await getStaffListForFilterAPI()
      if (status !== StatusCodes.OK) throw Error()
      return resData.metadata
    }
  })
}

// ============================== MUTATION ==============================
const useAdminCreateVoucherMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ payload }) => {
      const { status, resData } = await createVoucherByAdminAPI({ payload })
      if (status !== StatusCodes.CREATED) throw new Error()
      return resData.metadata
    },
    onSuccess: (createdVoucher, variables) => {
      const { pageLimit } = variables
      invalidateAfterCreateVoucher(queryClient, createdVoucher, pageLimit)
    }
  })
}

const useAdminUpdateVoucherMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ _id, payload }) => {
      const { status, resData } = await updateVoucherByAdminAPI({
        _id,
        payload
      })
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata
    },
    onSuccess: (updatedVoucher) => {
      invalidateAfterUpdateVoucher(queryClient, updatedVoucher)
    }
  })
}

const useAdminEnableVoucherMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ _id }) => {
      const { status, resData } = await enableVoucherByAdminAPI({
        _id,
        payload: { action: 'enable' }
      })
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata
    },
    onMutate: async ({ _id }) => {
      await queryClient.cancelQueries({
        queryKey: VoucherQueryKeys.listRoot()
      })

      const previousLists = queryClient.getQueriesData({
        queryKey: VoucherQueryKeys.listRoot()
      })

      queryClient.setQueriesData(
        { queryKey: VoucherQueryKeys.listRoot() },
        (old) => optimisticToggleVoucherInList(old, _id, true)
      )

      return { previousLists }
    },
    onError: (_err, _vars, context) => {
      context?.previousLists?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data)
      })
    },
    onSuccess: (updatedVoucher) => {
      invalidateAfterVoucherStatusChange(queryClient, updatedVoucher)
    }
  })
}

const useAdminDisableVoucherMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ _id }) => {
      const { status, resData } = await enableVoucherByAdminAPI({
        _id,
        payload: { action: 'disable' }
      })
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata
    },

    onMutate: async ({ _id }) => {
      await queryClient.cancelQueries({
        queryKey: VoucherQueryKeys.listRoot()
      })

      const previousLists = queryClient.getQueriesData({
        queryKey: VoucherQueryKeys.listRoot()
      })

      queryClient.setQueriesData(
        { queryKey: VoucherQueryKeys.listRoot() },
        (old) => optimisticToggleVoucherInList(old, _id, false)
      )

      return { previousLists }
    },
    onError: (_err, _vars, context) => {
      context?.previousLists?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data)
      })
    },
    onSuccess: (updatedVoucher) => {
      invalidateAfterVoucherStatusChange(queryClient, updatedVoucher)
    }
  })
}

const useAdminBanVoucherMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ _id, payload }) => {
      const { status, resData } = await banShopVoucherByAdminAPI({
        _id,
        payload
      })
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata
    },
    onSuccess: (updatedVoucher) => {
      invalidateAfterVoucherStatusChange(queryClient, updatedVoucher)
    }
  })
}

const useAdminUnbanVoucherMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ _id, payload }) => {
      const { status, resData } = await unbanShopVoucherByAdminAPI({
        _id,
        payload
      })
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata
    },
    onSuccess: (updatedVoucher) => {
      invalidateAfterUnbanVoucher(queryClient, updatedVoucher)
    }
  })
}

const useAdminVoucherExportMutation = () => {}

export {
  //QUERY
  useAdminVoucherListQuery,
  useAdminVoucherSummaryQuery,
  useAdminVoucherDetailQuery,
  useAdminVoucherProductsQuery,
  useAdminVoucherAuditLogQuery,
  useVoucherFormSnapshotQuery,
  useAdminShopFilterQuery,
  useAdminStaffFilterQuery,
  //MUTATION
  useAdminCreateVoucherMutation,
  useAdminUpdateVoucherMutation,
  useAdminBanVoucherMutation,
  useAdminUnbanVoucherMutation,
  useAdminEnableVoucherMutation,
  useAdminDisableVoucherMutation,
  useAdminVoucherExportMutation
}
