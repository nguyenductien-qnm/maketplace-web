import { Box, Divider, styled, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Link } from 'react-router-dom'
import { green, grey } from '@mui/material/colors'
import ProductName from './ProductName'
import ProductRating from './ProductRating'
import PriceDisplay from './PriceDisplay'
import ShippingInfo from './ShippingInfo'
import ShareProduct from './ShareProduct'
import StoreInfo from './StoreInfo'
import QuantitySelector from './QuantitySelector'
import AddToCartButton from './AddToCartButton'
import BuyNowButton from './BuyNowButton'
import Variation from './Variation'
import { useEffect, useState } from 'react'
import { addToCartAPI } from '~/api/cart.api'

function ProductInfo({ product }) {
  const StyledLink = styled(Link)({
    fontSize: '12px',
    color: grey[400],
    '&:hover': { color: grey[600] }
  })

  const [productSelected, setProductSelected] = useState()
  const [quantitySelected, setQuantitySelected] = useState(1)

  const handleSelecteProduct = (product) => {
    setProductSelected(product)
  }

  const addProductToCart = () => {
    let product1 = {}
    if (product?.product_sku?.length > 0) {
      product1._id = productSelected._id
      product1.quantitySelected = quantitySelected
    } else {
      product1._id = product?._id
      product1.quantitySelected = quantitySelected
    }
    if (product1) addToCartAPI(product1)
  }

  const [disableAction, setDisableAction] = useState(false)

  useEffect(() => {
    if (product?.product_sku && !productSelected) {
      setDisableAction(true)
    } else {
      setDisableAction(false)
    }
  }, [productSelected, product])

  return (
    <Box sx={{ width: '100%' }}>
      <StyledLink to="/home">Electronics</StyledLink>

      <ProductName productName={product?.product_name} />

      <ProductRating />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '10px'
        }}
      >
        <PriceDisplay
          price={
            productSelected ? productSelected.sku_price : product?.product_price
          }
        />

        <Typography sx={{ color: green[700], fontWeight: '600' }}>
          In Stock
        </Typography>
      </Box>

      <Divider sx={{ marginTop: '10px' }} />

      <Variation
        variation={product?.product_classifications}
        productSKU={product?.product_sku}
        handleSelecteProduct={handleSelecteProduct}
      />

      <Grid container spacing={1} sx={{ marginTop: '30px' }}>
        <Grid size={2}>
          <QuantitySelector
            disableAction={disableAction}
            quantitySelected={quantitySelected}
            setQuantitySelected={setQuantitySelected}
          />
        </Grid>

        <Grid size={5}>
          <AddToCartButton
            addProductToCart={addProductToCart}
            disableAction={disableAction}
          />
        </Grid>

        <Grid size={5}>
          <BuyNowButton disableAction={disableAction} />
        </Grid>
      </Grid>

      <StoreInfo />

      <ShippingInfo />

      <ShareProduct />
    </Box>
  )
}
export default ProductInfo
