const optimisticToggleVoucherInList = (oldData, voucherId, nextStatus) => {
  if (!oldData?.vouchers) return oldData

  return {
    ...oldData,
    vouchers: oldData.vouchers.map((v) =>
      v._id === voucherId ? { ...v, is_enabled: nextStatus } : v
    )
  }
}

const patchVoucherInList = (oldData, updatedVoucher) => {
  if (!oldData?.vouchers || !updatedVoucher?._id) return oldData

  return {
    ...oldData,
    vouchers: oldData.vouchers.map((v) =>
      v._id === updatedVoucher._id ? { ...v, ...updatedVoucher } : v
    )
  }
}

export { optimisticToggleVoucherInList, patchVoucherInList }
