import Button from '@mui/material/Button'
import TypographyLabel from '~/components/common/TypographyLabel'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import ReadOnlyTextField from '~/components/common/ReadOnlyTextField'
import Typography from '@mui/material/Typography'
import ReactQuill from 'react-quill'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Grid2 from '@mui/material/Grid2'
import TypographyTitle from '~/components/common/TypographyTitle'
import TableCellHeader from '~/components/common/TableCellHeader'
import ShopCard from '~/components/user/Home/ShopCard'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'
import findCategoryName from '~/utils/findCategoryName'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import LightboxImage from '~/components/common/LightboxImage'
import { blue, grey } from '@mui/material/colors'
import { modalConfig, modalStyle } from '~/config/modal'
import { WEB_ROOT } from '~/utils/constants'
import { useState } from 'react'
import formatCurrency from '~/utils/formatCurrency'
import { Alert } from '@mui/material'
import 'react-quill/dist/quill.snow.css'

const statusColor = (status) => {
  if (status == 'pending') return 'info'
  if (status == 'approved') return 'success'
  if (status == 'rejected') return 'warning'
  if (status == 'banned') return 'error'
}

function ProductDetailModal({
  loading,
  loadingAuditLog,
  open,
  onClose,
  productDetail,
  categories,
  handler
}) {
  const [openLightbox, setOpenLightbox] = useState(false)
  const [src, setSrc] = useState(null)
  const { product, log } = productDetail || {}
  const { handleGetAuditLogDetail } = handler

  return (
    <>
      <Modal open={open} onClose={onClose} {...modalConfig}>
        <Fade in={open}>
          <Box sx={modalStyle(1000)}>
            <Box
              sx={{
                p: '0px 24px 8px 0px',
                paddingTop: 0,
                flexShrink: 0
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <TypographyTitle>Product Detail Information</TypographyTitle>
                <HighlightOffIcon
                  color="error"
                  onClick={onClose}
                  sx={{ cursor: 'pointer' }}
                />
              </Box>
              <Divider sx={{ mt: 1, mb: 2 }} />
            </Box>

            <Box
              sx={{
                flex: 1,
                overflowY: 'auto'
              }}
            >
              {loading && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 5,
                    mb: 8
                  }}
                >
                  <CircularIndeterminate />
                </Box>
              )}

              {!loading && product && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Card sx={{ p: 3 }}>
                    <TypographyTitle sx={{ mb: 1 }}>Status</TypographyTitle>

                    <Alert severity={statusColor(product.product_status)}>
                      {capitalizeFirstLetter(product.product_status)}
                    </Alert>

                    {loadingAuditLog && (
                      <Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mt: 5,
                            mb: 8
                          }}
                        >
                          <CircularIndeterminate />
                        </Box>
                      </Box>
                    )}

                    {!loadingAuditLog &&
                      !log &&
                      product.product_status != 'pending' && (
                        <Button
                          onClick={() => handleGetAuditLogDetail(product)}
                          sx={{ mt: 3 }}
                          variant="outlined"
                        >
                          View Audit Log
                        </Button>
                      )}

                    {!loadingAuditLog && log && (
                      <Grid2 container spacing={3} sx={{ mt: 2 }}>
                        <Grid2 size={6}>
                          <TypographyLabel>Admin Name</TypographyLabel>
                          <ReadOnlyTextField value={log.admin_id.user_name} />
                        </Grid2>

                        <Grid2 size={6}>
                          <TypographyLabel>Admin Email</TypographyLabel>
                          <ReadOnlyTextField value={log.admin_id.user_email} />
                        </Grid2>

                        <Grid2 size={6}>
                          <TypographyLabel>Action Performed</TypographyLabel>
                          <ReadOnlyTextField
                            value={capitalizeFirstLetter(log.action)}
                          />
                        </Grid2>

                        <Grid2 size={6}>
                          <TypographyLabel>Action Timestamp</TypographyLabel>
                          <ReadOnlyTextField value={log.createdAt} />
                        </Grid2>

                        <Grid2 size={12}>
                          <TypographyLabel>Reason / Notes</TypographyLabel>
                          <ReactQuill
                            readOnly={true}
                            theme="snow"
                            value={log?.reason || ''}
                          />
                        </Grid2>
                      </Grid2>
                    )}
                  </Card>

                  <Card sx={{ p: 3 }}>
                    <TypographyTitle sx={{ mb: 3 }}>
                      Shop Information
                    </TypographyTitle>

                    <Grid2 container spacing={2} sx={{ mt: 2 }}>
                      <ShopCard shop={product?.shop} />
                    </Grid2>
                  </Card>

                  <Card sx={{ p: 3 }}>
                    <TypographyTitle sx={{ mb: 3 }}>
                      Basic Information
                    </TypographyTitle>
                    <Grid2 container rowSpacing={3} sx={{ mt: 2 }}>
                      <Grid2 size={12}>
                        <TypographyLabel>Product Images</TypographyLabel>
                        <Grid2
                          container
                          spacing={2}
                          rowSpacing={2}
                          sx={{
                            display: 'flex',
                            gap: 2,
                            flexWrap: 'wrap',
                            width: '100%',
                            border: '1px dashed',
                            borderColor: 'grey',
                            borderRadius: '4px',
                            padding: '10px'
                          }}
                        >
                          {product?.product_images &&
                            product.product_images.map((img, index) => (
                              <Grid2 key={index} size={2}>
                                <Box
                                  sx={{
                                    position: 'relative',
                                    width: '133px',
                                    height: '133px',
                                    '&:hover .delete-overlay': {
                                      opacity: 1
                                    }
                                  }}
                                >
                                  <Box
                                    onClick={() => {
                                      setSrc(img.url), setOpenLightbox(true)
                                    }}
                                    component="img"
                                    src={img.url}
                                    alt="preview"
                                    sx={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover',
                                      border: 'dashed',
                                      borderColor:
                                        index == 0 ? blue[600] : 'lightgrey',
                                      borderWidth: index == 0 ? '2px' : '1px',
                                      borderRadius: '4px',
                                      display: 'block',
                                      cursor: 'pointer'
                                    }}
                                  />
                                </Box>
                              </Grid2>
                            ))}
                        </Grid2>
                      </Grid2>

                      <Grid2 size={12}>
                        <Box sx={{ flex: 1 }}>
                          <TypographyLabel>Product Name</TypographyLabel>
                          <ReadOnlyTextField value={product?.product_name} />
                        </Box>
                      </Grid2>

                      <Grid2 size={12}>
                        <Box sx={{ flex: 1 }}>
                          <TypographyLabel>Product Slug</TypographyLabel>
                          <ReadOnlyTextField
                            value={`${WEB_ROOT}/product/${product?.product_slug}`}
                          />
                        </Box>
                      </Grid2>

                      <Grid2 size={12}>
                        <Box sx={{ flex: 1 }}>
                          <TypographyLabel>Product Code</TypographyLabel>
                          <ReadOnlyTextField value={product?.product_code} />
                        </Box>
                      </Grid2>
                      <Grid2 size={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Box sx={{ flex: 1 }}>
                            <TypographyLabel>
                              Product Visibility
                            </TypographyLabel>
                            <ReadOnlyTextField
                              value={capitalizeFirstLetter(
                                product?.product_visibility
                              )}
                            />
                          </Box>

                          <Box sx={{ flex: 1 }}>
                            <TypographyLabel>Product Category</TypographyLabel>
                            <ReadOnlyTextField
                              value={findCategoryName({
                                categoryTree: categories,
                                categoryCode: product?.product_category
                              })}
                            />
                          </Box>
                        </Box>
                      </Grid2>
                      <Grid2 size={12}>
                        <Box sx={{ flex: 1 }}>
                          <TypographyLabel>Product description</TypographyLabel>
                          <ReactQuill
                            readOnly={true}
                            theme="snow"
                            value={product?.product_description || ''}
                          />
                        </Box>
                      </Grid2>
                    </Grid2>
                  </Card>

                  <Card sx={{ p: 3 }}>
                    <TypographyTitle sx={{ mb: 3 }}>
                      Detail Information
                    </TypographyTitle>
                    <Grid2 container rowSpacing={3} sx={{ mt: 2 }}>
                      <Grid2 size={12}>
                        <Box sx={{ flex: 1 }}>
                          <TypographyLabel>Product Tags</TypographyLabel>
                          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                            {product?.product_tags?.map((a, i) => (
                              <Chip key={i} label={a} variant="outlined" />
                            ))}
                          </Box>
                        </Box>
                      </Grid2>
                      <Grid2 size={12}>
                        <TypographyLabel>Product Attributes</TypographyLabel>
                        {product?.product_attributes?.map(
                          (attribute, index) => (
                            <Box
                              key={index}
                              sx={{ display: 'flex', gap: 2, mt: 2 }}
                            >
                              <ReadOnlyTextField value={attribute.key} />
                              <ReadOnlyTextField value={attribute.value} />
                            </Box>
                          )
                        )}
                      </Grid2>
                      <Grid2 size={12}></Grid2>
                      <Grid2 size={12}></Grid2>
                    </Grid2>
                  </Card>

                  <Card sx={{ p: 3 }}>
                    <TypographyTitle>Sale Information</TypographyTitle>
                    {product?.product_variations?.length == 0 && (
                      <Grid2 container spacing={2} sx={{ mt: 2 }}>
                        <Grid2 size={6}>
                          <TypographyLabel>Product Price</TypographyLabel>
                          <ReadOnlyTextField
                            value={formatCurrency(
                              product.products_sku[0].product_price
                            )}
                          />
                        </Grid2>
                        <Grid2 size={6}>
                          <TypographyLabel>Product Stock</TypographyLabel>
                          <ReadOnlyTextField
                            value={product.products_sku[0].product_stock}
                          />
                        </Grid2>

                        <Grid2 size={6}>
                          <TypographyLabel>Product Sold</TypographyLabel>
                          <ReadOnlyTextField
                            value={product.products_sku[0].product_sold}
                          />
                        </Grid2>

                        <Grid2 size={6}>
                          <TypographyLabel>Product Revenue</TypographyLabel>
                          <ReadOnlyTextField
                            value={product.products_sku[0].product_revenue}
                          />
                        </Grid2>
                      </Grid2>
                    )}

                    {product?.product_variations?.length > 0 && (
                      <>
                        <Grid2 container rowSpacing={2} sx={{ mt: 2 }}>
                          {product?.product_variations &&
                            product.product_variations.map(
                              (variation, index) => (
                                <Grid2
                                  size={12}
                                  sx={{
                                    backgroundColor: grey[100],
                                    p: 3,
                                    borderRadius: '5px'
                                  }}
                                >
                                  <Grid2 container rowSpacing={2}>
                                    <Grid2 size={12}>
                                      <TypographyLabel>
                                        Variation {index + 1}
                                      </TypographyLabel>
                                      <ReadOnlyTextField
                                        value={variation.name}
                                      />
                                    </Grid2>

                                    <Grid2 size={12}>
                                      <TypographyLabel>Options</TypographyLabel>
                                      <Grid2 container spacing={2}>
                                        {variation.options.map((opt, index) => (
                                          <Grid2 key={index} size={4}>
                                            <ReadOnlyTextField value={opt} />
                                          </Grid2>
                                        ))}
                                      </Grid2>
                                    </Grid2>
                                  </Grid2>
                                </Grid2>
                              )
                            )}
                        </Grid2>

                        <TableContainer
                          sx={{ maxHeight: 700, overflowY: 'auto', mt: 3 }}
                        >
                          <Table stickyHeader>
                            <TableHead sx={{ backgroundColor: grey[100] }}>
                              <TableRow>
                                {product?.product_variations?.map(
                                  (variation, index) => (
                                    <TableCellHeader key={index}>
                                      {variation.name ||
                                        `Variation ${index + 1}`}
                                    </TableCellHeader>
                                  )
                                )}
                                <TableCellHeader>Price</TableCellHeader>
                                <TableCellHeader>Stock</TableCellHeader>
                                <TableCellHeader>Sold</TableCellHeader>
                                <TableCellHeader>Revenue</TableCellHeader>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {product?.products_sku
                                .slice()
                                .sort((a, b) => {
                                  const diff1 =
                                    a.sku_tier_indices[0] -
                                    b.sku_tier_indices[0]
                                  if (diff1 !== 0) return diff1
                                  return (
                                    (a.sku_tier_indices[1] || 0) -
                                    (b.sku_tier_indices[1] || 0)
                                  )
                                })
                                .map((sku, index, sortedArray) => {
                                  const [idx1, idx2] =
                                    sku.sku_tier_indices || []

                                  const option1 =
                                    product.product_variations?.[0]?.options?.[
                                      idx1
                                    ]
                                  const option2 =
                                    product.product_variations?.[1]?.options?.[
                                      idx2
                                    ]

                                  const isFirstRowOfOption1 =
                                    index === 0 ||
                                    sortedArray[index - 1]
                                      ?.sku_tier_indices?.[0] !== idx1

                                  const rowSpanCount = sortedArray.filter(
                                    (s) => s.sku_tier_indices?.[0] === idx1
                                  ).length

                                  return (
                                    <TableRow key={sku._id || index}>
                                      {isFirstRowOfOption1 && (
                                        <TableCell rowSpan={rowSpanCount}>
                                          {option1 || '-'}
                                        </TableCell>
                                      )}

                                      {option2 && (
                                        <TableCell>{option2 || '-'}</TableCell>
                                      )}

                                      <TableCell>
                                        <Typography>
                                          {formatCurrency(sku.product_price)}
                                        </Typography>
                                      </TableCell>

                                      <TableCell>
                                        <Typography>
                                          {sku.product_stock}
                                        </Typography>
                                      </TableCell>

                                      <TableCell>
                                        <Typography>
                                          {sku.product_sold}
                                        </Typography>
                                      </TableCell>

                                      <TableCell>
                                        <Typography>
                                          {formatCurrency(sku.product_revenue)}
                                        </Typography>
                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </>
                    )}
                  </Card>

                  <Card sx={{ p: 3 }}>
                    <TypographyTitle sx={{ mb: 3 }}>
                      Delivery Information
                    </TypographyTitle>

                    <Grid2 container spacing={2} sx={{ mt: 2 }}>
                      <Grid2 size={3}>
                        <TypographyLabel>Length (cm)</TypographyLabel>
                        <ReadOnlyTextField
                          value={product.product_dimensions.length}
                        />
                      </Grid2>

                      <Grid2 size={3}>
                        <TypographyLabel>Width (cm)</TypographyLabel>
                        <ReadOnlyTextField
                          value={product.product_dimensions.width}
                        />
                      </Grid2>

                      <Grid2 size={3}>
                        <TypographyLabel>Height (cm)</TypographyLabel>
                        <ReadOnlyTextField
                          value={product.product_dimensions.height}
                        />
                      </Grid2>

                      <Grid2 size={3}>
                        <TypographyLabel>Weight (kg)</TypographyLabel>
                        <ReadOnlyTextField
                          value={product.product_dimensions.weight}
                        />
                      </Grid2>
                    </Grid2>
                  </Card>

                  <Card sx={{ p: 3 }}>
                    <TypographyTitle>Performance</TypographyTitle>
                    <Grid2 container spacing={2} sx={{ mt: 2 }}>
                      <Grid2 size={4}>
                        <TypographyLabel>Product Sold</TypographyLabel>
                        <ReadOnlyTextField value={product?.product_sold} />
                      </Grid2>

                      <Grid2 size={4}>
                        <TypographyLabel>Product Rating</TypographyLabel>
                        <ReadOnlyTextField
                          value={product?.product_rating_average}
                        />
                      </Grid2>

                      <Grid2 size={4}>
                        <TypographyLabel>Product Review Count</TypographyLabel>
                        <ReadOnlyTextField
                          value={product?.product_review_count}
                        />
                      </Grid2>

                      <Grid2 size={4}>
                        <TypographyLabel>Product Revenue</TypographyLabel>
                        <ReadOnlyTextField value={product?.product_revenue} />
                      </Grid2>

                      <Grid2 size={4}>
                        <TypographyLabel>Product Reported</TypographyLabel>
                        <ReadOnlyTextField
                          value={product?.product_report_count}
                        />
                      </Grid2>

                      <Grid2 size={4}>
                        <TypographyLabel>Product Views</TypographyLabel>
                        <ReadOnlyTextField value={product?.product_views} />
                      </Grid2>
                    </Grid2>
                  </Card>

                  <Card sx={{ p: 3 }}>
                    <TypographyTitle>Metadata</TypographyTitle>
                    <Grid2 container spacing={2} sx={{ mt: 2 }}>
                      <Grid2 size={6}>
                        <TypographyLabel>Created At</TypographyLabel>
                        <ReadOnlyTextField value={product?.createdAt} />
                      </Grid2>

                      <Grid2 size={6}>
                        <TypographyLabel>Updated At</TypographyLabel>
                        <ReadOnlyTextField value={product?.updatedAt} />
                      </Grid2>
                    </Grid2>
                  </Card>
                </Box>
              )}
            </Box>

            <Box
              sx={{
                p: '24px 24px 0px 24px',
                borderTop: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'flex-end',
                flexShrink: 0
              }}
            >
              <Button color="secondary" variant="outlined" onClick={onClose}>
                Close
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {openLightbox && (
        <LightboxImage src={src} onClose={() => setOpenLightbox(false)} />
      )}
    </>
  )
}

export default ProductDetailModal
