import UserLayout from '~/layouts/user/UserLayout'
import ProductInfo from '~/components/user/ProductDetail/ProductInfo/ProductInfo'
import ProductImageGallery from '~/components/user/ProductDetail/ProductImageGallery'
import Grid from '@mui/material/Grid2'
import { Box, Divider, styled, Typography } from '@mui/material'
import Description from '~/components/user/ProductDetail/Description'
import Review from '~/components/user/ProductDetail/Review/Review'
import { grey } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import ProductRelated from '~/components/user/ProductDetail/Review/ProductRelated'
import { useParams } from 'react-router-dom'
import { getProductByIdAPIForClient } from '~/api/product.api'
import CustomBreadcrumbs from '~/components/common/CustomBreadcrumbs'

function ProductDetails() {
  const UnderLine = styled(Box)({
    position: 'absolute',
    bottom: '-10px',
    left: '0',
    width: '100%',
    height: '3px',
    backgroundColor: grey[900]
  })

  const [product, setProduct] = useState({})
  const [shop, setShop] = useState({})
  const [breakCrumbs, setBreakCrumbs] = useState()

  const { _id } = useParams()

  const [selectedTab, setSelectedTab] = useState('description')

  const handleTabClick = (tab) => {
    setSelectedTab(tab)
  }

  useEffect(() => {
    getProductByIdAPIForClient(_id).then((res) => {
      setProduct(res.data?.metadata?.product)
      setShop(res.data?.metadata?.shop)
    })
  }, [_id])

  useEffect(() => {
    setBreakCrumbs([
      { name: 'Home', url: '/home' },
      { name: product.product_name, _id: product._id }
    ])
  }, [product])

  return (
    <UserLayout>
      <CustomBreadcrumbs breakCrumbs={breakCrumbs} />
      <Grid container spacing={3} sx={{ marginTop: '15px' }}>
        <Grid size={6}>
          <ProductImageGallery productGallerys={product.product_gallery} />
        </Grid>
        <Grid size={6}>
          <ProductInfo product={product} shop={shop} />
        </Grid>
      </Grid>

      <Box sx={{ marginTop: '100px' }}>
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
        {selectedTab === 'description' && (
          <Description productDescription={product.product_description} />
        )}
        {selectedTab === 'review' && <Review />}
      </Box>

      <ProductRelated />
    </UserLayout>
  )
}

export default ProductDetails
