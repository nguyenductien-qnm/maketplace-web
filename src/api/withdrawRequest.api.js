import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const getShopRequestWithdrawAPI = async () => {
  const res = await authorizedAxios.get(
    `${API_ROOT}/v1/api/withdraw-request/shop`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

const getUserRequestWithdrawAPI = async () => {
  const res = await authorizedAxios.get(
    `${API_ROOT}/v1/api/withdraw-request/user`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

const queryWithdrawRequestByAdminAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/withdraw-request/query-by-admin`,
    payload,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const getWithdrawRequestDetailByAdminAPI = async ({ _id }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/withdraw-request/by-admin/${_id}`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const approveWithdrawRequestByAdminAPI = async ({ _id }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/withdraw-request/approve`,
    { _id },
    { ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

const rejectWithdrawRequestByAdminAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/withdraw-request/reject`,
    payload,
    { ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

export {
  getShopRequestWithdrawAPI,
  getUserRequestWithdrawAPI,
  queryWithdrawRequestByAdminAPI,
  getWithdrawRequestDetailByAdminAPI,
  approveWithdrawRequestByAdminAPI,
  rejectWithdrawRequestByAdminAPI
}
