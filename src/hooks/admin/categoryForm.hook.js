import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { uploadImageToCloudinary } from '~/helpers/apiSendImage'
import { prepareImageForStorage } from '~/helpers/resizeImage'
import interceptorLoadingElements from '~/utils/interceptorLoading'

export const useAdminCategoryFormHook = ({ mode, category, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    shouldUnregister: true
  })

  const imageUrl = watch('category_image')
  const [isUploadImage, setIsUpLoadImage] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const customHandleUploadImage = async (e) => {
    setIsUpLoadImage(true)
    interceptorLoadingElements(true, [
      '.btn-cancel-submit-category-form',
      '.btn-submit-category-form',
      '.btn-upload-category-image'
    ])

    try {
      const file = e.target.files?.[0]
      if (!file) return
      const url = await uploadImageToCloudinary(file)
      const resizeImage = prepareImageForStorage(url, {
        width: 100,
        height: 100
      })
      setValue('category_image', resizeImage)
      clearErrors('category_image')
    } catch (e) {
      toast.error('Error while upload image.')
    } finally {
      interceptorLoadingElements(false, [
        '.btn-cancel-submit-category-form',
        '.btn-submit-category-form',
        '.btn-upload-category-image'
      ])
      setIsUpLoadImage(false)
    }
  }

  useEffect(() => {
    if (mode?.includes('update') && category) {
      setValue('category_name', category.category_name || '')
      setValue('category_code', category.category_code || '')
      setValue(
        'category_status',
        category.category_status == 'active' ? true : false
      )
      setValue('category_icon', category.category_icon || '')
      setValue('category_image', category.category_image || '')
    } else {
      reset()
    }
  }, [mode, category])

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    customHandleUploadImage,
    imageUrl,
    isUploadImage,
    setValue,
    handleFormSubmit,
    isSubmitting,
    watch
  }
}
