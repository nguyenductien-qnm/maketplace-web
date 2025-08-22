import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { uploadImageToCloudinary } from '~/helpers/apiSendImage'
import { prepareImageForStorage } from '~/helpers/resizeImage'
import interceptorLoadingElements from '~/utils/interceptorLoading'

export const useAdminCategoryFormHook = ({ mode, category, onSubmit }) => {
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    reset,
    formState: { errors }
  } = useForm({ shouldUnregister: true })

  // State
  const [isUploadImage, setIsUpLoadImage] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const imageUrl = watch('category_image')

  // Image upload handler
  const customHandleUploadImage = async (e) => {
    const loadingEls = ['.btn-category-form', '.btn-upload-category-image']

    setIsUpLoadImage(true)
    interceptorLoadingElements(true, loadingEls)

    try {
      const file = e.target.files?.[0]
      if (!file) return

      const url = await uploadImageToCloudinary(file)
      const resizedImage = prepareImageForStorage(url, {
        width: 100,
        height: 100
      })

      setValue('category_image', resizedImage)
      clearErrors('category_image')
    } catch (err) {
      toast.error('Error while uploading image.')
    } finally {
      interceptorLoadingElements(false, loadingEls)
      setIsUpLoadImage(false)
    }
  }

  // Pre-fill form when in update mode
  useEffect(() => {
    if (mode?.includes('update') && category) {
      setValue('category_name', category.category_name || '')
      setValue('category_code', category.category_code || '')
      setValue('category_status', category.category_status === 'active')
      setValue('category_icon', category.category_icon || '')
      setValue('category_image', category.category_image || '')
    } else {
      reset()
    }
  }, [mode, category])

  // Submit handler
  const handleFormSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Expose to UI
  return {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    reset,

    errors,
    imageUrl,
    isUploadImage,
    isSubmitting,

    customHandleUploadImage,
    handleFormSubmit
  }
}
