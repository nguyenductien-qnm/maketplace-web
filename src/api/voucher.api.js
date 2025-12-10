import { authorizedAxios } from '~/utils/authorizedAxios'
import cleanFilters from '~/utils/cleanFilters'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'
// ============================ CUSTOMER ============================
const getVouchersOfMultipleShopByCustomerAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/user/voucher/shop`,
    payload,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}
// ============================ VENDOR ============================
const queryVoucherByShopAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/voucher`,
    { params: cleanFilters(payload), ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const getVoucherSummaryByShopAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/voucher/summary`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const getVoucherDetailByShopAPI = async ({ _id }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/voucher/${_id}`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const createVoucherByShopAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/shop/voucher`,
    payload,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

const updateVoucherByShopAPI = async ({ _id, payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/shop/voucher/${_id}`,
    payload,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

const deleteVoucherByShopAPI = async ({ _id, loadingClass }) => {
  const { status, data } = await authorizedAxios.delete(
    `${API_ROOT}/v1/api/shop/voucher/${_id}`,
    {
      loadingClass,
      ...TOAST_MODE.ALL
    }
  )
  return { status, resData: data }
}

// ============================ ADMIN ============================

const queryVoucherByAdminAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/voucher`,
    {
      params: cleanFilters(payload),
      ...TOAST_MODE.ONLY_ERROR
    }
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

const exportVoucherDataByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/voucher/export`,
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
  queryVoucherByShopAPI,
  updateVoucherByShopAPI,
  createVoucherByShopAPI,
  deleteVoucherByShopAPI,
  queryVoucherByAdminAPI,
  getVoucherDetailForAdminAPI,
  createVoucherByAdminAPI,
  updateVoucherByAdminAPI,
  disableShopVoucherByAdminAPI,
  enableShopVoucherByAdminAPI,
  exportVoucherDataByAdminAPI,
  getVoucherDetailByShopAPI,
  getVoucherSummaryByShopAPI,
  getVouchersOfMultipleShopByCustomerAPI
}
