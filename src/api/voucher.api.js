import { authorizedAxios } from '~/utils/authorizedAxios'
import cleanFilters from '~/utils/cleanFilters'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'
// ============================ CUSTOMER ============================
const getVouchersOfMultipleShopByCustomerAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/user/vouchers/shop`,
    payload,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const getSystemVouchersByCustomerAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/user/vouchers/system`,
    payload,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}
// ============================ VENDOR ============================
const queryVoucherByShopAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/vouchers`,
    { params: cleanFilters(payload), ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const getVoucherSummaryByShopAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/vouchers/summary`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const getVoucherDetailByShopAPI = async ({ _id }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/vouchers/${_id}`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const getVoucherFormSnapshotByShopAPI = async ({ _id }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/vouchers/edit/${_id}`,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const createVoucherByShopAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/shop/vouchers`,
    payload,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

const updateVoucherByShopAPI = async ({ _id, payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/shop/vouchers/${_id}`,
    payload,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

const deleteVoucherByShopAPI = async ({ _id, loadingClass }) => {
  const { status, data } = await authorizedAxios.delete(
    `${API_ROOT}/v1/api/shop/vouchers/${_id}`,
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
    `${API_ROOT}/v1/api/admin/vouchers`,
    {
      params: cleanFilters(payload),
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const getVoucherSummaryByAdminAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/vouchers/summary`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const getVoucherFormSnapshotAPI = async ({ _id }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/vouchers/edit/${_id}`,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const getVoucherDetailByAdminAPI = async ({ _id }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/vouchers/${_id}`,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const getVoucherApplicableProductsAPI = async ({ _id }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/vouchers/applicable-products/${_id}`,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const createVoucherByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/vouchers`,
    payload,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

const updateVoucherByAdminAPI = async ({ _id, payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/vouchers/${_id}`,
    payload,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

const disableVoucherByAdminAPI = async ({ _id, payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/vouchers/disable/${_id}`,
    payload,
    { loadingClass, ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const enableVoucherByAdminAPI = async ({ _id, payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/vouchers/enable/${_id}`,
    payload,
    { loadingClass, ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const banShopVoucherByAdminAPI = async ({ _id, payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/vouchers/ban/${_id}`,
    payload,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

const unbanShopVoucherByAdminAPI = async ({ _id, payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/vouchers/unban/${_id}`,
    payload,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

const exportVoucherDataByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/vouchers/export`,
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
  getVoucherDetailByAdminAPI,
  createVoucherByAdminAPI,
  updateVoucherByAdminAPI,
  disableVoucherByAdminAPI,
  enableVoucherByAdminAPI,
  exportVoucherDataByAdminAPI,
  getVoucherDetailByShopAPI,
  getVoucherSummaryByShopAPI,
  getVoucherSummaryByAdminAPI,
  getVouchersOfMultipleShopByCustomerAPI,
  getVoucherApplicableProductsAPI,
  getSystemVouchersByCustomerAPI,
  banShopVoucherByAdminAPI,
  unbanShopVoucherByAdminAPI,
  getVoucherFormSnapshotAPI,
  getVoucherFormSnapshotByShopAPI
}
