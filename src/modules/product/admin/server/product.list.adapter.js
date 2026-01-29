import { useQueryClient } from '@tanstack/react-query'
import ProductQueryKeys from '../policies/product.queryKeys'
import { createProductCacheActions } from '../../_shared/cache/createProductCacheActions'
const useAdminProductCacheActions = () => {
  const queryClient = useQueryClient()

  return createProductCacheActions({ queryClient, queryKeys: ProductQueryKeys })
}

export { useAdminProductCacheActions }
