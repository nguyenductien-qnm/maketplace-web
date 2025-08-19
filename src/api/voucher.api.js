import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const queryVoucherByOwnerAPI = async (data) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/voucher/shop-query-voucher`,
    data,
    { ...TOAST_MODE.ONLY_ERROR }
  )
}

const shopCreateVoucherAPI = async (data, loadingClass) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/voucher/shop-create-voucher`,
    data,
    { loadingClass, ...TOAST_MODE.ALL }
  )
}

const shopUpdateVoucherAPI = async (data, loadingClass) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/voucher/shop-update-voucher`,
    data,
    { loadingClass, ...TOAST_MODE.ALL }
  )
}

const shopDeleteVoucherAPI = async (data, loadingClass) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/voucher/shop-delete-voucher`,
    data,
    { loadingClass, ...TOAST_MODE.ALL }
  )
}

const getVoucherForCustomerAPI = async (data) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/voucher/get-voucher-for-customer`,
    data,
    { ...TOAST_MODE.ONLY_ERROR }
  )
}

// ============================ ADMIN ============================

const queryVoucherByAdminAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/voucher/query`,
    payload,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const getVoucherDetailForAdminAPI = async ({ _id }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/voucher/${_id}`,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const createVoucherByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/voucher/create`,
    payload,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

const updateVoucherByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/voucher/update`,
    payload,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

const disableShopVoucherByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/voucher/disable`,
    payload,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

const enableShopVoucherByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/voucher/enable`,
    payload,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

export {
  queryVoucherByOwnerAPI,
  shopUpdateVoucherAPI,
  shopCreateVoucherAPI,
  shopDeleteVoucherAPI,
  getVoucherForCustomerAPI,
  queryVoucherByAdminAPI,
  getVoucherDetailForAdminAPI,
  createVoucherByAdminAPI,
  updateVoucherByAdminAPI,
  disableShopVoucherByAdminAPI,
  enableShopVoucherByAdminAPI
}
