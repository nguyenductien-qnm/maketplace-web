import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import TypographyTitle from '~/components/common/TypographyTitle'
import formatCurrency from '~/utils/formatCurrency'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { grey } from '@mui/material/colors'
import { modalConfig, modalStyle } from '~/config/modal'
import TableCellHeader from '~/components/common/TableCellHeader'
import TypographyLabel from '~/components/common/TypographyLabel'
import { Grid2 } from '@mui/material'
import ReadOnlyTextField from '~/components/common/ReadOnlyTextField'

function ProductMetricsModal({ loading, open, onClose, data }) {
  const {
    spu_metrics,
    metrics_active,
    metrics_deleted,
    sku,
    variations,
    type
  } = data

  const skuMap = new Map(sku?.map((s) => [s.product_code, s.sku_tier_indices]))

  const getVariationText = (metric) => {
    const tier = skuMap.get(metric.product_code)
    if (!tier || tier.length === 0) return 'Not available'

    const firstOption = variations[0]?.options[tier[0]] ?? ''

    if (tier.length > 1) {
      const secondOption = variations[1]?.options[tier[1]] ?? ''
      return `${firstOption} - ${secondOption}`
    }

    return firstOption
  }

  return (
    <Modal open={open} onClose={onClose} {...modalConfig}>
      <Fade in={open}>
        <Box sx={modalStyle(700)}>
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
              <TypographyTitle>Product Metrics</TypographyTitle>
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
                  mt: '50px',
                  mb: '50px'
                }}
              >
                <CircularIndeterminate />
              </Box>
            )}

            {!loading && (
              <Box>
                <Grid2 container spacing={2}>
                  <Grid2 size={4}>
                    <TypographyLabel>Product Sold</TypographyLabel>
                    <ReadOnlyTextField value={spu_metrics.product_sold} />
                  </Grid2>
                  <Grid2 size={4}>
                    <TypographyLabel>Product Rating</TypographyLabel>
                    <ReadOnlyTextField
                      value={spu_metrics.product_rating_average}
                    />
                  </Grid2>
                  <Grid2 size={4}>
                    <TypographyLabel>Product Review Count</TypographyLabel>
                    <ReadOnlyTextField
                      value={spu_metrics.product_review_count}
                    />
                  </Grid2>
                  <Grid2 size={4}>
                    <TypographyLabel>Product Revenue</TypographyLabel>
                    <ReadOnlyTextField value={spu_metrics.product_revenue} />
                  </Grid2>
                  <Grid2 size={4}>
                    <TypographyLabel>Product Reported</TypographyLabel>
                    <ReadOnlyTextField
                      value={spu_metrics.product_report_count}
                    />
                  </Grid2>
                  <Grid2 size={4}>
                    <TypographyLabel>Product Views</TypographyLabel>
                    <ReadOnlyTextField value={spu_metrics.product_views} />
                  </Grid2>
                </Grid2>
                <Box sx={{ mt: 3 }}>
                  <TypographyLabel sx={{ mb: 2 }}>
                    Product SKU Active
                  </TypographyLabel>
                  <TableContainer>
                    <Table>
                      <TableHead sx={{ backgroundColor: grey[100] }}>
                        <TableRow>
                          <TableCellHeader>Variation</TableCellHeader>
                          <TableCellHeader>CODE</TableCellHeader>
                          <TableCellHeader>Sold</TableCellHeader>
                          <TableCellHeader>Revenue</TableCellHeader>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {metrics_active?.map((metric, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell>
                                {type == 'simple' && 'Default'}
                                {type == 'variable' && getVariationText(metric)}
                              </TableCell>
                              <TableCell>{metric.product_code}</TableCell>
                              <TableCell>{metric.product_sold}</TableCell>
                              <TableCell>
                                {formatCurrency(metric.product_revenue)}
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                {metrics_deleted && metrics_deleted.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <TypographyLabel sx={{ mb: 2 }}>
                      Product SKU Deleted
                    </TypographyLabel>
                    <TableContainer>
                      <Table>
                        <TableHead sx={{ backgroundColor: grey[100] }}>
                          <TableRow>
                            <TableCell>Variation</TableCell>
                            <TableCell>CODE</TableCell>
                            <TableCell>Sold</TableCell>
                            <TableCell>Revenue</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {metrics_deleted?.map((metric, index) => {
                            return (
                              <TableRow key={index}>
                                <TableCell>Not available</TableCell>
                                <TableCell>{metric.product_code}</TableCell>
                                <TableCell>{metric.product_sold}</TableCell>
                                <TableCell>
                                  {formatCurrency(metric.product_revenue)}
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}
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
  )
}
export default ProductMetricsModal
