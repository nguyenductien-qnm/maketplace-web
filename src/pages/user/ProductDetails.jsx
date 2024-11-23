import UserLayout from '~/layouts/user/UserLayout'
import ProductInfo from '~/components/user/ProductDetail/ProductInfo/ProductInfo'
import ProductImageGallery from '~/components/user/ProductDetail/ProductImageGallery'
import Grid from '@mui/material/Grid2'
import { Box, Divider, styled, Typography } from '@mui/material'
import Description from '~/components/user/ProductDetail/Description'
import Review from '~/components/user/ProductDetail/Review/Review'
import { grey } from '@mui/material/colors'
import { useState } from 'react'
import ProductRelated from '~/components/user/ProductDetail/Review/ProductRelated'

function ProductDetails() {
  const UnderLine = styled(Box)({
    position: 'absolute',
    bottom: '-10px',
    left: '0',
    width: '100%',
    height: '3px',
    backgroundColor: grey[900]
  })

  const [selectedTab, setSelectedTab] = useState('description')

  const handleTabClick = (tab) => {
    setSelectedTab(tab)
  }
  return (
    <UserLayout>
      <Grid container spacing={3}>
        <Grid size={6}>
          <ProductImageGallery />
        </Grid>
        <Grid size={6}>
          <ProductInfo />
        </Grid>
      </Grid>

      <Box sx={{ marginTop: '30px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'start',
            gap: '20px'
          }}
        >
          <Box
            sx={{
              position: 'relative',
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            onClick={() => handleTabClick('description')}
          >
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: '600',
                color: selectedTab === 'description' ? grey[900] : grey[400]
              }}
            >
              Description
            </Typography>
            {selectedTab === 'description' && <UnderLine />}
          </Box>

          <Box
            sx={{
              position: 'relative',
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            onClick={() => handleTabClick('review')}
          >
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: '600',
                color: selectedTab === 'review' ? grey[900] : grey[400]
              }}
            >
              Review(2)
            </Typography>
            {selectedTab === 'review' && <UnderLine />}
          </Box>
        </Box>
        <Divider sx={{ marginTop: '10px', marginBottom: '20px' }} />
        {selectedTab === 'description' && <Description />}
        {selectedTab === 'review' && <Review />}
      </Box>

      <ProductRelated />
    </UserLayout>
  )
}

export default ProductDetails
