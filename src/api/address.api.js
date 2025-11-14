import axios from 'axios'
import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const getProvincesAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/address/province`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const getDistrictsAPI = async (provinceId) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/address/district/${provinceId}`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const getWardsAPI = async (districtId) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/address/ward/${districtId}`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

export { getProvincesAPI, getDistrictsAPI, getWardsAPI }
