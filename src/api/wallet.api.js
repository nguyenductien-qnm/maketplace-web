import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const getShopWalletAPI = async () => {
  const res = await authorizedAxios.get(`${API_ROOT}/v1/api/wallet/shop`, {
    ...TOAST_MODE.ONLY_ERROR
  })
  return res
}

const getUserWalletAPI = async () => {
  const res = await authorizedAxios.get(`${API_ROOT}/v1/api/wallet/user`, {
    ...TOAST_MODE.ONLY_ERROR
  })
  return res
}

const shopAddPaymentAccountAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/wallet/shop-add-account`,
    data,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return res
}

const userAddPaymentAccountAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/wallet/user-add-account`,
    data,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return res
}

const shopSetDefaultPaymentAccountAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/wallet/shop-set-default-account`,
    data,
    { loadingClass, ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

const userSetDefaultPaymentAccountAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/wallet/user-set-default-account`,
    data,
    { loadingClass, ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

const shopDeletePaymentAccountAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/wallet/shop-delete-account`,
    data,
    { loadingClass, ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

const userDeletePaymentAccountAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/wallet/user-delete-account`,
    data,
    { loadingClass, ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

const shopRequestWithdrawAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/request-withdraw/shop`,
    data,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return res
}

const userRequestWithdrawAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/request-withdraw/user`,
    data,
    { loadingClass, ...TOAST_MODE.ALL }
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
