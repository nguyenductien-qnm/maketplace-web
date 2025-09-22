const buildFormData = (data, fields) => {
  const formData = new FormData()
  fields.forEach((field) => {
    const value = data[field]
    if (!value) return

    if (value instanceof File) {
      formData.append(field, value)
    } else if (typeof value === 'object') {
      formData.append(field, JSON.stringify(value))
    } else {
      formData.append(field, value)
    }
  })

  return formData
}

export default buildFormData
