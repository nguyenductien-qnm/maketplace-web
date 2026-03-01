import ReferenceCachePolicy from '../policies/reference.cache.policy'
import ReferenceQueryKeys from '../policies/reference.queryKeys'
import { useQuery } from '@tanstack/react-query'
import { getStaffListForFilterAPI } from '~/api/user.api'
import { getShopListForFilterAPI } from '~/api/shop.api'
import { StatusCodes } from 'http-status-codes'
import { getCategoryTreeAPI } from '~/api/category.api'

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

const useAdminCategoryQuery = () => {
  return useQuery({
    staleTime: ReferenceCachePolicy.category,
    queryKey: ReferenceQueryKeys.category(),
    queryFn: async () => {
      const { status, resData } = await getCategoryTreeAPI()
      if (status !== StatusCodes.OK) throw Error()
      return resData.metadata
    }
  })
}

export {
  useAdminShopFilterQuery,
  useAdminStaffFilterQuery,
  useAdminCategoryQuery
}
