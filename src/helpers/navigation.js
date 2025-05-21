let navigateFunc = null

export const setNavigate = (nav) => {
  navigateFunc = nav
}

export const navigate = (path) => {
  if (navigateFunc) {
    navigateFunc(path)
  } else {
    console.warn('Navigate function chưa được thiết lập!')
  }
}
