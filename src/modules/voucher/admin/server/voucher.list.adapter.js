import { useQueryClient } from '@tanstack/react-query'
import { resetAdminVoucherCache } from '../policies/voucher.invalidate.policy'
import { trimVoucherListCache } from '../policies/voucher.cache.trimmer'

export const useVoucherCacheActions = () => {
  const queryClient = useQueryClient()

  return {
    resetAll: () => resetAdminVoucherCache(queryClient),
    trimList: (max = 9) => trimVoucherListCache(queryClient, max)
  }
}
