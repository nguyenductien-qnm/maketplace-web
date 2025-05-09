import { Box, Skeleton } from '@mui/material'
import Slider from 'react-slick'

function ProductImageGallery({ productGalleries }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i) => (
      <Box sx={{ position: 'absolute', top: '10px' }}>
        <img
          src={productGalleries?.[i]}
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
      {productGalleries && productGalleries[0] ? (
        <Box sx={{ position: 'relative', textAlign: 'center' }}>
          <Slider {...settings}>
            {productGalleries?.map((productGallery) => (
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
