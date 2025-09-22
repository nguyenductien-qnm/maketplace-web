import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'

function LightboxImage({ src, onClose }) {
  const [imageSrc, setImageSrc] = useState('')

  useEffect(() => {
    if (!src) return

    let url = src instanceof File ? URL.createObjectURL(src) : src
    setImageSrc(url)

    return () => {
      if (src instanceof File) URL.revokeObjectURL(url)
    }
  }, [src])

  if (!imageSrc) return null

  return (
    <Box
      onClick={onClose}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}
    >
      <CloseIcon
        onClick={onClose}
        sx={{
          color: 'white',
          position: 'absolute',
          top: 20,
          right: 30,
          cursor: 'pointer'
        }}
      />
      <Box
        component="img"
        src={imageSrc}
        sx={{
          maxWidth: '90%',
          maxHeight: '90%',
          objectFit: 'contain',
          cursor: 'default',
          borderRadius: '7px'
        }}
        onClick={(e) => e.stopPropagation()}
      />
    </Box>
  )
}
export default LightboxImage
