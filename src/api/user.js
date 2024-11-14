import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

const getUserInfoAPI = async () => {
  const res = await authorizedAxios.get(`${API_ROOT}/v1/api/user`)
  return res
}

const changePasswordAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/auth/change-password`,
    data
  )
  return res
}

export { getUserInfoAPI, changePasswordAPI }
