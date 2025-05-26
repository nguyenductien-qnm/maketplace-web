import { Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

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

function InputUploadButton({ handleUploadImage }) {
  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      <Button
        className="btn-shop-upload-avatar"
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload Avatar
        <VisuallyHiddenInput
          type="file"
          onChange={(e) => handleUploadImage(e, 'avatar')}
          multiple
        />
      </Button>
      <Button
        className="btn-shop-upload-banner"
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload Banner
        <VisuallyHiddenInput
          type="file"
          onChange={(e) => handleUploadImage(e, 'banner')}
          multiple
        />
      </Button>
    </Box>
  )
}

export default InputUploadButton
