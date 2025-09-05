import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const getShopTransactionsAPI = async () => {
  const res = await authorizedAxios.get(`${API_ROOT}/v1/api/shop/transaction`, {
    ...TOAST_MODE.ONLY_ERROR
  })
  return res
}

const getUserTransactionsAPI = async () => {
  const res = await authorizedAxios.get(`${API_ROOT}/v1/api/user/transaction`, {
    ...TOAST_MODE.ONLY_ERROR
  })
  return res
}

// ============================ ADMIN ============================
const getRecentWalletTransactionsByAdminAPI = async ({ payload }) => {
  const { _id, type } = payload
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/transaction/recent/${type}/${_id}`,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const queryTransactionByAdminAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/transaction/query`,
    payload,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const getTransactionDetailByAdminAPI = async ({ _id, type }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/transaction/${type}/${_id}`,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const exportTransactionDataByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/transaction/export`,
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
  getShopTransactionsAPI,
  getUserTransactionsAPI,
  getRecentWalletTransactionsByAdminAPI,
  queryTransactionByAdminAPI,
  getTransactionDetailByAdminAPI,
  exportTransactionDataByAdminAPI
}
