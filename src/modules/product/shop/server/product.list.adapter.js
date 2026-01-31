import { useQueryClient } from '@tanstack/react-query'
import ProductQueryKeys from '../policies/product.queryKeys'
import { createProductCacheActions } from '../../_shared/cache/createProductCacheActions'
const useShopProductCacheActions = () => {
  const queryClient = useQueryClient()

  return createProductCacheActions({ queryClient, queryKeys: ProductQueryKeys })
}

export { useShopProductCacheActions }
