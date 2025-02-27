import {
  Avatar,
  Box,
  Button,
  FormLabel,
  TextField,
  Select,
  MenuItem
} from '@mui/material'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Controller, set, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { grey } from '@mui/material/colors'
import FormAddress from '~/components/FormAddress'
import { getShopByOwnerAPI } from '~/api/shop.api'
import AddressModal from '../../MyAccount/Addresses/AddressModal'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import { getAddressListAPI } from '~/api/user.api'
import {
  apiGetDistricts,
  apiGetProvinces,
  apiGetWards
} from '~/helpers/getAddress'
import FieldErrorAlert from '~/components/FieldErrorAlert'
import TypographyLabel from '../../Common/TypographyLabel'
function VendorProfile() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
    clearErrors
  } = useForm()
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  })
  const BoxCustom = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '7px'
  })
  const FormLabelCustom = styled(FormLabel)({
    fontSize: '14px',
    color: 'black',
    fontWeight: '600'
  })
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [provinces, setProvinces] = useState()
  const [districts, setDistricts] = useState()
  const [wards, setWards] = useState()

  const [selectedProvince, setSelectedProvince] = useState()
  const [selectedDistrict, setSelectedDistrict] = useState()
  const [selectedWard, setSelectedWard] = useState()

  const getAndSetProvinces = async () => {
    setProvinces(await apiGetProvinces())
  }

  const getAndSetDistricts = async (provinceId) => {
    provinceId = Number(provinceId)
    setDistricts(await apiGetDistricts(provinceId))
  }

  const getAndSetWards = async (districtId) => {
    districtId = Number(districtId)
    setWards(await apiGetWards(districtId))
  }

  const setFieldData = (shop) => {
    reset({
      shop_email: shop.shop_email,
      shop_phone: shop.shop_phone,
      shop_name: shop.shop_name,
      shop_slug: shop.shop_slug,
      shop_status: shop.shop_status,
      shop_intro: shop.shop_intro,
      province: shop.shop_address.shop_province,
      district: shop.shop_address.shop_district,
      ward: shop.shop_address.shop_ward,
      street: shop.shop_address.street
    })
    setSelectedProvince(shop.shop_address.province)
    setSelectedDistrict(shop.shop_address.district)
    setSelectedWard(shop.shop_address.ward)
  }

  const handleChangeProvince = (e) => {
    const provinceID = e.target.value
    const selected = provinces.find((item) => item.ProvinceID === provinceID)
    setSelectedProvince({})
    setSelectedDistrict({})
    setSelectedWard({})
    setSelectedProvince(selected)
    clearErrors('province')
  }

  const handleChangeDistrict = (e) => {
    const districtID = e.target.value
    const selected = districts.find((item) => item.DistrictID === districtID)
    setSelectedWard({})
    setSelectedDistrict(selected)
    clearErrors('district')
  }

  const handleChangeWard = (e) => {
    const wardCode = e.target.value
    const selected = wards.find((item) => item.WardCode === wardCode)
    setSelectedWard(selected)
    clearErrors('ward')
  }

  useEffect(() => {
    if (selectedProvince && selectedProvince.ProvinceID) {
      if (!isFirstLoad) {
        setValue('ward', '')
        setValue('district', '')
        setDistricts([])
        setWards([])
      }
      getAndSetDistricts(selectedProvince.ProvinceID)
    }
  }, [selectedProvince])

  useEffect(() => {
    if (selectedDistrict && selectedDistrict.DistrictID) {
      if (!isFirstLoad) {
        setValue('ward', '')
        setWards([])
      }
      getAndSetWards(selectedDistrict.DistrictID)
    }
  }, [selectedDistrict])

  useEffect(() => {
    const getShopAndAddress = async () => {
      const res = await getShopByOwnerAPI()
      setFieldData(res?.data?.metadata)
      getAndSetProvinces()
    }
    getShopAndAddress()
  }, [])

  const updateShopInfo = async (data) => {
    const province = provinces.find(
      (p) => p.ProvinceID === selectedProvince.ProvinceID
    )
    const district = districts.find(
      (p) => p.DistrictID === selectedDistrict.DistrictID
    )
    const ward = wards.find((p) => p.WardCode === selectedWard.WardCode)
    console.log('province:::', province)
    console.log('district:::', district)
    console.log('ward:::', ward)
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(updateShopInfo)}>
        <Box sx={{ position: 'relative' }}>
          <img
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            src="https://i.pinimg.com/736x/58/c3/33/58c33377dfcbb3022493dec49d098b02.jpg"
          />
          <Avatar
            sx={{
              height: '80px',
              width: '80px',
              position: 'absolute',
              bottom: 30,
              left: 30
            }}
          ></Avatar>
        </Box>
        <Box>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload Avatar
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
              multiple
            />
          </Button>{' '}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload Banner
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
              multiple
            />
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            mt: '20px'
          }}
        >
          <BoxCustom>
            <FormLabelCustom>Shop email *</FormLabelCustom>
            <TextField
              {...register('shop_email')}
              size="small"
              fullWidth
            ></TextField>
          </BoxCustom>

          <BoxCustom>
            <FormLabelCustom>Shop phone</FormLabelCustom>
            <TextField
              {...register('shop_phone')}
              size="small"
              fullWidth
            ></TextField>
          </BoxCustom>

          <BoxCustom>
            <FormLabelCustom>Shop name *</FormLabelCustom>
            <TextField
              {...register('shop_name')}
              size="small"
              fullWidth
            ></TextField>
          </BoxCustom>

          <BoxCustom>
            <FormLabelCustom>Shop URL *</FormLabelCustom>
            <TextField
              {...register('shop_slug')}
              size="small"
              fullWidth
            ></TextField>
          </BoxCustom>

          <BoxCustom>
            <FormLabelCustom>Shop status</FormLabelCustom>
            <Controller
              name="shop_status"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} labelId="gender-label" size="small">
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="paused">Pause</MenuItem>
                </Select>
              )}
            />
          </BoxCustom>

          <Box>
            <FormLabelCustom>Province/city</FormLabelCustom>
            <Select
              {...register('province', {
                required: FIELD_REQUIRED_MESSAGE
              })}
              sx={{ minWidth: '100%' }}
              size="small"
              error={!!errors['province']}
              value={selectedProvince?.ProvinceID || ''}
              onChange={(e) => handleChangeProvince(e)}
              disabled={provinces?.length === 0}
            >
              {provinces &&
                provinces.map((item, index) => (
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
              disabled={districts?.length === 0}
            >
              {districts &&
                districts.map((item, index) => (
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
              disabled={wards?.length === 0}
            >
              {wards &&
                wards.map((item, index) => (
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

          <BoxCustom>
            <FormLabelCustom>Shop intro</FormLabelCustom>
            <TextField
              multiline
              rows={6}
              {...register('shop_intro')}
              size="small"
              fullWidth
            ></TextField>
          </BoxCustom>

          <Button
            type="submit"
            sx={{
              textTransform: 'none',
              backgroundColor: grey[200],
              color: 'black',
              fontWeight: '600',
              padding: '10px 20px',
              alignSelf: 'flex-start'
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  )
}
export default VendorProfile
