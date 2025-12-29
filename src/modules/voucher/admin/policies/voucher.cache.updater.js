const patchVoucherInList = (oldData, updatedVoucher) => {
  if (!oldData?.vouchers || !updatedVoucher?._id) return oldData

  return {
    ...oldData,
    vouchers: oldData.vouchers.map((v) =>
      v._id === updatedVoucher._id ? { ...v, ...updatedVoucher } : v
    )
  }
}

const addVoucherInList = (oldData, createdVoucher, pageLimit) => {
  if (!oldData?.vouchers || !createdVoucher?._id) return oldData

  return {
    ...oldData,
    vouchers: [createdVoucher, ...oldData.vouchers].slice(0, pageLimit)
  }
}

const optimisticToggleVoucherInList = (oldData, voucherId, nextStatus) => {
  if (!oldData?.vouchers) return oldData

  return {
    ...oldData,
    vouchers: oldData.vouchers.map((v) =>
      v._id === voucherId ? { ...v, is_enabled: nextStatus } : v
    )
  }
}

export { addVoucherInList, patchVoucherInList, optimisticToggleVoucherInList }
