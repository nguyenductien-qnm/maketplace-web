import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

const getShopTransactionsAPI = async () => {
  const res = await authorizedAxios.get(`${API_ROOT}/v1/api/transaction/shop`)
  return res
}

const getUserTransactionsAPI = async () => {
  const res = await authorizedAxios.get(`${API_ROOT}/v1/api/transaction/user`)
  return res
}

export { getShopTransactionsAPI, getUserTransactionsAPI }
