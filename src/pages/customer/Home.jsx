import UserLayout from '~/layouts/user/UserLayout'
import Carousel from '~/components/user/Home/Carousel'
import Grid from '@mui/material/Grid2'
import CategoriesNavbar from '~/components/user/Home/CategoriesNavbar'
import { Box, Button, styled, Typography } from '@mui/material'
import { useState } from 'react'
import Product from '~/components/common/Product'
import Categories from '~/components/user/Home/Categories'
import { blue, green, grey, red } from '@mui/material/colors'
import OffersAndPaymentsComponent from '~/components/user/Home/OffersAndPaymentsComponent'
import Divider from '@mui/material/Divider'
import CashBackBanner from '~/components/user/Home/CashBackBanner'
import ShopCard from '~/components/user/Home/ShopCard'
import Slider from 'react-slick'
import settingCarousel from '~/components/common/Carousel/SettingCarousel'

function Home() {
  const [openCategories, setOpenCategories] = useState(false)

  const handleCategories = () => {
    setOpenCategories(!openCategories)
  }

  const TypographyCategory = styled(Typography)({
    border: '1px solid',
    color: grey[600],
    borderRadius: '999px',
    borderColor: blue[700],
    padding: '5px 10px',
    fontSize: '12px',
    fontWeight: '600'
  })

  return (
    <UserLayout>
      <Grid container spacing={2}>
        <Grid size={3}>
          <CategoriesNavbar open={openCategories} handle={handleCategories} />
        </Grid>
        <Grid size={9}>
          <Carousel />
          <Grid container spacing={3} sx={{ marginTop: '20px' }}>
            <Grid size={6}>
              <Box
                sx={{
                  backgroundColor: green[50],
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: '5px'
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: green[800],
                      fontSize: '18px',
                      fontWeight: '700'
                    }}
                  >
                    Visit us to get the best prices
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      marginTop: '10px'
                    }}
                  >
                    Kontraliga igen i transsofi donas: portad och båvaktig.
                    Oktigt nusm nigon, i nyvement sare.
                  </Typography>
                </Box>
                <Button
                  sx={{
                    backgroundColor: green[800],
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: '700',
                    whiteSpace: 'nowrap',
                    fontSize: '10px'
                  }}
                >
                  View More
                </Button>
              </Box>
            </Grid>

            <Grid size={6}>
              <Box
                sx={{
                  backgroundColor: red[50],
                  borderRadius: '5px',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between', // Thêm căn chỉnh giữa Typography và Button
                  alignItems: 'center' // Căn chỉnh trung tâm theo chiều dọc
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: red[800],
                      fontSize: '18px',
                      fontWeight: '700'
                    }}
                  >
                    Visit us to get the best prices
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      marginTop: '10px'
                    }}
                  >
                    Kontraliga igen i transsofi donas: portad och båvaktig.
                    Oktigt nusm nigon, i nyvement sare.
                  </Typography>
                </Box>
                <Button
                  sx={{
                    backgroundColor: red[400],
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: '700',
                    whiteSpace: 'nowrap',
                    fontSize: '10px' // Đảm bảo chữ không bị xuống dòng
                  }}
                >
                  View More
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <OffersAndPaymentsComponent />

      <Divider />

      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '40px'
          }}
        >
          <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
            Limited Campaign
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <TypographyCategory
              sx={{ backgroundColor: blue[50], color: blue[600] }}
            >
              Electronics
            </TypographyCategory>
            <TypographyCategory>Grocery & Fruits</TypographyCategory>
            <TypographyCategory>Home & Furniture</TypographyCategory>
            <TypographyCategory>Jewellery</TypographyCategory>
          </Box>
          <Typography
            sx={{ color: blue[600], fontSize: '13px', fontWeight: '600' }}
          >
            View All Products
          </Typography>
        </Box>
        <Box sx={{ marginTop: '30px', position: 'relative' }}>
          <Slider {...settingCarousel}>
            {Array.from({ length: 12 }, (_, index) => (
              <div key={index}>
                <Product />
              </div>
            ))}
          </Slider>
        </Box>
      </Box>

      <Box sx={{ marginTop: '30px' }}>
        <CashBackBanner />
      </Box>

      <Box sx={{ marginTop: '30px' }}>
        <Grid container spacing={2}>
          {Array.from({ length: 3 }, (_, index) => (
            <Grid size={4} key={index}>
              <ShopCard />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ marginTop: '30px' }} />

      <Box sx={{ marginTop: '30px' }}>
        <Categories />
      </Box>

      <Divider sx={{ marginTop: '30px' }} />

      <Box sx={{ marginTop: '30px' }}>
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: '800',
            color: blue[600],
            textAlign: 'center'
          }}
        >
          SUGGEST TODAY
        </Typography>
        <Divider
          sx={{
            height: '5px',
            backgroundColor: blue[600],
            marginTop: '20px',
            marginBottom: '20px'
          }}
        />

        <Grid container spacing={2}>
          {Array.from({ length: 36 }, (_, index) => (
            <Grid size={2} key={index}>
              <Product />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button
          sx={{
            textTransform: 'none',
            backgroundColor: blue[600],
            color: 'white',
            fontWeight: '600',
            marginTop: '30px',
            minWidth: '200px'
          }}
        >
          See More
        </Button>
      </Box>

      <Divider sx={{ marginTop: '30px' }} />
    </UserLayout>
  )
}

export default Home
