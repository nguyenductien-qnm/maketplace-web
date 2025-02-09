import { Box, Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import resizeImage from '~/helpers/resizeImage.js'

function ProductImageGallery({ productGallerys }) {
  const [resizedGallery, setResizedGallery] = useState([])

  useEffect(() => {
    if (productGallerys) {
      const resizedImages = productGallerys.map((img) => {
        return resizeImage(img, 2000, 2000)
      })
      setResizedGallery(resizedImages)
    }
  }, [productGallerys])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i) => (
      <Box sx={{ position: 'absolute', top: '10px' }}>
        <img
          src={resizedGallery?.[i]}
          style={{
            height: '50px',
            objectFit: 'cover',
            borderRadius: '5px'
          }}
        />
      </Box>
    )
  }

  return (
    <Box>
      {resizedGallery[0] ? (
        <Box sx={{ position: 'relative', textAlign: 'center' }}>
          <Slider {...settings}>
            {resizedGallery?.map((productGallery) => (
              <Box key={productGallery}>
                <img
                  src={productGallery}
                  style={{ maxWidth: '100%', borderRadius: '5px' }}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      ) : (
        <Skeleton variant="rounded" width={565} height={565} />
      )}
    </Box>
  )
}

export default ProductImageGallery
