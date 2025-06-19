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

const queryVoucherByAdminAPI = async (data) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/voucher/query-voucher-by-admin`,
    data,
    { ...TOAST_MODE.ONLY_ERROR }
  )
}

const getVoucherDetailForAdminAPI = async ({ _id }) => {
  return await authorizedAxios.get(
    `${API_ROOT}/v1/api/voucher/detail-for-admin?_id=${_id}`,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
}

const adminCreateVoucherAPI = async (data, loadingClass) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/voucher/create-voucher-by-admin`,
    data,
    { loadingClass, ...TOAST_MODE.ALL }
  )
}

const updateVoucherByAdminAPI = async (data, loadingClass) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/voucher/update-voucher-by-admin`,
    data,
    { loadingClass, ...TOAST_MODE.ALL }
  )
}

const disableShopVoucherByAdminAPI = async (data, loadingClass) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/voucher/disable-shop-voucher-by-admin`,
    data,
    { loadingClass, ...TOAST_MODE.ALL }
  )
}

const enableShopVoucherByAdminAPI = async (data, loadingClass) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/voucher/enable-shop-voucher-by-admin`,
    data,
    { loadingClass, ...TOAST_MODE.ALL }
  )
}

export {
  queryVoucherByOwnerAPI,
  shopUpdateVoucherAPI,
  shopCreateVoucherAPI,
  shopDeleteVoucherAPI,
  getVoucherForCustomerAPI,
  queryVoucherByAdminAPI,
  getVoucherDetailForAdminAPI,
  adminCreateVoucherAPI,
  updateVoucherByAdminAPI,
  disableShopVoucherByAdminAPI,
  enableShopVoucherByAdminAPI
}
