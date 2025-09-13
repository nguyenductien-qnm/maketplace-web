import { StatusCodes } from 'http-status-codes'
import { useEffect, useState } from 'react'
import {
  getDistrictsAPI,
  getProvincesAPI,
  getWardsAPI
} from '~/api/address.api'

export const useAddressOptions = ({ address }) => {
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  useEffect(() => {
    fetchProvinces()
  }, [])

  useEffect(() => {
    if (address?.province?.ProvinceID)
      loadDistricts(address?.province?.ProvinceID)
    if (address?.district?.DistrictID) loadWards(address?.district?.DistrictID)
  }, [address])

  const fetchProvinces = async () => {
    const { status, resData } = await getProvincesAPI()
    if (status === StatusCodes.OK) setProvinces(resData?.metadata)
  }

  const loadDistricts = async (provinceID) => {
    const { status, resData } = await getDistrictsAPI(provinceID)
    if (status === StatusCodes.OK) {
      setDistricts(resData?.metadata)
      setWards([])
    }
  }

  const loadWards = async (districtID) => {
    const { status, resData } = await getWardsAPI(districtID)
    if (status === StatusCodes.OK) setWards(resData?.metadata)
  }

  return { provinces, districts, wards, loadDistricts, loadWards }
}
