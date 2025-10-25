import {
  Box,
  Button,
  Divider,
  Fade,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { grey } from '@mui/material/colors'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import TypographyTitle from '~/components/common/TypographyTitle'
import { modalConfig, modalStyle } from '~/config/modal'
import formatCurrency from '~/utils/formatCurrency'

function ProductMetricsModal({ loading, open, onClose, data }) {
  const { metrics_active, metrics_deleted, sku, variations, type } = data
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
          <TypographyTitle>Product Metrics</TypographyTitle>
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
              <Divider sx={{ mt: 1 }} />
              <Box sx={{ mt: 3 }}>
                <Typography sx={{ mb: 1 }}>Product SKU Active</Typography>
                <TableContainer sx={{ maxHeight: 800, overflowY: 'auto' }}>
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
                  <Typography sx={{ mb: 1 }}>Product SKU Deleted</Typography>
                  <TableContainer sx={{ maxHeight: 800, overflowY: 'auto' }}>
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 3,
              gap: 1
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
