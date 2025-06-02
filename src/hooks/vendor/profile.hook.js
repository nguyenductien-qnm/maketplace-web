import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  checkShopUrlAPI,
  getShopByOwnerAPI,
  updateProfileShopAPI
} from '~/api/shop.api'
import {
  apiGetDistricts,
  apiGetProvinces,
  apiGetWards
} from '~/helpers/getAddress'
import { uploadImageToCloudinary } from '~/helpers/apiSendImage'
import { prepareImageForStorage } from '~/helpers/resizeImage'
import interceptorLoadingElements from '~/utils/interceptorLoading'

export const useVendorProfile = () => {
  const [loading, setLoading] = useState(true)
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [selectedWard, setSelectedWard] = useState(null)
  const [availableShopSlug, setAvailableShopSlug] = useState(true)

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

  const shopAvatar = watch('shop_avatar')
  const shopBanner = watch('shop_banner')
  const shopStatus = watch('shop_status')

  useEffect(() => {
    const init = async () => {
      const shopData = await getShopByOwnerAPI()
      const shop = shopData?.data?.metadata
      reset({
        shop_email: shop.shop_email,
        shop_phone: shop.shop_phone,
        shop_name: shop.shop_name,
        shop_slug: shop.shop_slug,
        shop_status: shop.shop_status,
        shop_intro: shop.shop_intro,
        shop_avatar: shop.shop_avatar,
        shop_banner: shop.shop_banner,
        province: shop.shop_address?.province,
        district: shop.shop_address?.district,
        ward: shop.shop_address?.ward,
        street: shop.shop_address?.street
      })
      setSelectedProvince(shop.shop_address?.province)
      setSelectedDistrict(shop.shop_address?.district)
      setSelectedWard(shop.shop_address?.ward)
      setLoading(false)
    }

    getAndSetProvinces()
    init()
  }, [])

  useEffect(() => {
    if (selectedProvince?.ProvinceID) {
      getAndSetDistricts(selectedProvince.ProvinceID)
    }
  }, [selectedProvince])

  useEffect(() => {
    if (selectedDistrict?.DistrictID) {
      getAndSetWards(selectedDistrict.DistrictID)
    }
  }, [selectedDistrict])

  const getAndSetProvinces = async () => {
    setProvinces(await apiGetProvinces())
  }

  const getAndSetDistricts = async (provinceId) => {
    setDistricts(await apiGetDistricts(Number(provinceId)))
  }

  const getAndSetWards = async (districtId) => {
    setWards(await apiGetWards(Number(districtId)))
  }

  const handleChangeProvince = (e) => {
    const id = e.target.value
    const selected = provinces.find((p) => p.ProvinceID === id)
    setSelectedProvince(selected)
    setSelectedDistrict(null)
    setSelectedWard(null)
    clearErrors('province')
  }

  const handleChangeDistrict = (e) => {
    const id = e.target.value
    const selected = districts.find((p) => p.DistrictID === id)
    setSelectedDistrict(selected)
    setSelectedWard(null)
    clearErrors('district')
  }

  const handleChangeWard = (e) => {
    const id = e.target.value
    const selected = wards.find((p) => p.WardCode === id)
    setSelectedWard(selected)
    clearErrors('ward')
  }

  const handleUploadImage = async (e, type = 'avatar') => {
    interceptorLoadingElements(true, [
      '.btn-shop-upload-banner',
      '.btn-shop-upload-avatar',
      '.btn-shop-update-profile'
    ])
    const file = e.target.files[0]
    const url = await uploadImageToCloudinary(file)
    const image = prepareImageForStorage(
      url,
      type === 'avatar'
        ? { width: 180, height: 180 }
        : { width: 1000, height: 200 }
    )
    setValue(type === 'avatar' ? 'shop_avatar' : 'shop_banner', image)
    interceptorLoadingElements(false, [
      '.btn-shop-upload-banner',
      '.btn-shop-upload-avatar',
      '.btn-shop-update-profile'
    ])
  }

  const onSubmit = handleSubmit(async (data) => {
    if (!availableShopSlug) {
      setError('shop_slug', {
        type: 'manual',
        message: 'This URL is already taken.'
      })
      return
    }

    const updatedData = {
      ...data,
      shop_address: {
        province: selectedProvince,
        district: selectedDistrict,
        ward: selectedWard,
        street: data.street
      }
    }

    await updateProfileShopAPI(updatedData, '.btn-shop-update-profile')
  })

  return {
    loading,
    register,
    errors,
    onSubmit,
    provinces,
    districts,
    wards,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    handleChangeProvince,
    handleChangeDistrict,
    handleChangeWard,
    handleUploadImage,
    shopAvatar,
    shopBanner,
    shopStatus
  }
}
