const formatDateForInput = (date) => {
  const d = new Date(date)
  return d.toISOString().slice(0, 16)
}

export default formatDateForInput
