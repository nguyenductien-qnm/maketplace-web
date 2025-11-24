import Box from '@mui/material/Box'
import Slider from 'react-slick'
import IconButton from '@mui/material/IconButton'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import LightboxGallery from '~/components/common/LightboxGallery'
import { useState, useRef } from 'react'
import { blue, grey } from '@mui/material/colors'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '~/css/product-gallery.css'

function ProductGallery({ images, visibility }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [openLightBox, setOpenLightBox] = useState(false)
  const sliderRef = useRef(null)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setActiveIndex(next),
    customPaging: (i) => (
      <Box sx={{ width: 60, height: 60, p: 0.3 }}>
        <Box
          component="img"
          onClick={() => {
            setActiveIndex(i)
            sliderRef.current?.slickGoTo(i)
          }}
          src={images?.[i].url}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '5px',
            border: '1.5px solid',
            borderColor: i == activeIndex ? blue[600] : grey[200],
            cursor: 'pointer',
            transition: 'border-color 0.3s',
            '&:hover': {
              borderColor: blue[600]
            }
          }}
        />
      </Box>
    ),
    appendDots: (dots) => (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          px: 2
        }}
      >
        <IconButton
          onClick={() => sliderRef.current?.slickPrev()}
          sx={{
            bgcolor: 'white',
            boxShadow: 1,
            width: 25,
            height: 25,
            flexShrink: 0,
            '&:hover': { bgcolor: grey[100] }
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: '15px' }} />
        </IconButton>

        <ul
          style={{
            margin: 0,
            padding: 0,
            display: 'flex',
            listStyle: 'none'
          }}
        >
          {dots}
        </ul>

        <IconButton
          onClick={() => sliderRef.current?.slickNext()}
          sx={{
            bgcolor: 'white',
            boxShadow: 1,
            width: 25,
            height: 25,
            flexShrink: 0,
            '&:hover': { bgcolor: grey[100] }
          }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: '15px' }} />
        </IconButton>
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ position: 'relative', textAlign: 'center' }}>
        <Box>
          <Slider ref={sliderRef} {...settings}>
            {images?.map((img, index) => (
              <Box key={index}>
                <Box
                  component="img"
                  src={img.url}
                  sx={{
                    maxWidth: '100%',
                    borderRadius: '5px',
                    '&:hover': { cursor: 'pointer' }
                  }}
                  onClick={() => setOpenLightBox(true)}
                />
              </Box>
            ))}
          </Slider>
        </Box>
        {visibility == 'private' && (
          <Box
            sx={{
              position: 'absolute',
              top: '200px',
              left: '200px',
              backgroundColor: 'rgba(23, 23, 23, 0.5)',
              width: '200px',
              height: '200px',
              borderRadius: '99999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '25px',
              color: 'white'
            }}
          >
            Unlisted
          </Box>
        )}
      </Box>

      {openLightBox && (
        <LightboxGallery
          images={images?.map((img) => img.url)}
          activeIndex={activeIndex}
          onClose={() => setOpenLightBox(false)}
        />
      )}
    </>
  )
}

export default ProductGallery
