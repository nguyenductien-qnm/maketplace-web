import { Box, Divider, styled, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Link } from 'react-router-dom'
import { green, grey } from '@mui/material/colors'

import ProductTitle from './ProductTitle'
import ProductRating from './ProductRating'
import PriceDisplay from './PriceDisplay'
import ShippingInfo from './ShippingInfo'
import ShareProduct from './ShareProduct'
import StoreInfo from './StoreInfo'
import QuantitySelector from './QuantitySelector'
import AddToCartButton from './AddToCartButton'
import BuyNowButton from './BuyNowButton'

function ProductInfo() {
  const StyledLink = styled(Link)({
    fontSize: '12px',
    color: grey[400],
    '&:hover': { color: grey[600] }
  })
  return (
    <Box sx={{ width: '100%' }}>
      <StyledLink to="/home">Electronics</StyledLink>

      <ProductTitle />

      <ProductRating />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '10px'
        }}
      >
        <PriceDisplay />

        <Typography sx={{ color: green[700], fontWeight: '600' }}>
          In Stock
        </Typography>
      </Box>

      <Divider sx={{ marginTop: '10px' }} />

      <Grid container spacing={1} sx={{ marginTop: '20px' }}>
        <Grid  size={2}>
          <QuantitySelector />
        </Grid>

        <Grid size={5}>
          <AddToCartButton />
        </Grid>

        <Grid size={5}>
          <BuyNowButton />
        </Grid>
      </Grid>

      <StoreInfo />

      <ShippingInfo />

      <ShareProduct />
    </Box>
  )
}
export default ProductInfo
