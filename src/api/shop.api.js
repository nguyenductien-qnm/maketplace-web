import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

export const checkShopUrlAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/shop/check-url`,
    data,
    { ...TOAST_MODE.NONE }
  )
  return res
}

export const getShopByOwnerAPI = async () => {
  return await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/get-shop-by-owner`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
}

export const updateProfileShopAPI = async (data, loadingClass) => {
  return await authorizedAxios.post(`${API_ROOT}/v1/api/shop/update`, data, {
    loadingClass,
    ...TOAST_MODE.ALL
  })
}
