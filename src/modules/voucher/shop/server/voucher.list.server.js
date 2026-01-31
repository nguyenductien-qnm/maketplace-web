import VoucherCachePolicy from '../policies/voucher.cache.policy'
import VoucherQueryKeys from '../policies/voucher.queryKeys'
import { getAuditLogDetailByShopAPI } from '~/api/auditLog.api'
import { optimisticToggleVoucherInList } from '../../_shared/cache/voucher.cache.updater'
import { StatusCodes } from 'http-status-codes'
import {
  getVoucherDetailByShopAPI,
  getVoucherSummaryByShopAPI,
  queryVoucherByShopAPI,
  enableVoucherByShopAPI,
  disableVoucherByShopAPI,
  getVoucherApplicableProductsByShopAPI,
  deleteVoucherByShopAPI
} from '~/api/voucher.api'
import {
  useQuery,
  keepPreviousData,
  useQueryClient,
  useMutation
} from '@tanstack/react-query'
import {
  invalidateAfterDeleteVoucher,
  invalidateAfterVoucherStatusChange
} from '../policies/voucher.invalidate.policy'

// ============================== QUERY ==============================
const useShopVoucherListQuery = ({ filters, paramsReady }) => {
  return useQuery({
    staleTime: VoucherCachePolicy.list,
    enabled: paramsReady,
    placeholderData: keepPreviousData,
    queryKey: VoucherQueryKeys.list(filters),
    queryFn: async () => {
      const { status, resData } = await queryVoucherByShopAPI({
        payload: filters
      })
      if (status !== StatusCodes.OK) throw Error()
      return resData.metadata
    }
  })
}

const useShopVoucherSummaryQuery = () => {
  return useQuery({
    staleTime: VoucherCachePolicy.summary,
    queryKey: VoucherQueryKeys.summary(),
    queryFn: async () => {
      const { status, resData } = await getVoucherSummaryByShopAPI()
      if (status !== StatusCodes.OK) throw Error()
      return resData.metadata
    }
  })
}

const useShopVoucherDetailQuery = ({ _id, enabled }) => {
  return useQuery({
    staleTime: VoucherCachePolicy.detail,
    enabled: Boolean(_id) && enabled,
    queryKey: VoucherQueryKeys.detail(_id),
    queryFn: async () => {
      const { status, resData } = await getVoucherDetailByShopAPI({ _id })
      if (status !== StatusCodes.OK) throw Error()
      return resData.metadata
    }
  })
}

const useShopVoucherProductsQuery = ({ _id }) => {
  return useQuery({
    staleTime: VoucherCachePolicy.products,
    enabled: false,
    queryKey: VoucherQueryKeys.products(_id),
    queryFn: async () => {
      const { status, resData } = await getVoucherApplicableProductsByShopAPI({
        _id
      })
      if (status !== StatusCodes.OK) throw Error()
      return resData.metadata
    }
  })
}

const useShopVoucherAuditLogQuery = ({ _id, enabled }) => {
  return useQuery({
    staleTime: VoucherCachePolicy.auditLog,
    enabled: Boolean(_id) && enabled,
    queryKey: VoucherQueryKeys.auditLog(_id),
    queryFn: async () => {
      const { status, resData } = await getAuditLogDetailByShopAPI({
        _id,
        entity: 'voucher',
        action: 'banned'
      })
      if (status !== StatusCodes.OK) throw Error()
      return resData.metadata
    }
  })
}

// ============================== MUTATION ==============================
const useShopEnableVoucherMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ _id }) => {
      const { status, resData } = await enableVoucherByShopAPI({
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

const useShopDisableVoucherMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ _id }) => {
      const { status, resData } = await disableVoucherByShopAPI({
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

const useShopDeleteVoucherMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ _id }) => {
      const { status } = await deleteVoucherByShopAPI({ _id })
      if (status !== StatusCodes.OK) throw new Error()
      return
    },
    onSuccess: () => invalidateAfterDeleteVoucher(queryClient)
  })
}

export {
  //===== QUERY =====
  useShopVoucherListQuery,
  useShopVoucherSummaryQuery,
  useShopVoucherDetailQuery,
  useShopVoucherProductsQuery,
  useShopVoucherAuditLogQuery,
  //===== MUTATION =====
  useShopEnableVoucherMutation,
  useShopDisableVoucherMutation,
  useShopDeleteVoucherMutation
}
