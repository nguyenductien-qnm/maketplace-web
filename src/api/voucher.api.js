import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'
const shopGetVoucherAPI = async (data) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/voucher/shop-query-voucher`,
    data
  )
}

const shopCreateVoucherAPI = async (data) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/voucher/shop-create-voucher`,
    data
  )
}

const shopUpdateVoucherAPI = async (data) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/voucher/shop-update-voucher`,
    data
  )
}

const shopDeleteVoucherAPI = async (data) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/voucher/shop-delete-voucher`,
    data
  )
}
export {
  shopGetVoucherAPI,
  shopUpdateVoucherAPI,
  shopCreateVoucherAPI,
  shopDeleteVoucherAPI
}
