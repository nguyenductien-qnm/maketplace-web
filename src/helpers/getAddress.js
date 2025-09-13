import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

const apiGetProvinces = async () => {
  const { status, data } = await axios.get(`${API_ROOT}/v1/api/ghn/get-address`)
  return { status, resData: data }
}

const apiGetDistricts = async (provinceId) => {
  const { status, data } = await axios.post(
    `${API_ROOT}/v1/api/ghn/get-district`,
    {
      provinceId
    }
  )
  return { status, resData: data }
}

const apiGetWards = async (districtId) => {
  const { status, data } = await axios.post(`${API_ROOT}/v1/api/ghn/get-ward`, {
    districtId
  })
  return { status, resData: data }
}

export { apiGetProvinces, apiGetDistricts, apiGetWards }
