import VoucherQueryKeys from './voucher.queryKeys'
import { addVoucherInList, patchVoucherInList } from './voucher.cache.updater'

const invalidateAfterCreateVoucher = (
  queryClient,
  createdVoucher,
  pageLimit
) => {
  queryClient.setQueriesData(
    { queryKey: VoucherQueryKeys.listRoot() },
    (oldData) => addVoucherInList(oldData, createdVoucher, pageLimit)
  )

  queryClient.invalidateQueries({
    queryKey: VoucherQueryKeys.listRoot(),
    refetchType: 'none'
  })

  queryClient.invalidateQueries({
    queryKey: VoucherQueryKeys.summary()
  })
}

const invalidateAfterUpdateVoucher = (queryClient, updatedVoucher) => {
  queryClient.setQueriesData(
    { queryKey: VoucherQueryKeys.listRoot() },
    (oldData) => patchVoucherInList(oldData, updatedVoucher)
  )

  queryClient.invalidateQueries({
    queryKey: VoucherQueryKeys.detail(updatedVoucher._id)
  })

  queryClient.invalidateQueries({
    queryKey: VoucherQueryKeys.form(updatedVoucher._id),
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

const invalidateAfterUnbanVoucher = (queryClient, updatedVoucher) => {
  invalidateAfterVoucherStatusChange(queryClient, updatedVoucher)

  queryClient.removeQueries({
    queryKey: VoucherQueryKeys.auditLog(updatedVoucher._id)
  })
}

const invalidateAfterDeleteVoucher = (queryClient) => {
  queryClient.invalidateQueries({
    queryKey: VoucherQueryKeys.listRoot
  })

  queryClient.invalidateQueries({
    queryKey: VoucherQueryKeys.summary()
  })
}

const resetAdminVoucherCache = (queryClient) => {
  queryClient.invalidateQueries({
    queryKey: VoucherQueryKeys.voucherRoot(),
    refetchType: 'active'
  })
}

export {
  invalidateAfterCreateVoucher,
  invalidateAfterUpdateVoucher,
  invalidateAfterVoucherStatusChange,
  invalidateAfterUnbanVoucher,
  resetAdminVoucherCache
}
