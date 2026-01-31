import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import ProductCachePolicy from '../policies/product.cache.policy'
import {
  deleteProductByShopAPI,
  getProductDetailByShopAPI,
  getProductMetricsByShopAPI,
  getProductSummaryByShopAPI,
  queryProductByShopAPI
} from '~/api/product.api'
import { StatusCodes } from 'http-status-codes'
import { getAuditLogDetailByShopAPI } from '~/api/auditLog.api'
import ProductQueryKeys from '../policies/product.queryKeys'

// ============================== QUERY ==============================
const useShopProductListQuery = ({ filters, paramsReady }) => {
  return useQuery({
    staleTime: ProductCachePolicy.list,
    enabled: paramsReady,
    placeholderData: keepPreviousData,
    queryKey: ProductQueryKeys.list(filters),
    queryFn: async () => {
      const { status, resData } = await queryProductByShopAPI({
        payload: filters
      })
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata
    }
  })
}

const useShopProductSummaryQuery = () => {
  return useQuery({
    staleTime: ProductCachePolicy.summary,
    queryKey: ProductQueryKeys.summary(),
    queryFn: async () => {
      const { status, resData } = await getProductSummaryByShopAPI()
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata
    }
  })
}

const useShopProductDetailQuery = ({ _id, enabled }) => {
  return useQuery({
    staleTime: ProductCachePolicy.detail,
    enabled: Boolean(_id) && enabled,
    queryKey: ProductQueryKeys.detail(_id),
    queryFn: async () => {
      const { status, resData } = await getProductDetailByShopAPI({ _id })
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata
    }
  })
}

const useShopProductRevenueQuery = ({ _id, enabled }) => {
  return useQuery({
    staleTime: ProductCachePolicy.auditLog,
    enabled: Boolean(_id) && enabled,
    queryKey: ProductQueryKeys.auditLog(_id),
    queryFn: async () => {
      const { status, resData } = await getProductMetricsByShopAPI()
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata
    }
  })
}

const useShopProductAuditLogQuery = ({ _id, enabled }) => {
  return useQuery({
    staleTime: ProductCachePolicy.auditLog,
    enabled: Boolean(_id) && enabled,
    queryKey: ProductQueryKeys.auditLog(_id),
    queryFn: async () => {
      const { status, resData } = await getAuditLogDetailByShopAPI({
        _id,
        entity: 'product',
        action: 'banned'
      })
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata
    }
  })
}

// ============================== MUTATION ==============================
const useShopDeleteProductMutation = ({ _id }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      const { status } = await deleteProductByShopAPI({ _id })
      if (status !== StatusCodes.OK) throw new Error()
      return
    },
    onSuccess: () => {}
  })
}

export {
  //===== QUERY =====
  useShopProductListQuery,
  useShopProductSummaryQuery,
  useShopProductDetailQuery,
  useShopProductRevenueQuery,
  useShopProductAuditLogQuery,
  //===== MUTATION =====
  useShopDeleteProductMutation
}
