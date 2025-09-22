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
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/shop`,
    { ...TOAST_MODE.ONLY_ERROR }
  )

  return { status, resData: data }
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

const getShopStatusByOwnerAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/user/shop/status`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const checkBasicShopInfoAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/user/shop/check-basic-info`,
    payload,
    { ...TOAST_MODE.NONE, loadingClass }
  )
  return { status, resData: data }
}

const checkBusinessLicenseAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/user/shop/check-business-license`,
    payload,
    { ...TOAST_MODE.NONE, loadingClass }
  )
  return { status, resData: data }
}

// ============================ ADMIN ============================

const queryShopByAdminAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/shop/query`,
    payload,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const banShopByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/shop/update-status/ban`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
}

const unbanShopByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/shop/update-status/unban`,
    payload,
    {
      ...TOAST_MODE.ALL,
      loadingClass
    }
  )
  return { status, resData: data }
}

const approveShopByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/shop/update-status/approve`,
    payload,
    {
      ...TOAST_MODE.ALL,
      loadingClass
    }
  )
  return { status, resData: data }
}

const rejectShopByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/shop/update-status/reject`,
    payload,
    {
      ...TOAST_MODE.ALL,
      loadingClass
    }
  )
  return { status, resData: data }
}

const getShopDetailAPI = async ({ payload }) => {
  const { _id, role } = payload

  const apiMap = {
    admin: 'admin/shop'
  }

  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/${apiMap[role]}/${_id}`,
    {
      ...TOAST_MODE.ALL
    }
  )
  return { status, resData: data }
}

const getShopListForFilterAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/shop/list`,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const exportShopDataByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/shop/export`,
    payload,
    {
      ...TOAST_MODE.ALL,
      responseType: 'blob',
      loadingClass
    }
  )

  return { status, resData: data }
}

export {
  queryShopByAdminAPI,
  banShopByAdminAPI,
  unbanShopByAdminAPI,
  approveShopByAdminAPI,
  rejectShopByAdminAPI,
  getShopDetailAPI,
  getShopListForFilterAPI,
  exportShopDataByAdminAPI,
  getShopStatusByOwnerAPI,
  checkBasicShopInfoAPI,
  checkBusinessLicenseAPI
}
