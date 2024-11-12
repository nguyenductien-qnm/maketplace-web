import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

const getUserInfoAPI = async () => {
  const response = await authorizedAxios.get(`${API_ROOT}/v1/api/user`)
  return response
}

export { getUserInfoAPI }
