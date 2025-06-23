import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import TypographyLabel from '~/components/common/TypographyLabel'
import { Box, Divider, TextField, Typography } from '@mui/material'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import formatCurrency from '~/utils/formatCurrency'

function OrderDetailModal({ open, onClose, order }) {
  const address = order?.order_address

  const addressText =
    address?.full_name +
    ' - ' +
    address?.phone_number +
    ', ' +
    address?.street +
    ', ' +
    address?.ward_name +
    ', ' +
    address?.district_name +
    ', ' +
    address?.province_name
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Order Detail</DialogTitle>
      <DialogContent>
        {!order && (
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

        {order && (
          <Box>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Shop name</TypographyLabel>
                <TextField
                  size="small"
                  value={order?.shop_name}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Payment method</TypographyLabel>
                <TextField
                  size="small"
                  value={order?.order_payment_method}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Payment status</TypographyLabel>
                <TextField
                  size="small"
                  value={order?.order_payment_status}
                  disabled
                  fullWidth
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Status</TypographyLabel>
                <TextField
                  size="small"
                  value={order?.order_status}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Tracking number</TypographyLabel>
                <TextField
                  size="small"
                  value={order?.order_tracking_number}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Created at</TypographyLabel>
                <TextField
                  size="small"
                  value={order?.createdAt}
                  disabled
                  fullWidth
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Discount(s) applied</TypographyLabel>
                <TextField
                  size="small"
                  value={order?.order_voucher_ids.length}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Discount</TypographyLabel>
                <TextField
                  size="small"
                  value={formatCurrency(order?.order_voucher_discount)}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Merchandise price</TypographyLabel>
                <TextField
                  size="small"
                  value={formatCurrency(order?.order_merchandise_price)}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Shipping price</TypographyLabel>
                <TextField
                  size="small"
                  value={formatCurrency(order?.order_shipping_price)}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Total price</TypographyLabel>
                <TextField
                  size="small"
                  value={formatCurrency(order?.order_total_price)}
                  disabled
                  fullWidth
                />
              </Box>
            </Box>

            <Box sx={{ mt: 2 }}>
              <TypographyLabel>Address</TypographyLabel>
              <TextField size="small" value={addressText} disabled fullWidth />
            </Box>

            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
              Product list{' '}
              <Typography
                component="span"
                sx={{
                  fontSize: '14px',
                  fontWeight: 'normal',
                  color: 'text.secondary'
                }}
              >
                (Total products: {order?.order_products?.length ?? 0})
              </Typography>
            </Typography>

            {order?.order_products?.map((p) => (
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <img src={p?.product_thumb} />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%'
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <TypographyLabel>Product name</TypographyLabel>
                    <TextField
                      size="small"
                      value={p?.product_name}
                      disabled
                      fullWidth
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <TypographyLabel>Product quantity</TypographyLabel>
                    <TextField
                      size="small"
                      value={p?.quantity}
                      disabled
                      fullWidth
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <TypographyLabel>Product price</TypographyLabel>
                    <TextField
                      size="small"
                      value={p?.price}
                      disabled
                      fullWidth
                    />
                  </Box>
                </Box>
              </Box>
            ))}
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

export default OrderDetailModal
