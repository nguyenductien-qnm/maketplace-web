import axios from 'axios'
import { toast } from 'react-toastify'
import interceptorLoadingElements from './interceptorLoading'

const notToast = ['update-quantity-product-cart', 'checkout', 'check-url']

axios.defaults.withCredentials = true

axios.interceptors.request.use(
  (config) => {
    const loadingClass = config.loadingClass || null
    interceptorLoadingElements(true, loadingClass)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    const loadingClass = response.config.loadingClass || null
    interceptorLoadingElements(false, loadingClass)
    toast.success(response?.data?.message)
    return response
  },
  (error) => {
    const loadingClass = error.config.loadingClass || null
    interceptorLoadingElements(false, loadingClass)
    const messages = error.response?.data?.message

    //   if (Array.isArray(messages)) {
    //     messages.forEach((msg) => toast.error(msg))
    //   } else if (messages) {
    //     toast.error(messages)
    //   } else {
    //     toast.error('An unexpected error occurred.')
    //   }

    //   return Promise.reject(error.response)
    // }
    if (
      error.config?.url &&
      !notToast.some((path) => error.config.url.includes(path))
    ) {
      if (Array.isArray(messages)) {
        messages.forEach((msg) => toast.error(msg))
      } else if (messages) {
        toast.error(messages)
      } else {
        toast.error('An unexpected error occurred.')
      }
    }

    return Promise.reject(error.response)
  }
)

export const authorizedAxios = axios
