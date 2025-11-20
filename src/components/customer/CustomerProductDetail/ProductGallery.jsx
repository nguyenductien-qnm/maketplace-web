import Box from '@mui/material/Box'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function ProductGallery({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i) => (
      <Box sx={{ position: 'absolute', top: '10px' }}>
        <img
          src={images?.[i].url}
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
    <Box sx={{ position: 'relative', textAlign: 'center' }}>
      <Slider {...settings}>
        {images?.map((img) => (
          <Box key={img._id}>
            <img
              src={img.url}
              style={{ maxWidth: '100%', borderRadius: '5px' }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  )
}

{
  /* <Skeleton variant="rounded" width={565} height={565} /> */
}

export default ProductGallery
