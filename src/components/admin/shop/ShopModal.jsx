import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import BannerAndAvatarDisplay from '~/components/vendor/VendorProfile/BannerAndAvatarDisplay'
import TypographyLabel from '~/components/common/TypographyLabel'
import { Box, TextField } from '@mui/material'
import { WEB_ROOT } from '~/utils/constants'
import { formatDate } from '~/utils/formatDate'

function ShopModal({ open, onClose, shop }) {
  const address = shop?.shop_address
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{shop?.shop_name}</DialogTitle>
      <DialogContent>
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
              value={formatDate(shop?.createdAt)}
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
