import { Box, Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { convertThumbToSlide } from '~/helpers/resizeImage'

function ProductImageGallery({ productGalleries, productThumb }) {
  const [images, setImages] = useState([])

  useEffect(() => {
    if (!productGalleries || !productGalleries.length || !productThumb) return
    const resizeThumb = convertThumbToSlide(productThumb)
    setImages([resizeThumb, ...productGalleries])
  }, [productGalleries])

  useEffect(() => {
    console.log('images:::', images)
  }, [images])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i) => (
      <Box sx={{ position: 'absolute', top: '10px' }}>
        <img
          src={images?.[i]}
          style={{
            height: '50px',
            objectFit: 'cover',
            borderRadius: '5px'
          }}
        />
      </Box>
    )
  }

  console.log('productThumb:::', productThumb)

  return (
    <Box>
      {images && images[0] ? (
        <Box sx={{ position: 'relative', textAlign: 'center' }}>
          <Slider {...settings}>
            {images?.map((productGallery) => (
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
