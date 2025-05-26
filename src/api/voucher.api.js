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
export {
  queryVoucherByOwnerAPI,
  shopUpdateVoucherAPI,
  shopCreateVoucherAPI,
  shopDeleteVoucherAPI,
  getVoucherForCustomerAPI
}
