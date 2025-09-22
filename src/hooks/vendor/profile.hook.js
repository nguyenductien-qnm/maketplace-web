import { StatusCodes } from 'http-status-codes'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  checkShopUrlAPI,
  getShopByOwnerAPI,
  updateProfileShopAPI
} from '~/api/shop.api'
import { uploadImageToCloudinary } from '~/helpers/apiSendImage'
import { prepareImageForStorage } from '~/helpers/resizeImage'
import interceptorLoadingElements from '~/utils/interceptorLoading'

export const useVendorProfileForm = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  const [avatarUrl, setAvatarUrl] = useState(null)
  const [bannerUrl, setBannerUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const [address, setAddress] = useState(null)

  useEffect(() => {
    fetchShopInfo()
  }, [])

  const fetchShopInfo = async () => {
    try {
      setLoading(true)
      const { status, resData } = await getShopByOwnerAPI()
      if (status === StatusCodes.OK) {
        const { shop_avatar, shop_banner, shop_address } = resData?.metadata
        setFieldData(resData?.metadata)
        setAvatarUrl(shop_avatar)
        setBannerUrl(shop_banner)
        setAddress(shop_address)
      }
    } catch (err) {
      if (err?.status === StatusCodes.FORBIDDEN) navigate('/unauthorized')
    } finally {
      setLoading(false)
    }
  }

  const setFieldData = (data) => {
    const { shop_address: address } = data
    setValue('shop_code', data?.shop_code || '')
    setValue('shop_email', data?.shop_email || '')
    setValue('shop_name', data?.shop_name || '')
    setValue('shop_phone', data?.shop_phone || '')
    setValue('shop_slug', data?.shop_slug || '')
    setValue('shop_intro', data?.shop_intro || '')
    setValue('province', address?.province || {})
    setValue('district', address?.district || {})
    setValue('ward', address?.ward || {})
    setValue('street', address?.street || '')
    setValue('createdAt', data?.createdAt || '')
  }

  const handleUploadImage = async (e, type = 'avatar') => {
    interceptorLoadingElements(true, [
      '.btn-shop-upload-banner',
      '.btn-shop-upload-avatar',
      '.btn-shop-update-profile'
    ])
    const file = e.target.files[0]
    if (!file) return
    const url = await uploadImageToCloudinary(file)
    if (url) {
      const image = prepareImageForStorage(
        url,
        type === 'avatar'
          ? { width: 180, height: 180 }
          : { width: 1000, height: 200 }
      )
      type === 'avatar' ? setAvatarUrl(image) : setBannerUrl(image)
      setValue(type === 'avatar' ? 'shop_avatar' : 'shop_banner', image)
    }

    interceptorLoadingElements(false, [
      '.btn-shop-upload-banner',
      '.btn-shop-upload-avatar',
      '.btn-shop-update-profile'
    ])
  }

  const handleFormSubmit = handleSubmit(async (data) => {
    console.log('data:::', data)
    // const updatedData = {
    //   ...data,
    //   shop_address: {
    //     province: selectedProvince,
    //     district: selectedDistrict,
    //     ward: selectedWard,
    //     street: data.street
    //   }
    // }

    // await updateProfileShopAPI(updatedData, '.btn-shop-update-profile')
  })

  return {
    address,
    loading,
    register,
    control,
    errors,
    avatarUrl,
    bannerUrl,
    handleUploadImage,
    handleFormSubmit
  }
}
