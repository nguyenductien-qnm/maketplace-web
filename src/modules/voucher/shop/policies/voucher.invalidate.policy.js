import { patchVoucherInList } from '../../_shared/cache/voucher.cache.updater'
import VoucherQueryKeys from './voucher.queryKeys'

const invalidateAfterCreateVoucher = () => {}

const invalidateAfterUpdateVoucher = (queryClient, voucherId) => {
  queryClient.invalidateQueries({
    queryKey: VoucherQueryKeys.form(voucherId),
    refetchType: 'none'
  })
}

const invalidateAfterVoucherStatusChange = (queryClient, updatedVoucher) => {
  queryClient.setQueriesData(
    { queryKey: VoucherQueryKeys.listRoot() },
    (oldData) => patchVoucherInList(oldData, updatedVoucher)
  )

  queryClient.invalidateQueries({
    queryKey: VoucherQueryKeys.listRoot(),
    refetchType: 'none'
  })

  queryClient.invalidateQueries({
    queryKey: VoucherQueryKeys.summary()
  })

  queryClient.invalidateQueries({
    queryKey: VoucherQueryKeys.detail(updatedVoucher._id)
  })
}

export {
  invalidateAfterCreateVoucher,
  invalidateAfterUpdateVoucher,
  invalidateAfterVoucherStatusChange
}
