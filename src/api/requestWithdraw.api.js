import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

const getRequestWithdrawAPI = async () => {
  const res = await authorizedAxios.get(`${API_ROOT}/v1/api/request-withdraw`)
  return res
}
export { getRequestWithdrawAPI }
