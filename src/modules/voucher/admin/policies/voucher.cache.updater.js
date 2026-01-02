const addVoucherInList = (oldData, createdVoucher, pageLimit) => {
  if (!oldData?.vouchers || !createdVoucher?._id) return oldData

  return {
    ...oldData,
    vouchers: [createdVoucher, ...oldData.vouchers].slice(0, pageLimit)
  }
}

export { addVoucherInList }
