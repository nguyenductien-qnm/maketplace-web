import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { StatusCodes } from 'http-status-codes'
import { navigate } from '~/helpers/navigation'
import { checkBasicShopInfoAPI, checkBusinessLicenseAPI } from '~/api/shop.api'
import { toast } from 'react-toastify'
import buildFormData from '~/helpers/buildFormData'
import {
  registerShopPersonalAPI,
  registerShopBusinessAPI
} from '~/api/user.api'

const STEPS_ACCOUNT_MIGRATION = [
  'Basic Info',
  'Shop Type & Tax',
  'Payment & Refund ',
  'Review'
]

const LOADING_CLASS_REGISTER_SHOP = ['.btn-action-account-migration']

const COMMON_FIELDS = [
  'shop_name',
  'shop_phone',
  'shop_email',
  'province',
  'district',
  'ward',
  'street',
  'shop_type',
  'paypal_email',
  'shop_refund_type'
]

const PERSONAL_SHOP_FIELDS = [
  ...COMMON_FIELDS,
  'national_id',
  'national_card_front',
  'national_card_back'
]

const BUSINESS_SHOP_FIELDS = [
  ...COMMON_FIELDS,
  'business_license',
  'issued_date',
  'issued_place',
  'tax_code'
]

const useUserRegisterShop = () => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    getValues
  } = useForm({
    defaultValues: {
      national_card_front: null,
      national_card_back: null
    }
  })

  const [activeStep, setActiveStep] = useState(0)

  const [submitting, setSubmitting] = useState(false)

  const shopType = watch('shop_type')

  useEffect(() => {
    if (shopType === 'personal') {
      setValue('tax_code', null)
      setValue('business_license', null)
      setValue('issued_date', null)
      setValue('issued_place', null)
    }

    if (shopType === 'business') {
      setValue('national_id', null)
      setValue('national_card_front', null)
      setValue('national_card_back', null)
    }
  }, [shopType])

  const handleNext = handleSubmit(async () => {
    switch (activeStep) {
      case 0:
        const result = await checkBasicShopInfo()
        if (!result) {
          toast.error('Unexpected error, please try again later.')
          return
        }
        const fields = ['shop_name', 'shop_email', 'shop_phone']
        let notAvailable = false
        fields.forEach((field) => {
          if (!result[field]) {
            notAvailable = true
            setError(field, {
              type: 'manual',
              message: `This ${field.replace('shop_', '')} is not available.`
            })
          }
        })
        if (notAvailable) return
        break

      case 1:
        if (shopType === 'business') {
          const result = await checkBusinessLicense()
          if (!result?.tax_code) {
            setError('tax_code', {
              type: 'manual',
              message: `This tax code is not available.`
            })
            return
          }
        }
        break
    }
    setActiveStep((prev) => prev + 1)
  })

  const checkBasicShopInfo = async () => {
    setSubmitting(true)
    try {
      const payload = {
        shop_name: getValues('shop_name'),
        shop_email: getValues('shop_email'),
        shop_phone: getValues('shop_phone')
      }
      const { status, resData } = await checkBasicShopInfoAPI({
        payload,
        loadingClass: LOADING_CLASS_REGISTER_SHOP
      })
      if (status === StatusCodes.OK) {
        return resData?.metadata
      }
      return null
    } finally {
      setSubmitting(false)
    }
  }

  const checkBusinessLicense = async () => {
    setSubmitting(true)
    try {
      const payload = { tax_code: getValues('tax_code') }
      const { status, resData } = await checkBusinessLicenseAPI({
        payload,
        loadingClass: LOADING_CLASS_REGISTER_SHOP
      })
      if (status === StatusCodes.OK) {
        return resData?.metadata
      }
      return null
    } finally {
      setSubmitting(false)
    }
  }

  const handleBack = () => setActiveStep((prev) => prev - 1)

  const handleFormSubmit = handleSubmit(async () => {
    setSubmitting(true)
    const data = getValues()
    let status
    try {
      switch (shopType) {
        case 'personal': {
          const formData = buildFormData(data, PERSONAL_SHOP_FIELDS)
          const res = await registerShopPersonalAPI({
            payload: formData,
            loadingClass: LOADING_CLASS_REGISTER_SHOP
          })
          status = res.status
          break
        }

        case 'business': {
          const formData = buildFormData(data, BUSINESS_SHOP_FIELDS)
          const res = await registerShopBusinessAPI({
            payload: formData,
            loadingClass: LOADING_CLASS_REGISTER_SHOP
          })
          status = res.status
          break
        }

        default:
          status = null
      }
    } catch (err) {
      status = err.response.status
    } finally {
      setSubmitting(false)
    }

    if (status === StatusCodes.CREATED) {
      navigate('/my-account/dashboard')
    } else {
      setActiveStep(0)
    }
  })

  return {
    submitting,
    activeStep,
    handleNext,
    handleBack,
    STEPS_ACCOUNT_MIGRATION,
    setValue,
    register,
    errors,
    control,
    watch,
    handleFormSubmit,
    getValues
  }
}

export { useUserRegisterShop }
