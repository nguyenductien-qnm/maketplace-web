import { patchVoucherInList } from '../../_shared/cache/voucher.cache.updater'
import VoucherQueryKeys from './voucher.queryKeys'

const invalidateAfterCreateVoucher = (queryClient) => {
  queryClient.invalidateQueries({
    queryKey: VoucherQueryKeys.listRoot(),
    refetchType: 'none'
  })

  queryClient.invalidateQueries({
    queryKey: VoucherQueryKeys.summary(),
    refetchType: 'none'
  })
}

const invalidateAfterUpdateVoucher = (queryClient, voucherId) => {
  if (!voucherId) return

  const keys = [
    VoucherQueryKeys.form(voucherId),
    VoucherQueryKeys.detail(voucherId),
    VoucherQueryKeys.products(voucherId)
  ]

  keys.forEach((queryKey) => {
    queryClient.invalidateQueries({
      queryKey,
      refetchType: 'none'
    })
  })
}

const invalidateAfterDeleteVoucher = (queryClient) => {
  queryClient.invalidateQueries({
    queryKey: VoucherQueryKeys.root(),
    refetchType: 'active'
  })
}

const invalidateAfterVoucherStatusChange = (queryClient, updatedVoucher) => {
  if (!updatedVoucher?._id) return

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
    queryKey: VoucherQueryKeys.detail(updatedVoucher._id),
    refetchType: 'none'
  })
}

export {
  invalidateAfterCreateVoucher,
  invalidateAfterUpdateVoucher,
  invalidateAfterDeleteVoucher,
  invalidateAfterVoucherStatusChange
}
