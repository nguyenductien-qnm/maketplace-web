import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

const getProvincesAPI = async () => {
  const { status, data } = await axios.get(
    `${API_ROOT}/v1/api/address/province`
  )
  return { status, resData: data }
}

const getDistrictsAPI = async (provinceId) => {
  const { status, data } = await axios.get(
    `${API_ROOT}/v1/api/address/district/${provinceId}`
  )
  return { status, resData: data }
}

const getWardsAPI = async (districtId) => {
  const { status, data } = await axios.get(
    `${API_ROOT}/v1/api/address/ward/${districtId}`
  )
  return { status, resData: data }
}

export { getProvincesAPI, getDistrictsAPI, getWardsAPI }
