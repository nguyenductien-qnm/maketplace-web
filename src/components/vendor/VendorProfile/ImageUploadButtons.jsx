import { Box, Button } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import VisuallyHiddenInput from '~/components/common/VisuallyHiddenInput'

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
