import { useQuery } from '@tanstack/react-query'
import ReferenceQueryKeys from '../policies/reference.queryKeys'
import ReferenceCachePolicy from '../policies/reference.cache.policy'
import { getShopCategoriesAPI } from '~/api/category.api'

const useShopCategoryQuery = () => {
  return useQuery({
    staleTime: ReferenceQueryKeys.shopCategory(),
    queryKey: ReferenceCachePolicy.shopCategory,
    queryFn: async () => {
      const { status, resData } = await getShopCategoriesAPI()
      if (status !== 200) throw new Error()
      return resData.metadata
    }
  })
}

export { useShopCategoryQuery }
