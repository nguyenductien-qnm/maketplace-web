export const API_ROOT = 'http://localhost:3000'

export const TOAST_MODE = {
  ALL: { showToastSuccess: true, showToastError: true },
  ONLY_ERROR: { showToastSuccess: false, showToastError: true },
  ONLY_SUCCESS: { showToastSuccess: true, showToastError: false },
  NONE: { showToastSuccess: false, showToastError: false }
}
