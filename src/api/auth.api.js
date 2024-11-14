import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

export const registerAccountAPI = async (data) => {
  await authorizedAxios.post(`${API_ROOT}/v1/api/auth/sign-up`, data)
}

export const forgotPasswordAPI = async (data) => {
  await authorizedAxios.post(`${API_ROOT}/v1/api/auth/forgot-password`, data)
}

export const checkTokenResetPasswordAPI = async (data) => {
  const res = await authorizedAxios.get(
    `${API_ROOT}/v1/api/auth/check-token-reset-password/${data.token}`
  )
  return res
}

export const resetPasswordAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/auth/reset-password/${data.token}`,
    data
  )
  console.log(res)
  return res
}
