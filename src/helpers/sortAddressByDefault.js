export default (addressList) => {
  return addressList.sort((a, b) => {
    // âm thì a đứng trước
    // dương thì b đứng trước
    // 0 thì giữ nguyên
    return b.default - a.default
  })
}
