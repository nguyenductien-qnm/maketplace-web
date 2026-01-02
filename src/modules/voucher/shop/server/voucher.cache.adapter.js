import { useQueryClient } from '@tanstack/react-query'
import { createVoucherCacheActions } from '../../_shared/server/useVoucherCacheActions'
import VoucherQueryKeys from '../policies/voucher.queryKeys'

export const useShopVoucherCacheActions = () => {
  const queryClient = useQueryClient()

  return createVoucherCacheActions({
    queryClient,
    queryKeys: VoucherQueryKeys
  })
}
