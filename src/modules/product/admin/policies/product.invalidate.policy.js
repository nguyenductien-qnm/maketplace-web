import { patchProductInList } from '../../_shared/cache/product.cache.updater'
import ProductQueryKeys from './product.queryKeys'

const invalidateAfterUpdateProduct = (queryClient, updatedProduct) => {
  queryClient.setQueriesData(
    { queryKey: ProductQueryKeys.listRoot(), type: 'active' },
    (oldData) => patchProductInList(oldData, updatedProduct)
  )

  queryClient.invalidateQueries({
    queryKey: ProductQueryKeys.listRoot(),
    refetchType: 'none'
  })

  queryClient.invalidateQueries({
    queryKey: ProductQueryKeys.summary()
  })

  queryClient.invalidateQueries({
    queryKey: ProductQueryKeys.detail(updatedProduct._id)
  })

  queryClient.removeQueries({
    queryKey: ProductQueryKeys.auditLog(updatedProduct._id)
  })
}

export { invalidateAfterUpdateProduct }
