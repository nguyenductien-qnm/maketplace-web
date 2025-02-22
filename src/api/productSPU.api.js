import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

export const getProductSPUAPI = async () => {
  const res = await authorizedAxios.get(
    `${API_ROOT}/v1/api/productSPU/get-product`
  )
  return res
}
