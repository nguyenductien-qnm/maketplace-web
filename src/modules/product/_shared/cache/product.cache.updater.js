const patchProductInList = (oldData, updatedProduct) => {
  if (!oldData?.products || !updatedProduct?._id) return oldData

  return {
    ...oldData,
    products: oldData.products.map((v) =>
      v._id === updatedProduct._id ? { ...v, ...updatedProduct } : v
    )
  }
}

export { patchProductInList }
