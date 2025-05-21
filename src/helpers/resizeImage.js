const prepareImageForStorage = (url, options = {}) => {
  if (!url || !url.includes('/upload/')) return url

  const {
    width,
    height,
    crop = 'fill',
    gravity = 'auto',
    quality = 'auto',
    format = 'auto',
    dpr = 'auto'
  } = options

  let transformations = []

  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  if (crop) transformations.push(`c_${crop}`)
  if (crop === 'fill' && gravity) transformations.push(`g_${gravity}`)
  if (quality) transformations.push(`q_${quality}`)
  if (format) transformations.push(`f_${format}`)
  if (dpr) transformations.push(`dpr_${dpr}`)

  return url.replace('/upload/', `/upload/${transformations.join(',')}/`)
}

const getImageForPreview = (url, options = {}) => {
  if (!url || !url.includes('/upload/')) return url

  const { width, quality = 'auto:low', format = 'auto', dpr = 'auto' } = options

  const transformations = [
    `w_${width}`,
    `q_${quality}`,
    `f_${format}`,
    `dpr_${dpr}`
  ]

  return url.replace('/upload/', `/upload/${transformations.join(',')}/`)
}

const convertThumbToSlide = (thumbUrl) => {
  if (!thumbUrl.includes('/upload/')) return thumbUrl

  const slideTransform = 'w_2000,c_limit,q_auto:good,f_auto,dpr_auto'

  return thumbUrl.replace(/\/upload\/[^/]+/, `/upload/${slideTransform}`)
}

export { prepareImageForStorage, getImageForPreview, convertThumbToSlide }
