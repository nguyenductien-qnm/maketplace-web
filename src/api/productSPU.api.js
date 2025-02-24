import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

export const queryProductByOwnerAPI = async (payloads) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/productSPU/query-product-by-owner`,
    payloads
  )
  return res
}
