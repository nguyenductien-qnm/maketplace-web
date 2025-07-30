import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import TypographyLabel from '~/components/common/TypographyLabel'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import formatCurrency from '~/utils/formatCurrency'
import ReadOnlyTextField from '~/components/common/ReadOnlyTextField'
import findCategoryName from '~/utils/findCategoryName'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { WEB_ROOT } from '~/utils/constants'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'

function ProductDetailModal({ open, onClose, product, categories }) {
  const dimensions = product?.product_dimensions
  const attributes = product?.product_specs
  const sku = product?.product_sku?.map((skuItem) => {
    const mapped = {}
    product.product_classifications.forEach((cls, i) => {
      const name = cls.name
      mapped[name] =
        skuItem?.[name] ?? cls.options?.[skuItem?.sku_tier_indices?.[i]] ?? ''
    })
    return {
      ...mapped,
      _id: skuItem._id.toString(),
      price: skuItem.product_price.toString(),
      stock: skuItem.product_stock.toString()
    }
  })
  const variants = product?.product_classifications

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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 1, width: '200px' }}>
                <TypographyLabel>Product thumb</TypographyLabel>
                <img src={product?.product_thumb} />
              </Box>
              <Box sx={{ flex: 10 }}>
                <TypographyLabel>Product gallery</TypographyLabel>
                <Box sx={{ display: 'flex' }}>
                  {product?.product_gallery?.map((g, i) => (
                    <img key={i} style={{ width: '150px' }} src={g} />
                  ))}
                </Box>
              </Box>
            </Box>

            <Box sx={{ flex: 1 }}>
              <TypographyLabel>Product name</TypographyLabel>
              <ReadOnlyTextField value={product?.product_name} rows={2} />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
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

            <Box sx={{ display: 'flex', gap: 2 }}>
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
              <TypographyLabel>Product category</TypographyLabel>
              <ReadOnlyTextField
                value={findCategoryName({
                  categoryTree: categories,
                  categoryCode: product?.product_category
                })}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <TypographyLabel>Product attributes</TypographyLabel>
              {attributes?.map((a, i) => (
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }} key={i}>
                  <Box sx={{ flex: 1 }}>
                    <ReadOnlyTextField value={a?.key} />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <ReadOnlyTextField value={a?.value} />
                  </Box>
                </Box>
              ))}
            </Box>

            <Box sx={{ flex: 1 }}>
              <TypographyLabel>Product tags</TypographyLabel>
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                {product?.product_tags?.map((a, i) => (
                  <Chip key={i} label={a} variant="outlined" />
                ))}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Product status</TypographyLabel>
                <ReadOnlyTextField
                  value={capitalizeFirstLetter(product?.product_status)}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Product visibility</TypographyLabel>
                <ReadOnlyTextField
                  value={capitalizeFirstLetter(product?.product_visibility)}
                />
              </Box>
            </Box>

            {sku && (
              <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                <TypographyLabel>Product SKU</TypographyLabel>
                {sku?.map((p, index) => (
                  <Paper
                    key={index}
                    sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 2 }}
                  >
                    <Box sx={{ flex: 1, maxWidth: '300px', minWidth: '200px' }}>
                      <TypographyLabel>Product Price</TypographyLabel>
                      <ReadOnlyTextField
                        value={formatCurrency(sku[index]?.price)}
                      />
                    </Box>

                    <Box sx={{ flex: 1, maxWidth: '300px', minWidth: '200px' }}>
                      <TypographyLabel>Product Stock</TypographyLabel>
                      <ReadOnlyTextField value={sku[index]?.stock} />
                    </Box>

                    {variants?.map((v, i) => (
                      <Box
                        sx={{ flex: 1, maxWidth: '300px', minWidth: '200px' }}
                        key={i}
                      >
                        <TypographyLabel>{v.name}</TypographyLabel>
                        <ReadOnlyTextField value={sku[index]?.[v.name]} />
                      </Box>
                    ))}
                  </Paper>
                ))}
              </Box>
            )}

            <Box sx={{ flex: 1 }}>
              <TypographyLabel>Product description</TypographyLabel>
              <ReactQuill
                readOnly={true}
                theme="snow"
                value={product?.product_description || ''}
              />
            </Box>

            <Divider sx={{ mt: 1, mb: 1 }} />

            <Box sx={{ flex: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Product slug</TypographyLabel>
                <ReadOnlyTextField
                  value={`${WEB_ROOT}/product/${product?.product_slug}`}
                  rows={2}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Product sold</TypographyLabel>
                <ReadOnlyTextField value={product?.product_sold} />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Reserved stock</TypographyLabel>
                <ReadOnlyTextField value={product?.reserved_stock} />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Rating</TypographyLabel>
                <ReadOnlyTextField value={product?.product_rating_average} />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Review</TypographyLabel>
                <ReadOnlyTextField value={product?.product_review_count} />
              </Box>

              <Box sx={{ flex: 2 }}>
                <TypographyLabel>Created at</TypographyLabel>
                <ReadOnlyTextField value={product?.createdAt} />
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
