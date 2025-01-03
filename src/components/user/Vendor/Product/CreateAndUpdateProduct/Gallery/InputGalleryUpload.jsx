import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useDispatch } from 'react-redux'
import { uploadIamge } from '~/redux/formProduct.slice'

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
        type="file"
        webkitdirectory="true"
        onChange={(e) =>
          dispatch(uploadIamge({ file: e.target.files[0], type: 'gallery' }))
        }
        multiple
      />
    </Button>
  )
}
