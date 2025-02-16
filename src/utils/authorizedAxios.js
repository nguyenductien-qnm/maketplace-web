import axios from 'axios'
import { toast } from 'react-toastify'

const notToast = ['update-quantity-product-cart', 'checkout']

axios.defaults.withCredentials = true

axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    toast.success(response?.data?.message)
    return response
  },
  (error) => {
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
