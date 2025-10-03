import buildFormData from '~/helpers/buildFormData'
import { StatusCodes } from 'http-status-codes'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getShopInfoByOwnerAPI, updateShopInfoByOwnerAPI } from '~/api/shop.api'

const LOADING_CLASS = ['.btn-shop-update-profile', '.btn-upload-image']

const useVendorProfileForm = () => {
  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [shop, setShop] = useState(null)
  const [openLightBox, setOpenLightBox] = useState(false)
  const [selectImg, setSelectImg] = useState(null)

  const shopAvatar = watch('shop_avatar')
  const shopBanner = watch('shop_banner')

  useEffect(() => {
    fetchShop()
  }, [])

  const fetchShop = async () => {
    try {
      setLoading(true)
      const { status, resData } = await getShopInfoByOwnerAPI()
      if (status === StatusCodes.OK) {
        const { shop_avatar, shop_banner } = resData?.metadata
        setFieldData(resData?.metadata)
        setAvatarUrl(shop_avatar)
        setBannerUrl(shop_banner)
      }
    } catch (err) {
      if (err?.status === StatusCodes.FORBIDDEN) navigate('/unauthorized')
    } finally {
      setLoading(false)
    }
  }

  const setFieldData = (data) => {
    setValue('shop_avatar', data?.shop_avatar || '')
    setValue('shop_banner', data?.shop_banner || '')
    setValue('shop_name', data?.shop_name || '')
    setValue('shop_intro', data?.shop_intro || '')
    setShop(data)
  }

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true)

      const formData = buildFormData(data)

      await updateShopInfoByOwnerAPI({
        payload: formData,
        loadingClass: LOADING_CLASS
      })
    } finally {
      setSubmitting(false)
    }
  })

  return {
    loading,
    submitting,
    openLightBox,
    setOpenLightBox,
    selectImg,
    setSelectImg,
    shop,
    shopAvatar,
    shopBanner,
    register,
    control,
    errors,
    handleFormSubmit
  }
}

export { useVendorProfileForm }
