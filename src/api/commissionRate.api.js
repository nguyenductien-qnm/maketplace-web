import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const queryCommissionRateByAdminAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/commission-rate?sortBy=${payload.sortBy}`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const createCommissionRateByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/commission-rate`,
    payload,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

const updateCommissionRateByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/commission-rate`,
    payload,

    { loadingClass, ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

const exportCommissionRatesByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/commission-rate/export`,
    payload,
    {
      ...TOAST_MODE.ONLY_ERROR,
      responseType: 'blob',
      loadingClass
    }
  )

  return { status, resData: data }
}

export {
  queryCommissionRateByAdminAPI,
  createCommissionRateByAdminAPI,
  updateCommissionRateByAdminAPI,
  exportCommissionRatesByAdminAPI
}
