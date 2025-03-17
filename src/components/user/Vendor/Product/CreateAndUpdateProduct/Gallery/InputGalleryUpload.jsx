import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useDispatch } from 'react-redux'
import { uploadImage } from '~/redux/formProduct.slice'
import interceptorLoadingElements from '~/utils/interceptorLoading'

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

export default function InputGalleryUpload() {
  const dispatch = useDispatch()

  const handleChange = async (e) => {
    interceptorLoadingElements(true, [
      '.btn-shop-upload-product-gallery',
      '.btn-shop-create-product'
    ])
    await dispatch(uploadImage({ file: e.target.files[0], type: 'gallery' }))
    interceptorLoadingElements(false, [
      '.btn-shop-upload-product-gallery',
      '.btn-shop-create-product'
    ])
  }

  return (
    <Button
      className="btn-shop-upload-product-gallery"
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload Gallery
      <VisuallyHiddenInput
        type="file"
        webkitdirectory="true"
        onChange={handleChange}
        multiple
      />
    </Button>
  )
}
