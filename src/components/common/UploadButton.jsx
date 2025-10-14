import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'

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

function UploadButton({
  label,
  multiple = false,
  inputProps = {},
  sx = {},
  variant = 'contained'
}) {
  return (
    <Button
      component="label"
      role={undefined}
      variant={variant}
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      className="btn-upload-image"
      sx={{ ...sx }}
    >
      {label}
      <VisuallyHiddenInput
        type="file"
        accept="image/*"
        {...inputProps}
        multiple={multiple}
      />
    </Button>
  )
}

export default UploadButton
