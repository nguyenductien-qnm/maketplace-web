import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'
import { TOAST_MODE } from '~/utils/constants'

export const registerAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/auth/register`,
    data,
    {
      loadingClass,
      ...TOAST_MODE.ALL
    }
  )
  return res
}

export const forgotPasswordAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/auth/forgot-password`,
    data,
    {
      loadingClass,
      ...TOAST_MODE.ALL
    }
  )
  return res
}

export const checkTokenResetPasswordAPI = async (data) => {
  const res = await authorizedAxios.get(
    `${API_ROOT}/v1/api/auth/check-token-reset-password/${data.token}`,
    {
      ...TOAST_MODE.NONE
    }
  )
  return res
}

export const resetPasswordAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/auth/reset-password/${data.token}`,
    data,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return res
}

export const refreshTokenAPI = async () => {
  const res = await authorizedAxios.get(
    `${API_ROOT}/v1/api/auth/refresh-token`,
    { ...TOAST_MODE.NONE }
  )
  return res
}
