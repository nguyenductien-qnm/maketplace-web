import { Box } from '@mui/material'
import Slider from 'react-slick'

function ProductImageGallery() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i) => (
      <Box sx={{ position: 'absolute', top: '10px' }}>
        <img
          src={items[i].iamgeUrl}
          style={{
            height: '50px',
            objectFit: 'cover',
            borderRadius: '5px'
          }}
        />
      </Box>
    )
  }

  const items = [
    {
      id: 1,
      iamgeUrl:
        'https://klbtheme.com/bevesi/wp-content/uploads/2024/04/3-13.jpg'
    },
    {
      id: 2,
      iamgeUrl:
        'https://klbtheme.com/bevesi/wp-content/uploads/2024/04/1-16.jpg'
    },
    {
      id: 3,
      iamgeUrl:
        'https://klbtheme.com/bevesi/wp-content/uploads/2024/04/2-15.jpg'
    }
  ]

  return (
    <Box sx={{ position: 'relative', textAlign: 'center' }}>
      <Slider {...settings}>
        {items.map((item) => (
          <Box key={item.id}>
            <img
              src={item.iamgeUrl}
              style={{ maxWidth: '100%', borderRadius: '5px' }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  )
}

export default ProductImageGallery
