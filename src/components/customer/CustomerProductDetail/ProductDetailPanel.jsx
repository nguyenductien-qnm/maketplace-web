import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import ProductPrice from './ProductPrice'
import ProductShipping from './ProductShipping'
import Share from './Share'
import Store from './Store'
import QuantitySelector from './QuantitySelector'
import ProductVariation from './ProductVariation'
import { useEffect, useState } from 'react'
import { blue, green, grey } from '@mui/material/colors'
import DividerVertical from '~/components/common/DividerVertical'
import Grid2 from '@mui/material/Grid2'
import { bold } from '@uiw/react-md-editor'

function ProductDetailPanel({ product, ui, handler }) {
  const { productSelected, quantitySelected } = ui
  const { setQuantitySelected, handleAddProductToCart, handleOpenReportModal } =
    handler

  const [disableAction, setDisableAction] = useState(false)

  useEffect(() => {
    if (hasManySKUs && !productSelected) {
      setDisableAction(true)
    } else {
      setDisableAction(false)
    }
  }, [productSelected, product])

  const hasManySKUs = product.products_sku.length > 1

  const totalStock = product.products_sku.reduce(
    (sum, sku) => sum + (sku.available_stock - (sku.product_reserved || 0)),
    0
  )

  const prices = product.products_sku.map((sku) => sku.product_price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  const selectedSKU = productSelected || null

  const displayPrice = selectedSKU
    ? selectedSKU.product_price
    : minPrice === maxPrice
    ? minPrice
    : { min: minPrice, max: maxPrice }

  const displayStock = selectedSKU
    ? selectedSKU.available_stock - (selectedSKU.product_reserved || 0)
    : totalStock

  return (
    <Grid2 container rowSpacing="10px">
      <Grid2 size={12}>
        <Typography sx={{ fontSize: '30px', fontWeight: '700' }}>
          {product.product_name}
        </Typography>
      </Grid2>

      <Grid2 size={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: '5px' }}>
            {product?.product_rating_average != 0 && (
              <>
                <Box
                  sx={{ display: 'flex', justifyContent: 'center', marginY: 1 }}
                >
                  {Array.from({
                    length: Math.round(product.product_rating_average)
                  }).map((_, index) => (
                    <StarIcon
                      sx={{ color: yellow[700], fontSize: '15px' }}
                      key={index}
                    />
                  ))}
                </Box>
                <Typography sx={{ color: grey[400] }}>
                  product.product_rating_average
                </Typography>
                <DividerVertical />
              </>
            )}

            <Typography sx={{ color: grey[400] }}>
              {product.product_review_count == 0
                ? 'No ratings yet'
                : `${product.product_review_count} Ratings`}
            </Typography>

            <DividerVertical />

            <Typography sx={{ color: grey[400] }}>
              {`${product.product_sold} Sold`}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ cursor: 'pointer', '&:hover': { fontWeight: '510' } }}
              onClick={handleOpenReportModal}
            >
              Report
            </Typography>
          </Box>
        </Box>
      </Grid2>

      <Grid2 size={12}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '10px'
          }}
        >
          {selectedSKU ? (
            <ProductPrice price={displayPrice} />
          ) : typeof displayPrice === 'number' ? (
            <ProductPrice price={displayPrice} />
          ) : (
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <ProductPrice price={displayPrice.min} />
              <Typography component="span" sx={{ fontSize: '20px' }}>
                –
              </Typography>
              <ProductPrice price={displayPrice.max} />
            </Box>
          )}

          <Typography
            sx={{
              color: displayStock > 0 ? green[700] : grey[400],
              fontWeight: 600
            }}
          >
            {displayStock > 0 ? `In stock (${displayStock})` : 'Out of stock'}
          </Typography>
        </Box>
      </Grid2>

      <Grid2 size={12}>
        <Divider sx={{ marginTop: '10px', mb: '10px' }} />
      </Grid2>

      <Grid2 size={12}>
        <ProductVariation
          variation={product?.product_variations}
          productSKU={product?.products_sku}
          handler={handler}
          ui={ui}
        />
      </Grid2>

      <Grid2 size={12}>
        <Grid container spacing={1} sx={{ marginTop: '30px' }}>
          <Grid size={2}>
            <QuantitySelector
              quantityAvailable={(productSelected ?? product)?.product_stock}
              disableAction={disableAction}
              quantitySelected={quantitySelected}
              setQuantitySelected={setQuantitySelected}
            />
            {/* <Skeleton variant="rounded" width={87} height={40} /> */}
          </Grid>

          <Grid size={5}>
            <Button
              className="btn-user-add-to-cart"
              onClick={() => handleAddProductToCart()}
              sx={{
                width: '100%',
                backgroundColor: blue[500],
                color: 'white',
                textTransform: 'none',
                fontWeight: '600',
                height: '50px',
                pointerEvents: disableAction ? 'none' : 'auto',
                opacity: disableAction ? 0.5 : 1
              }}
            >
              Add To Cart
            </Button>

            {/* <Skeleton variant="rounded" width={230} height={40} /> */}
          </Grid>

          <Grid size={5}>
            <Button
              className="btn-user-buy-now"
              sx={{
                width: '100%',
                color: 'black',
                textTransform: 'none',
                fontWeight: '600',
                border: '1px solid black',
                height: '50px',
                pointerEvents: disableAction ? 'none' : 'auto',
                opacity: disableAction ? 0.5 : 1
              }}
            >
              Buy Now
            </Button>
            {/* <Skeleton variant="rounded" width={230} height={40} /> */}
          </Grid>
        </Grid>
      </Grid2>

      <Grid2 size={12}>
        <ProductShipping />
      </Grid2>

      <Grid2 size={12}>
        <Share />
      </Grid2>
    </Grid2>
  )
}
export default ProductDetailPanel
