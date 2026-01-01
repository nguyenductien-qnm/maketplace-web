import VoucherQueryKeys from './voucher.queryKeys'

const invalidateAfterCreateVoucher = () => {}

const invalidateAfterUpdateVoucher = (queryClient, voucherId) => {
  queryClient.invalidateQueries({
    queryKey: VoucherQueryKeys.form(voucherId),
    refetchType: 'none'
  })
}

export { invalidateAfterCreateVoucher, invalidateAfterUpdateVoucher }
