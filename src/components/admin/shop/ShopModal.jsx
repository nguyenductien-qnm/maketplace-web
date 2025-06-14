import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import BannerAndAvatarDisplay from '~/components/vendor/VendorProfile/BannerAndAvatarDisplay'
import TypographyLabel from '~/components/common/TypographyLabel'
import { Box, TextField } from '@mui/material'
import { WEB_ROOT } from '~/utils/constants'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'

function ShopModal({ open, onClose, shop }) {
  const address = shop?.shop_address
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Shop Detail</DialogTitle>
      <DialogContent>
        {!shop && (
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
        {shop && (
          <Box>
            <BannerAndAvatarDisplay
              shopBanner={shop?.shop_banner}
              shopAvatar={shop?.shop_avatar}
            />
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Shop name</TypographyLabel>
                <TextField
                  size="small"
                  value={shop?.shop_name}
                  disabled
                  fullWidth
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Shop email</TypographyLabel>
                <TextField
                  size="small"
                  value={shop?.shop_email}
                  disabled
                  fullWidth
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Shop phone</TypographyLabel>
                <TextField
                  size="small"
                  value={shop?.shop_phone}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Shop status</TypographyLabel>
                <TextField
                  size="small"
                  value={shop?.shop_status}
                  disabled
                  fullWidth
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Product count</TypographyLabel>
                <TextField
                  size="small"
                  value={shop?.shop_product_count}
                  disabled
                  fullWidth
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Follower</TypographyLabel>
                <TextField
                  size="small"
                  value={shop?.shop_follower_count}
                  disabled
                  fullWidth
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Rating</TypographyLabel>
                <TextField
                  size="small"
                  value={shop?.shop_rating}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Created at</TypographyLabel>
                <TextField
                  size="small"
                  value={shop?.createdAt}
                  disabled
                  fullWidth
                />
              </Box>
            </Box>

            <Box sx={{ mt: 1 }}>
              <TypographyLabel>Shop url</TypographyLabel>
              <TextField
                size="small"
                value={WEB_ROOT + '/shop/' + shop?.shop_slug}
                disabled
                fullWidth
              />
            </Box>

            <Box sx={{ mt: 1 }}>
              <TypographyLabel>Shop province</TypographyLabel>
              <TextField
                fullWidth
                size="small"
                value={
                  address?.street +
                  ', ' +
                  address?.ward?.WardName +
                  ', ' +
                  address?.district?.DistrictName +
                  ',' +
                  address?.province?.ProvinceName
                }
                disabled
              />
            </Box>

            <Box sx={{ mt: 1 }}>
              <TypographyLabel>Shop intro</TypographyLabel>
              <TextField
                size="small"
                value={shop?.shop_intro}
                disabled
                fullWidth
                multiline
                rows={5}
              />
            </Box>
            {shop?.shop_status === 'block' && (
              <Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <TypographyLabel>Banned By</TypographyLabel>
                    <TextField
                      size="small"
                      value={shop?.ban_info?.banned_by}
                      disabled
                      fullWidth
                    />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <TypographyLabel>Banned Email</TypographyLabel>
                    <TextField
                      size="small"
                      value={shop?.ban_info?.banned_email}
                      disabled
                      fullWidth
                    />
                  </Box>
                </Box>

                <Box sx={{ mt: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <TypographyLabel>Banned At</TypographyLabel>
                    <TextField
                      value={shop?.ban_info?.banned_at}
                      size="small"
                      disabled
                      fullWidth
                    />
                  </Box>
                </Box>

                <Box sx={{ mt: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <TypographyLabel>Reason</TypographyLabel>
                    <TextField
                      multiline
                      rows={5}
                      value={shop?.ban_info?.reason}
                      size="small"
                      disabled
                      fullWidth
                    />
                  </Box>
                </Box>
              </Box>
            )}
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

export default ShopModal
