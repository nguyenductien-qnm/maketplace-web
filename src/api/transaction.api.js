import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const getShopTransactionsAPI = async () => {
  const res = await authorizedAxios.get(`${API_ROOT}/v1/api/transaction/shop`, {
    ...TOAST_MODE.ONLY_ERROR
  })
  return res
}

const getUserTransactionsAPI = async () => {
  const res = await authorizedAxios.get(`${API_ROOT}/v1/api/transaction/user`, {
    ...TOAST_MODE.ONLY_ERROR
  })
  return res
}

export { getShopTransactionsAPI, getUserTransactionsAPI }
