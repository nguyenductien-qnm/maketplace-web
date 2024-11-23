import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

export const checkShopURLAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/shop/check-url`,
    data
  )
  return res
}
