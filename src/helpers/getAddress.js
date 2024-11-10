import axios from 'axios'

const apiGetProvinces = async () => {
  const provinces = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')
  return provinces.data.data
}

const apiGetDistricts = async (code) => {
  const districts = await axios.get(
    `https://esgoo.net/api-tinhthanh/2/${code}.htm`
  )
  return districts.data.data
}

const apiGetWards = async (code) => {
  const wards = await axios.get(`https://esgoo.net/api-tinhthanh/3/${code}.htm`)
  return wards.data.data
}

export { apiGetProvinces, apiGetDistricts, apiGetWards }
