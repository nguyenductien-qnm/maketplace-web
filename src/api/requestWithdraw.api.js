import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

const getShopRequestWithdrawAPI = async () => {
  const res = await authorizedAxios.get(
    `${API_ROOT}/v1/api/request-withdraw/shop`
  )
  return res
}

const getUserRequestWithdrawAPI = async () => {
  const res = await authorizedAxios.get(
    `${API_ROOT}/v1/api/request-withdraw/user`
  )
  return res
}

export { getShopRequestWithdrawAPI, getUserRequestWithdrawAPI }
