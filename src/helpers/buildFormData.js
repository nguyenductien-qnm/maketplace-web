const buildFormData = (data, fields) => {
  const formData = new FormData()

  const appendField = (key, value) => {
    if (value instanceof File) {
      formData.append(key, value)
    } else if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value))
    } else {
      formData.append(key, value || '')
    }
  }

  if (fields && fields.length > 0) {
    fields.forEach((field) => {
      appendField(field, data[field])
    })
  } else {
    Object.keys(data).forEach((field) => {
      appendField(field, data[field])
    })
  }

  return formData
}

export default buildFormData
