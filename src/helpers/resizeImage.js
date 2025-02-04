const resizeImage = (url, width, height) => {
  return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill/`)
}

export default resizeImage
