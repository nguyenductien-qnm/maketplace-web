import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { blue, grey } from '@mui/material/colors'
import { useState, useEffect } from 'react'

function LightboxGallery({ images, activeIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(activeIndex || 0)
  const [imageSrcs, setImageSrcs] = useState([])

  useEffect(() => {
    if (!images || images.length === 0) return

    const urls = images.map((img) => {
      if (img instanceof File) {
        return URL.createObjectURL(img)
      }
      return img
    })

    setImageSrcs(urls)

    return () => {
      urls.forEach((url, index) => {
        if (images[index] instanceof File) {
          URL.revokeObjectURL(url)
        }
      })
    }
  }, [images])

  useEffect(() => {
    setCurrentIndex(activeIndex || 0)
  }, [activeIndex])

  if (!imageSrcs.length) return null

  const handlePrev = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? imageSrcs.length - 1 : prev - 1))
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === imageSrcs.length - 1 ? 0 : prev + 1))
  }

  const handleThumbnailClick = (index, e) => {
    e.stopPropagation()
    setCurrentIndex(index)
  }

  return (
    <Box
      onClick={onClose}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: 'rgba(0,0,0,0.9)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          color: 'white',
          position: 'absolute',
          top: 20,
          right: 30,
          bgcolor: 'rgba(255,255,255,0.1)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          flex: 1,
          px: 8
        }}
      >
        {imageSrcs.length > 1 && (
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: 20,
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
              width: 48,
              height: 48
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        )}

        <Box
          component="img"
          src={imageSrcs[currentIndex]}
          sx={{
            maxWidth: '100%',
            maxHeight: '80vh',
            objectFit: 'contain',
            cursor: 'default',
            borderRadius: '7px'
          }}
          onClick={(e) => e.stopPropagation()}
        />

        {imageSrcs.length > 1 && (
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 20,
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
              width: 48,
              height: 48
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        )}
      </Box>

      {imageSrcs.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            p: 2,
            overflowX: 'auto',
            maxWidth: '90%',
            '&::-webkit-scrollbar': {
              height: 8
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: 'rgba(255,255,255,0.1)'
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'rgba(255,255,255,0.3)',
              borderRadius: 4
            }
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {imageSrcs.map((src, index) => (
            <Box
              key={index}
              component="img"
              src={src}
              onClick={(e) => handleThumbnailClick(index, e)}
              sx={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: '5px',
                border: '2px solid',
                borderColor: index === currentIndex ? blue[500] : grey[600],
                cursor: 'pointer',
                opacity: index === currentIndex ? 1 : 0.6,
                transition: 'all 0.3s',
                flexShrink: 0,
                '&:hover': {
                  opacity: 1,
                  borderColor: blue[400]
                }
              }}
            />
          ))}
        </Box>
      )}

      {imageSrcs.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            bgcolor: 'rgba(0,0,0,0.5)',
            px: 2,
            py: 0.5,
            borderRadius: 2,
            fontSize: 14
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {currentIndex + 1} / {imageSrcs.length}
        </Box>
      )}
    </Box>
  )
}

export default LightboxGallery
