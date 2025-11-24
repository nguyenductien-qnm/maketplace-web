let navigateFunc = null

export const setNavigate = (nav) => {
  navigateFunc = nav
}

export const navigate = (path) => {
  if (navigateFunc) {
    navigateFunc(path)
  }
}
