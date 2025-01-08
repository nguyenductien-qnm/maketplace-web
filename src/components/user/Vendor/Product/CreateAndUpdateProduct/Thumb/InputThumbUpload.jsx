import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import { useDispatch } from 'react-redux'
import { uploadImage } from '~/redux/formProduct.slice'
import { useFormContext } from 'react-hook-form'
import FieldErrorAlert from '~/components/FieldErrorAlert'
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

export default function InputThumbUpload() {
  const dispatch = useDispatch()

  const { register, setValue, clearErrors } = useFormContext()

  const handleChange = async (e) => {
    const res = await dispatch(
      uploadImage({ file: e.target.files[0], type: 'thumb' })
    )
    setValue('product_thumb', res.payload.url)
    clearErrors('product_thumb')
  }

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload Thumb
      <VisuallyHiddenInput
        {...register('product_thumb', {
          required: 'Thumb is required'
        })}
        type="file"
        onChange={handleChange}
        multiple
      />
    </Button>
  )
}
