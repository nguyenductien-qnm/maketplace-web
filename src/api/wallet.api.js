import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

const getShopWalletAPI = async () => {
  const res = await authorizedAxios.get(`${API_ROOT}/v1/api/wallet/shop`)
  return res
}

const getUserWalletAPI = async () => {
  const res = await authorizedAxios.get(`${API_ROOT}/v1/api/wallet/user`)
  return res
}

const shopAddPaymentAccountAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/wallet/shop-add-account`,
    data,
    { loadingClass }
  )
  return res
}

const userAddPaymentAccountAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/wallet/user-add-account`,
    data,
    { loadingClass }
  )
  return res
}

const shopSetDefaultPaymentAccountAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/wallet/shop-set-default-account`,
    data,
    { loadingClass }
  )
  return res
}

const userSetDefaultPaymentAccountAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/wallet/user-set-default-account`,
    data,
    { loadingClass }
  )
  return res
}

const shopDeletePaymentAccountAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/wallet/shop-delete-account`,
    data,
    { loadingClass }
  )
  return res
}

const userDeletePaymentAccountAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/wallet/user-delete-account`,
    data,
    { loadingClass }
  )
  return res
}

const shopRequestWithdrawAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/request-withdraw/shop`,
    data,
    { loadingClass }
  )
  return res
}

const userRequestWithdrawAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/request-withdraw/user`,
    data,
    { loadingClass }
  )
  return res
}

export {
  getShopWalletAPI,
  shopAddPaymentAccountAPI,
  userAddPaymentAccountAPI,
  shopSetDefaultPaymentAccountAPI,
  userSetDefaultPaymentAccountAPI,
  shopDeletePaymentAccountAPI,
  userDeletePaymentAccountAPI,
  shopRequestWithdrawAPI,
  userRequestWithdrawAPI,
  getUserWalletAPI
}
