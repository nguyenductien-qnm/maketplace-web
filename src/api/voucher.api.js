import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

const queryVoucherByOwnerAPI = async (data) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/voucher/shop-query-voucher`,
    data
  )
}

const shopCreateVoucherAPI = async (data, loadingClass) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/voucher/shop-create-voucher`,
    data,
    { loadingClass }
  )
}

const shopUpdateVoucherAPI = async (data, loadingClass) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/voucher/shop-update-voucher`,
    data,
    { loadingClass }
  )
}

const shopDeleteVoucherAPI = async (data, loadingClass) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/voucher/shop-delete-voucher`,
    data,
    { loadingClass }
  )
}

const getVoucherForCustomerAPI = async (data) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/voucher/get-voucher-for-customer`,
    data
  )
}
export {
  queryVoucherByOwnerAPI,
  shopUpdateVoucherAPI,
  shopCreateVoucherAPI,
  shopDeleteVoucherAPI,
  getVoucherForCustomerAPI
}
