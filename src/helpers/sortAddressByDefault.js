export default (addressList) => {
  return addressList.sort((a, b) => {
    return b.default - a.default
  })
}
