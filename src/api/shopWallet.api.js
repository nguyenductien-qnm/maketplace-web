import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

const getShopWalletAPI = async () => {
  const res = await authorizedAxios.get(`${API_ROOT}/v1/api/wallet`)
  return res
}

const addPaymentAccountAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/wallet/add`,
    data,
    { loadingClass }
  )
  return res
}

const setDefaultPaymentAccountAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/wallet/set-default`,
    data,
    { loadingClass }
  )
  return res
}

const deletePaymentAccountAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/wallet/delete`,
    data,
    { loadingClass }
  )
  return res
}

const requestWithdrawAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/wallet/request-withdraw`,
    data,
    { loadingClass }
  )
  return res
}

export {
  getShopWalletAPI,
  addPaymentAccountAPI,
  setDefaultPaymentAccountAPI,
  deletePaymentAccountAPI,
  requestWithdrawAPI
}
