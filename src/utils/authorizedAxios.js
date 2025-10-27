import axios from 'axios'
import { toast } from 'react-toastify'
import interceptorLoadingElements from './interceptorLoading'
import { refreshTokenAPI } from '~/api/auth.api'
import { clearUserInfo, logoutAPI } from '~/redux/user.slice'
import { TOAST_MODE } from './constants'
let axiosReduxStore

export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore
}

let authorizeAxiosInstance = axios.create()
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10
authorizeAxiosInstance.defaults.withCredentials = true

authorizeAxiosInstance.interceptors.request.use(
  (config) => {
    const loadingClass = config.loadingClass || null
    interceptorLoadingElements(true, loadingClass)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

let refreshTokenPromise = null

authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    const loadingClass = response.config.loadingClass || null
    interceptorLoadingElements(false, loadingClass)

    const shouldShowSuccessToast = response.config?.showToastSuccess
    if (response?.data?.message && shouldShowSuccessToast) {
      toast.success(response.data.message)
    }

    return response
  },
  async (error) => {
    const originalRequest = error.config
    const loadingClass = originalRequest?.loadingClass || null
    interceptorLoadingElements(false, loadingClass)

    const status = error.response?.status
    if (status === 401) {
      axiosReduxStore.dispatch(clearUserInfo())
    }

    if (status === 410 && !originalRequest._retry) {
      originalRequest._retry = true
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then((data) => {
            return data
          })
          .catch((err) => {
            axiosReduxStore.dispatch(
              logoutAPI({ toastMode: { ...TOAST_MODE.ALL } })
            )
            throw err
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }

      return refreshTokenPromise.then(() => {
        return authorizeAxiosInstance(originalRequest)
      })
    }

    const shouldShowErrorToast = originalRequest?.showToastError

    if (shouldShowErrorToast) {
      const data = error.response?.data
      if (data instanceof Blob) {
        data.text().then((text) => {
          const json = JSON.parse(text)
          toast.error(json.message || 'An unexpected error occurred.')
        })
      } else {
        const message = data?.message
        if (message) {
          toast.error(message)
        } else {
          toast.error('An unexpected error occurred.')
        }
      }
    }

    return Promise.reject(error)
  }
)

export const authorizedAxios = authorizeAxiosInstance
