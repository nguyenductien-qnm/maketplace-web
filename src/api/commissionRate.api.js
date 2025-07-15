import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const getCommissionRateByAdminAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/commission-rate`,
    { ...TOAST_MODE.NONE }
  )
  return { status, resData: data }
}

const createCommissionRateByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/commission-rate`,
    payload,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

const updateCommissionRateByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/commission-rate`,
    payload,

    { loadingClass, ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

export {
  getCommissionRateByAdminAPI,
  createCommissionRateByAdminAPI,
  updateCommissionRateByAdminAPI
}
