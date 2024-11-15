import { Box, TextField, InputLabel, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  apiGetDistricts,
  apiGetProvinces,
  apiGetWards
} from '~/helpers/getAddress'
import TypographyLabel from './user/Common/TypographyLabel'

function FormAddress() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm()

  const [listProvinces, setListProvinces] = useState([])
  const [listDistrict, setListDistrict] = useState([])
  const [listWard, setListWard] = useState([])

  const handleAddAddress = async (data) => {}

  useEffect(() => {
    const fetchProvinces = async () => {
      setListProvinces(await apiGetProvinces())
    }
    fetchProvinces()
  }, [])

  const province = watch('province')
  useEffect(() => {
    const fetchDistrict = async () => {
      setListDistrict(await apiGetDistricts(province.ProvinceID))
    }
    if (province) {
      setListDistrict([])
      setListWard([])
      fetchDistrict()
    }
  }, [province])

  const district = watch('district')
  useEffect(() => {
    const fetchWard = async () => {
      setListWard(await apiGetWards(district.DistrictID))
    }
    if (district) {
      setListWard([])
      fetchWard()
    }
  }, [district])

  return (
    <form
      onSubmit={handleSubmit(handleAddAddress)}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '25px'
      }}
    >
      <Box>
        <TypographyLabel>Province/city</TypographyLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register('province')}
          sx={{ minWidth: '100%' }}
          size="small"
        >
          {listProvinces.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item.ProvinceName}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box>
        <TypographyLabel>District</TypographyLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register('district')}
          size="small"
          sx={{ minWidth: '100%' }}
        >
          {listDistrict.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item.DistrictName}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box>
        <TypographyLabel>Ward</TypographyLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          size="small"
          sx={{ minWidth: '100%' }}
          {...register('ward')}
        >
          {listWard.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item.WardName}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box>
        <TypographyLabel>Street</TypographyLabel>
        <TextField
          size="small"
          sx={{ minWidth: '100%' }}
          {...register('street')}
        />
      </Box>
    </form>
  )
}
export default FormAddress
