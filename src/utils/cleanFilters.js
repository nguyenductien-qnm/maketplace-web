const cleanFilters = (payload) => {
  return Object.fromEntries(
    Object.entries(payload).filter(
      ([_, v]) => v !== '' && v !== null && v !== undefined
    )
  )
}
export default cleanFilters
