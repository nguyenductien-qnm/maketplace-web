import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

const getTransactionsAPI = async () => {
  const res = await authorizedAxios.get(`${API_ROOT}/v1/api/transaction`)
  return res
}

export { getTransactionsAPI }
