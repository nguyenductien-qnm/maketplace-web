import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { initMediaUploadAPI } from '~/api/media.api'
import buildFormData from '~/helpers/buildFormData'

const useAdminCategoryForm = ({ category, action }) => {
  const {
    register,
    formState: { errors },
    reset,
    setValue,
    control,
    handleSubmit
  } = useForm({ defaultValues: { category_status: true } })

  useEffect(() => {
    if (action?.includes('update') && category) {
      if (action === 'updateRoot') {
        setValue('category_image', {
          url: category?.category_image || '',
          tmpKey: '',
          previewUrl: ''
        })

        setValue('category_icon', category?.category_icon || '')
      }
      setValue('category_name', category?.category_name || '')
      setValue('category_code', category?.category_code || '')
      setValue('category_status', category?.category_status ?? true)
    } else {
      reset()
    }
  }, [category, action])

  const handleUploadImage = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = buildFormData({ file })

    const { status, resData } = await initMediaUploadAPI({
      payload: formData
    })

    if (status !== 200) throw new Error('Failed to upload image')

    const { uploadUrl, tmpKey } = resData

    await axios.put(uploadUrl, file, {
      headers: { 'Content-Type': file.type }
    })

    setValue('category_image', {
      previewUrl: URL.createObjectURL(file),
      tmpKey,
      url: null
    })
  }

  const handleRemoveImage = () => {
    setValue('category_image', {
      previewUrl: null,
      tmpKey: null,
      url: null
    })
  }

  return {
    register,
    errors,
    control,
    handleSubmit,
    handleUploadImage,
    handleRemoveImage
  }
}

export default useAdminCategoryForm
