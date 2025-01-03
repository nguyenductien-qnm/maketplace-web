import { Box, TextField, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  apiGetDistricts,
  apiGetProvinces,
  apiGetWards
} from '~/helpers/getAddress'
import TypographyLabel from './user/Common/TypographyLabel'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from './FieldErrorAlert'

function FormAddress({
  register,
  errors,
  setValue,
  address,
  actionType,
  handleAddressChange,
  clearErrors
}) {
  const [init, setInit] = useState(true)
  const [listProvinces, setListProvinces] = useState([])
  const [listDistricts, setListDistricts] = useState([])
  const [listWards, setListWards] = useState([])

  const [selectedProvince, setSelectedProvince] = useState({})
  const [selectedDistrict, setSelectedDistrict] = useState({})
  const [selectedWard, setSelectedWard] = useState({})

  const getAndSetListProvinces = async () => {
    setListProvinces(await apiGetProvinces())
  }

  const getAndSetListDistricts = async (provinceId) => {
    provinceId = Number(provinceId)
    setListDistricts(await apiGetDistricts(provinceId))
  }

  const getAndSetListWards = async (districtId) => {
    districtId = Number(districtId)
    setListWards(await apiGetWards(districtId))
  }

  const setValueAddress = async () => {
    address.province.provinceID = Number(address.province.ProvinceID)
    address.district.DistrictID = Number(address.district.DistrictID)
    await getAndSetListDistricts(address.province.provinceID)
    await getAndSetListWards(address.district.DistrictID)
    setSelectedProvince(address.province)
    setSelectedDistrict(address.district)
    setSelectedWard(address.ward)
    setValue('province', address.province.provinceID)
    setValue('district', address.district.DistrictID)
    setValue('ward', address.ward.WardCode)
    setValue('street', address?.street)
    setTimeout(() => {
      setInit(false)
    }, 2000)
  }

  const handleChangeProvince = (e) => {
    const provinceID = e.target.value
    const selected = listProvinces.find(
      (item) => item.ProvinceID === provinceID
    )
    setSelectedWard({})
    setSelectedDistrict({})
    setSelectedProvince(selected)
    clearErrors('province')
  }

  const handleChangeDistrict = (e) => {
    const districtID = e.target.value
    const selected = listDistricts.find(
      (item) => item.DistrictID === districtID
    )
    setSelectedWard({})
    setSelectedDistrict(selected)
    clearErrors('district')
  }

  const handleChangeWard = (e) => {
    const wardCode = e.target.value
    const selected = listWards.find((item) => item.WardCode === wardCode)
    setSelectedWard(selected)
    clearErrors('ward')
  }

  useEffect(() => {
    if (actionType === 'create') {
      setInit(false)
    } else if (actionType === 'update') {
      setValueAddress()
    }
  }, [actionType])

  useEffect(() => {
    getAndSetListProvinces()
  }, [])

  useEffect(() => {
    if (selectedProvince && selectedProvince.ProvinceID && !init) {
      setValue('ward', '')
      setValue('district', '')
      setListDistricts([])
      setListWards([])
      getAndSetListDistricts(selectedProvince.ProvinceID)
    }
  }, [selectedProvince])

  useEffect(() => {
    if (selectedDistrict && selectedDistrict.DistrictID && !init) {
      setValue('ward', '')
      setListWards([])
      getAndSetListWards(selectedDistrict.DistrictID)
    }
  }, [selectedDistrict])

  useEffect(() => {
    handleAddressChange({
      selectedProvince,
      selectedDistrict,
      selectedWard
    })
  }, [selectedWard])

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}
    >
      <Box>
        <TypographyLabel>Province/city</TypographyLabel>
        <Select
          {...register('province', {
            required: FIELD_REQUIRED_MESSAGE
          })}
          sx={{ minWidth: '100%' }}
          size="small"
          error={!!errors['province']}
          value={selectedProvince?.ProvinceID || ''}
          onChange={(e) => handleChangeProvince(e)}
          disabled={listProvinces.length === 0}
        >
          {listProvinces &&
            listProvinces.map((item, index) => (
              <MenuItem key={index} value={item.ProvinceID}>
                {item.ProvinceName}
              </MenuItem>
            ))}
        </Select>
        <FieldErrorAlert errors={errors} fieldName="province" />
      </Box>

      <Box>
        <TypographyLabel>District</TypographyLabel>
        <Select
          {...register('district', {
            required: FIELD_REQUIRED_MESSAGE
          })}
          size="small"
          sx={{ minWidth: '100%' }}
          value={selectedDistrict?.DistrictID || ''}
          onChange={(e) => handleChangeDistrict(e)}
          disabled={listDistricts.length === 0}
        >
          {listDistricts &&
            listDistricts.map((item, index) => (
              <MenuItem key={index} value={item.DistrictID}>
                {item.DistrictName}
              </MenuItem>
            ))}
        </Select>
        <FieldErrorAlert errors={errors} fieldName="district" />
      </Box>

      <Box>
        <TypographyLabel>Ward</TypographyLabel>
        <Select
          size="small"
          sx={{ minWidth: '100%' }}
          {...register('ward', {
            required: FIELD_REQUIRED_MESSAGE
          })}
          value={selectedWard?.WardCode || ''}
          onChange={(e) => handleChangeWard(e)}
          disabled={listWards.length === 0}
        >
          {listWards &&
            listWards.map((item, index) => (
              <MenuItem key={index} value={item.WardCode}>
                {item.WardName}
              </MenuItem>
            ))}
        </Select>
        <FieldErrorAlert errors={errors} fieldName="ward" />
      </Box>

      <Box>
        <TypographyLabel>Street</TypographyLabel>
        <TextField
          size="small"
          sx={{ minWidth: '100%' }}
          {...register('street', {
            required: FIELD_REQUIRED_MESSAGE
          })}
        />
        <FieldErrorAlert errors={errors} fieldName="street" />
      </Box>
    </Box>
  )
}
export default FormAddress
