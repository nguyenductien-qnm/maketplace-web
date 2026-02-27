import {
  useQuery,
  useQueryClient,
  useMutation,
  keepPreviousData
} from '@tanstack/react-query'
import ProductCachePolicy from '../policies/product.cache.policy'
import ProductQueryKeys from '../policies/product.queryKeys'
import ReferenceCachePolicy from '~/modules/_shared/admin/policies/reference.cache.policy'
import ReferenceQueryKeys from '~/modules/_shared/admin/policies/reference.queryKeys'
import {
  getProductDetailByAdminAPI,
  getProductSummaryByAdminAPI,
  queryProductByAdminAPI,
  banProductByAdmin,
  unbanProductByAdmin,
  approveProductByAdmin,
  rejectProductByAdmin
} from '~/api/product.api'
import { StatusCodes } from 'http-status-codes'
import { getAuditLogDetailByAdminAPI } from '~/api/auditLog.api'
import { invalidateAfterUpdateProduct } from '../policies/product.invalidate.policy'

// ============================== QUERY ==============================
const useAdminProductListQuery = ({ filters, paramsReady }) => {
  return useQuery({
    staleTime: ProductCachePolicy.list,
    enabled: paramsReady,
    placeholderData: keepPreviousData,
    queryKey: ProductQueryKeys.list(filters),
    queryFn: async () => {
      const { status, resData } = await queryProductByAdminAPI({
        payload: filters
      })
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata
    }
  })
}

const useAdminProductSummaryQuery = () => {
  return useQuery({
    staleTime: ProductCachePolicy.summary,
    queryKey: ProductQueryKeys.summary(),
    queryFn: async () => {
      const { status, resData } = await getProductSummaryByAdminAPI()
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata
    }
  })
}

const useAdminProductDetailQuery = ({ _id, enabled }) => {
  return useQuery({
    staleTime: ProductCachePolicy.detail,
    enabled: Boolean(_id) && enabled,
    queryKey: ProductQueryKeys.detail(_id),
    queryFn: async () => {
      const { status, resData } = await getProductDetailByAdminAPI({ _id })
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata
    }
  })
}

const useAdminProductAuditLogQuery = ({ _id, action }) => {
  return useQuery({
    staleTime: ProductCachePolicy.auditLog,
    enabled: false,
    queryKey: ProductQueryKeys.auditLog(_id),
    queryFn: async () => {
      const { status, resData } = await getAuditLogDetailByAdminAPI({
        _id,
        entity: 'product',
        action
      })
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata
    }
  })
}

// ============================== COMMAND ==============================
const useAdminBanProductMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ _id, payload }) => {
      const { status, resData } = await banProductByAdmin({
        _id,
        payload
      })
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata
    },
    onSuccess: (updatedProduct) =>
      invalidateAfterUpdateProduct(queryClient, updatedProduct)
  })
}

const useAdminUnbanProductMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ _id, payload }) => {
      const { status, resData } = await unbanProductByAdmin({
        _id,
        payload
      })
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata
    },
    onSuccess: (updatedProduct) =>
      invalidateAfterUpdateProduct(queryClient, updatedProduct)
  })
}

const useAdminApproveProductMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ _id, payload }) => {
      const { status, resData } = await approveProductByAdmin({
        _id,
        payload
      })
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata
    },
    onSuccess: (updatedProduct) =>
      invalidateAfterUpdateProduct(queryClient, updatedProduct)
  })
}

const useAdminRejectProductMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ _id, payload }) => {
      const { status, resData } = await rejectProductByAdmin({
        _id,
        payload
      })
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata
    },
    onSuccess: (updatedProduct) =>
      invalidateAfterUpdateProduct(queryClient, updatedProduct)
  })
}

export {
  //QUERY
  useAdminProductListQuery,
  useAdminProductSummaryQuery,
  useAdminProductDetailQuery,
  useAdminProductAuditLogQuery,
  //MUTATION
  useAdminBanProductMutation,
  useAdminUnbanProductMutation,
  useAdminApproveProductMutation,
  useAdminRejectProductMutation
}
