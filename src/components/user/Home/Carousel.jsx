import React from 'react'
import Slider from 'react-slick'
import { Box } from '@mui/material'

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const items = [
    {
      id: 1,
      iamgeUrl:
        'https://klbtheme.com/bevesi/wp-content/uploads/2024/04/slider-01.jpg'
    },
    {
      id: 2,
      iamgeUrl:
        'https://klbtheme.com/bevesi/wp-content/uploads/2024/04/slider-02.jpg'
    },
    {
      id: 3,
      iamgeUrl:
        'https://klbtheme.com/bevesi/wp-content/uploads/2024/04/slider-03.jpg'
    }
  ]

  return (
    <Box sx={{ overflow: 'hidden' }}>
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

export default Carousel
