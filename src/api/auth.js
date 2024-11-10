import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

// export const checkLogin = async ({}) => {}

export const registerAccountAPI = async ({ email }) => {
  authorizedAxios.post(`${API_ROOT}/v1/api/auth/sign-up`, { email })
}

export const setupAccount = async () => {
  authorizedAxios.post(`${API_ROOT}/v1/api/auth/setup`, data).then((res) => {
    console.log(res)
  })
}

export const verifyAccount = async (data) => {
  const res = await authorizedAxios.get(
    `${API_ROOT}/v1/api/auth/verify-account/${data.otp}`
  )
  return res.status
}
