const interceptorLoadingElements = (calling, loadingClass) => {
  if (loadingClass) {
    const element = document.querySelector(loadingClass)
    if (element) {
      if (calling) {
        element.style.opacity = '0.5'
        element.style.pointerEvents = 'none'
      } else {
        element.style.opacity = 'initial'
        element.style.pointerEvents = 'initial'
      }
    }
  }
}
export default interceptorLoadingElements
