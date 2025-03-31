import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

export const checkShopURLAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/shop/check-url`,
    data
  )
  return res
}

export const getShopByOwnerAPI = async () => {
  return await authorizedAxios.get(`${API_ROOT}/v1/api/shop/get-shop-by-owner`)
}

export const updateProfileShopAPI = async (data, loadingClass) => {
  return await authorizedAxios.post(`${API_ROOT}/v1/api/shop/update`, data, {
    loadingClass
  })
}
