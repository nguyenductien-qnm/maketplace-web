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
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { grey } from '@mui/material/colors'
import {
  checkShopURLAPI,
  getShopByOwnerAPI,
  updateProfileShopAPI
} from '~/api/shop.api'
import {
  FIELD_REQUIRED_MESSAGE,
  NUMBER_RULE,
  NUMBER_RULE_MESSAGE
} from '~/utils/validators'
import {
  apiGetDistricts,
  apiGetProvinces,
  apiGetWards
} from '~/helpers/getAddress'
import FieldErrorAlert from '~/components/common/FieldErrorAlert'
import generateURL from '~/utils/generateURL'
import { uploadImageToCloudinary } from '~/helpers/apiSendImage'
import { prepareImageForStorage } from '~/helpers/resizeImage'
import VendorProfileSkeleton from './VendorProfileSkeleton'
import interceptorLoadingElements from '~/utils/interceptorLoading'

function VendorProfile() {
  const [loading, setLoading] = useState(true)
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    clearErrors,
    setError,
    setValue,
    getValues
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
    gap: '7px',
    flex: 1
  })
  const FormLabelCustom = styled(FormLabel)({
    fontSize: '14px',
    color: 'black',
    fontWeight: '600'
  })
  const [provinces, setProvinces] = useState()
  const [districts, setDistricts] = useState()
  const [wards, setWards] = useState()
  const [selectedProvince, setSelectedProvince] = useState()
  const [selectedDistrict, setSelectedDistrict] = useState()
  const [selectedWard, setSelectedWard] = useState()
  let selectShopStatus = watch('shop_status')
  const [availableShopSlug, setAvailableShopSlug] = useState(true)
  let shopAvatar = watch('shop_avatar')
  let shopBanner = watch('shop_banner')

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
      shop_avatar: shop.shop_avatar,
      shop_banner: shop.shop_banner,
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
      getAndSetDistricts(selectedProvince.ProvinceID)
    }
  }, [selectedProvince])

  useEffect(() => {
    if (selectedDistrict && selectedDistrict.DistrictID) {
      getAndSetWards(selectedDistrict.DistrictID)
    }
  }, [selectedDistrict])

  useEffect(() => {
    const getShopAndAddress = async () => {
      try {
        const res = await getShopByOwnerAPI()
        setFieldData(res?.data?.metadata)
        getAndSetProvinces()
      } finally {
        setLoading(false)
      }
    }
    getShopAndAddress()
  }, [])

  const handleChangeShopName = async (e) => {
    const shopName = e.target.value.trim()

    if (!shopName) {
      setValue('shop_slug', '')
      return
    }

    const shopSlug = generateURL(shopName)
    setValue('shop_slug', shopSlug)
    await checkShopURL()
  }

  const checkShopURL = async () => {
    try {
      const currentSlug = getValues('shop_slug')
      if (!currentSlug) return
      const res = await checkShopURLAPI({ shop_slug: currentSlug })
      if (res) {
        clearErrors(['shop_slug'])
        setAvailableShopSlug(true)
      }
    } catch (error) {
      setError('shop_slug', {
        type: 'manual',
        message: 'This URL is already taken.'
      })
      setAvailableShopSlug(false)
    }
  }

  const handleUploadAvatar = async (e) => {
    interceptorLoadingElements(true, [
      '.btn-shop-upload-banner',
      '.btn-shop-upload-avatar',
      '.btn-shop-update-profile'
    ])
    const url = await uploadImageToCloudinary(e.target.files[0])
    setValue(
      'shop_avatar',
      prepareImageForStorage(url, { width: 180, height: 180 })
    )
    interceptorLoadingElements(false, [
      '.btn-shop-upload-banner',
      '.btn-shop-upload-avatar',
      '.btn-shop-update-profile'
    ])
  }

  const handleUploadBanner = async (e) => {
    interceptorLoadingElements(true, [
      '.btn-shop-upload-banner',
      '.btn-shop-upload-avatar',
      '.btn-shop-update-profile'
    ])
    const url = await uploadImageToCloudinary(e.target.files[0])
    setValue(
      'shop_banner',
      prepareImageForStorage(url, { width: 1000, height: 200 })
    )
    interceptorLoadingElements(false, [
      '.btn-shop-upload-banner',
      '.btn-shop-upload-avatar',
      '.btn-shop-update-profile'
    ])
  }

  const updateShopProfile = async (data) => {
    if (!availableShopSlug) {
      setError('shop_slug', {
        type: 'manual',
        message: 'This URL is already taken.'
      })
      return
    }

    const province = selectedProvince
      ? provinces.find((p) => p.ProvinceID === selectedProvince.ProvinceID)
      : null
    const district = selectedDistrict
      ? districts.find((p) => p.DistrictID === selectedDistrict.DistrictID)
      : null
    const ward = selectedWard
      ? wards.find((p) => p.WardCode === selectedWard.WardCode)
      : null

    const { province: _, district: __, ward: ___, ...filteredData } = data

    const updatedData = {
      ...filteredData,
      shop_address: { province, district, ward, street: filteredData.street }
    }
    await updateProfileShopAPI(updatedData, '.btn-shop-update-profile')
  }

  return (
    <Box>
      {loading && <VendorProfileSkeleton />}
      {!loading && (
        <form onSubmit={handleSubmit(updateShopProfile)}>
          <Box sx={{ position: 'relative' }}>
            <img
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              src={
                shopBanner ||
                'https://i.pinimg.com/736x/58/c3/33/58c33377dfcbb3022493dec49d098b02.jpg'
              }
            />
            <Avatar
              sx={{
                height: '80px',
                width: '80px',
                position: 'absolute',
                bottom: 30,
                left: 30
              }}
              src={shopAvatar || undefined}
            ></Avatar>
          </Box>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Button
              className="btn-shop-upload-avatar"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Avatar
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => handleUploadAvatar(e)}
                multiple
              />
            </Button>
            <Button
              className="btn-shop-upload-banner"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Banner
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => handleUploadBanner(e)}
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
            <Box sx={{ display: 'flex', gap: '15px' }}>
              <BoxCustom>
                <FormLabelCustom>Shop email *</FormLabelCustom>
                <TextField
                  {...register('shop_email')}
                  size="small"
                  fullWidth
                  InputProps={{ readOnly: true }}
                ></TextField>
              </BoxCustom>

              <BoxCustom>
                <FormLabelCustom>Shop phone</FormLabelCustom>
                <TextField
                  {...register('shop_phone', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: NUMBER_RULE,
                      message: NUMBER_RULE_MESSAGE
                    }
                  })}
                  error={!!errors['shop_phone']}
                  size="small"
                  fullWidth
                ></TextField>
                <FieldErrorAlert errors={errors} fieldName="shop_phone" />
              </BoxCustom>

              <BoxCustom>
                <FormLabelCustom>Shop name *</FormLabelCustom>
                <TextField
                  {...register('shop_name', {
                    required: FIELD_REQUIRED_MESSAGE
                  })}
                  size="small"
                  fullWidth
                  error={!!errors['shop_name']}
                  onBlur={(e) => {
                    handleChangeShopName(e)
                  }}
                ></TextField>
                <FieldErrorAlert errors={errors} fieldName="shop_name" />
              </BoxCustom>
            </Box>

            <BoxCustom>
              <FormLabelCustom>Shop URL *</FormLabelCustom>
              <TextField
                {...register('shop_slug', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
                error={!!errors['shop_slug']}
                size="small"
                fullWidth
                onBlur={(e) => {
                  checkShopURL()
                }}
              ></TextField>
              <FieldErrorAlert errors={errors} fieldName="shop_slug" />
            </BoxCustom>

            <BoxCustom>
              <FormLabelCustom>Shop status</FormLabelCustom>
              <Select
                size="small"
                fullWidth
                {...register('shop_status')}
                error={!!errors['shop_status']}
                value={selectShopStatus}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="paused">Paused</MenuItem>
              </Select>
            </BoxCustom>
            <Box sx={{ display: 'flex', gap: '15px' }}>
              <BoxCustom>
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
              </BoxCustom>

              <BoxCustom>
                <FormLabelCustom>District</FormLabelCustom>
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
              </BoxCustom>

              <BoxCustom>
                <FormLabelCustom>Ward</FormLabelCustom>
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
              </BoxCustom>

              <BoxCustom>
                <FormLabelCustom>Street</FormLabelCustom>
                <TextField
                  size="small"
                  sx={{ minWidth: '100%' }}
                  {...register('street', {
                    required: FIELD_REQUIRED_MESSAGE
                  })}
                />
                <FieldErrorAlert errors={errors} fieldName="street" />
              </BoxCustom>
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
              className="btn-shop-update-profile"
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
      )}
    </Box>
  )
}
export default VendorProfile
