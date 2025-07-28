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

export const getShopByUserAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/shop/get-shop-by-user`,
    data,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return res
}

export const queryShopByAdminAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/shop/query-shop-by-admin`,
    data,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return res
}

export const banShopAPI = async (data) => {
  const res = await authorizedAxios.post(`${API_ROOT}/v1/api/shop/ban`, data, {
    ...TOAST_MODE.ALL
  })
  return res
}

export const unbanShopAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/shop/unban`,
    data,
    {
      ...TOAST_MODE.ALL
    }
  )
  return res
}

export const acceptShopAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/shop/accept`,
    data,
    {
      ...TOAST_MODE.ALL
    }
  )
  return res
}

export const rejectShopAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/shop/reject`,
    data,
    {
      ...TOAST_MODE.ALL
    }
  )
  return res
}

export const getShopDetailForAdminAPI = async ({ _id }) => {
  const res = await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/detail-for-admin?_id=${_id}`,
    {
      ...TOAST_MODE.ALL
    }
  )
  return res
}

export const getShopListForFilterAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/get-shop-list-for-filter`,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

export const exportShopDataAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/shop/export`,
    data,
    {
      ...TOAST_MODE.ALL,
      responseType: 'blob'
    }
  )

  const blob = res.data
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'shops.csv'
  a.click()
  window.URL.revokeObjectURL(url)

  return res
}
