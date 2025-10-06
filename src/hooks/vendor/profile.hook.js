import buildFormData from '~/helpers/buildFormData'
import { StatusCodes } from 'http-status-codes'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getShopInfoByOwnerAPI, updateShopInfoByOwnerAPI } from '~/api/shop.api'
import { asyncHandlerShop } from '~/helpers/asyncHandler'

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
    setLoading(true)
    const [res] = await asyncHandlerShop(
      async () => await getShopInfoByOwnerAPI()
    )

    setLoading(false)

    if (res?.status === StatusCodes.OK) {
      const { metadata: data } = res.resData
      setFieldData(data)
    }
  }

  const setFieldData = (data) => {
    const { shop_avatar, shop_banner } = data
    setValue('shop_avatar', shop_avatar || '')
    setValue('shop_banner', shop_banner || '')
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
