import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

export const registerAccountAPI = async (data, loadingClass) => {
  await authorizedAxios.post(`${API_ROOT}/v1/api/auth/sign-up`, data, {
    loadingClass
  })
}

export const forgotPasswordAPI = async (data, loadingClass) => {
  await authorizedAxios.post(`${API_ROOT}/v1/api/auth/forgot-password`, data, {
    loadingClass
  })
}

export const checkTokenResetPasswordAPI = async (data) => {
  const res = await authorizedAxios.get(
    `${API_ROOT}/v1/api/auth/check-token-reset-password/${data.token}`
  )
  return res
}

export const resetPasswordAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/auth/reset-password/${data.token}`,
    data,
    { loadingClass }
  )
  return res
}
