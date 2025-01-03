import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

export const getProductSPUAPI = async (shop_id) => {
  console.log('shop_id:::', shop_id)
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/productSPU/get-product`,
    shop_id
  )
  return res
}
