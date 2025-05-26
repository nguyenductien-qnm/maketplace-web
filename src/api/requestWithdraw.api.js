import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const getShopRequestWithdrawAPI = async () => {
  const res = await authorizedAxios.get(
    `${API_ROOT}/v1/api/request-withdraw/shop`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

const getUserRequestWithdrawAPI = async () => {
  const res = await authorizedAxios.get(
    `${API_ROOT}/v1/api/request-withdraw/user`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

export { getShopRequestWithdrawAPI, getUserRequestWithdrawAPI }
