import { useQueryClient } from '@tanstack/react-query'
import { createCategoryCacheActions } from '../../_shared/server/useCategoryCacheActions'
import CategoryQueryKeys from '../policies/category.queryKeys'

export const useAdminCategoryCacheActions = () => {
  const queryClient = useQueryClient()

  return createCategoryCacheActions({
    queryClient,
    queryKeys: CategoryQueryKeys
  })
}
