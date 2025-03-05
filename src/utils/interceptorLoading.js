const interceptorLoadingElements = (calling, loadingClass) => {
  const classList = Array.isArray(loadingClass) ? loadingClass : [loadingClass]
  classList.forEach((cls) => {
    document.querySelectorAll(cls).forEach((element) => {
      element.style.opacity = calling ? '0.5' : 'initial'
      element.style.pointerEvents = calling ? 'none' : 'initial'
    })
  })
}

export default interceptorLoadingElements
