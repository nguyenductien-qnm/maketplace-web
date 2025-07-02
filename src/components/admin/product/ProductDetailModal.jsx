import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import TypographyLabel from '~/components/common/TypographyLabel'
import { Box, Divider, TextField, Typography } from '@mui/material'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import formatCurrency from '~/utils/formatCurrency'
import ReadOnlyTextField from '~/components/common/ReadOnlyTextField'

function ProductDetailModal({ open, onClose, product }) {
  const dimensions = product?.product_dimensions
  const attributes = product?.product_specs
  const sku = product?.product_sku
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Product Detail</DialogTitle>
      <DialogContent>
        {!product && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 5
            }}
          >
            <CircularIndeterminate />
          </Box>
        )}

        {product && (
          <Box>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Box sx={{ flex: 1, width: '180px' }}>
                <TypographyLabel>Product thumb</TypographyLabel>
                <img src={product?.product_thumb} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Product gallery</TypographyLabel>
                <Box sx={{ display: 'flex' }}>
                  {product?.product_gallery?.map((g) => (
                    <img src={g} />
                  ))}
                </Box>
              </Box>
            </Box>

            <Box sx={{ flex: 1 }}>
              <TypographyLabel>Product name</TypographyLabel>
              <ReadOnlyTextField value={product?.product_name} rows={2} />
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Product min price</TypographyLabel>
                <ReadOnlyTextField
                  value={formatCurrency(product?.product_min_price)}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Product max price</TypographyLabel>
                <ReadOnlyTextField
                  value={formatCurrency(product?.product_max_price)}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Product stock</TypographyLabel>
                <ReadOnlyTextField value={product?.product_stock} />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Product min price</TypographyLabel>
                <ReadOnlyTextField
                  value={formatCurrency(product?.product_min_price)}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Product max price</TypographyLabel>
                <ReadOnlyTextField
                  value={formatCurrency(product?.product_max_price)}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Product stock</TypographyLabel>
                <ReadOnlyTextField value={product?.product_stock} />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Length (cm)</TypographyLabel>
                <ReadOnlyTextField value={dimensions?.length} />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Width (cm)</TypographyLabel>
                <ReadOnlyTextField value={dimensions?.width} />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Height (cm)</TypographyLabel>
                <ReadOnlyTextField value={dimensions?.height} />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Weight (kg)</TypographyLabel>
                <ReadOnlyTextField value={dimensions?.weight} />
              </Box>
            </Box>

            <Box sx={{ flex: 1 }}>
              <TypographyLabel>Categories</TypographyLabel>
              <ReadOnlyTextField
                value={product?.product_categories?.map((c) => c)}
              />
            </Box>

            <Box sx={{ mt: 1 }}>
              <TypographyLabel>Product attributes</TypographyLabel>
              {attributes?.map((a) => (
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <ReadOnlyTextField value={a?.key} />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <ReadOnlyTextField value={a?.value} />
                  </Box>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Product status</TypographyLabel>
                <ReadOnlyTextField value={product?.product_status} />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Product visibility</TypographyLabel>
                <ReadOnlyTextField value={product?.product_visibility} />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Product description</TypographyLabel>
                <ReadOnlyTextField
                  value={product?.product_description}
                  rows={10}
                />
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductDetailModal
