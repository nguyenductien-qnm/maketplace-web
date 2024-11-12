import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

export const registerAccountAPI = async ({ email }) => {
  await authorizedAxios.post(`${API_ROOT}/v1/api/auth/sign-up`, { email })
}

export const setupAccount = async () => {
  await authorizedAxios.post(`${API_ROOT}/v1/api/auth/setup`, data)
}

export const verifyAccount = async (data) => {
  const res = await authorizedAxios.get(
    `${API_ROOT}/v1/api/auth/verify-account/${data.otp}`
  )
  return res.status
}

export const forgotPassword = async (data) => {
  await authorizedAxios.post(`${API_ROOT}/v1/api/auth/forgot-password`, data)
}

export const checkTokenResetPassword = async (data) => {
  const response = await authorizedAxios.get(
    `${API_ROOT}/v1/api/auth/check-token-reset-password/${data.token}`
  )
  return response
}

export const resetPassword = async (data) => {
  const response = await authorizedAxios.post(
    `${API_ROOT}/v1/api/auth/reset-password/${data.token}`,
    data
  )
  console.log('response:::::', response)
  return response
}
