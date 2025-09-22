import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import RemoveIcon from '@mui/icons-material/Remove'
import Grid from '@mui/material/Grid2'
import { blue, red } from '@mui/material/colors'
import { useState } from 'react'
import NotificationDialog from '~/components/common/NotificationDialog'

function ActionButton({
  shop,
  handleFollowShop,
  handleUnfollowShop,
  handleToggleFollowNotification,
  followInfo
}) {
  const isNotify = followInfo?.notify_on
  const isFollow = followInfo?.is_following
  const [open, setOpen] = useState(false)
  const content = `
  You can reach out to this shop via:

  **Email:** ${shop.shop_email}  
  **Phone:** ${shop.shop_phone}
  `

  return (
    <Box>
      <Grid
        spacing={4}
        container
        sx={{ width: '100%', marginTop: '80px', padding: '40px' }}
      >
        <Grid size={6}>
          {!isFollow && (
            <Button
              onClick={handleFollowShop}
              fullWidth
              sx={{
                textTransform: 'none',
                backgroundColor: blue[600],
                color: 'white'
              }}
            >
              <AddOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
              Follow
            </Button>
          )}

          {isFollow && (
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Notification
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={isNotify}
                  label="Age"
                  onChange={handleToggleFollowNotification}
                >
                  <MenuItem value={true}>Enable</MenuItem>
                  <MenuItem value={false}>Disable</MenuItem>
                </Select>
              </FormControl>
              <Button
                onClick={handleUnfollowShop}
                fullWidth
                sx={{
                  textTransform: 'none',
                  backgroundColor: red[600],
                  color: 'white'
                }}
              >
                <RemoveIcon fontSize="small" sx={{ marginRight: '5px' }} />
                Unfollow
              </Button>
            </Box>
          )}
        </Grid>
        <Grid size={6}>
          <Button
            onClick={() => setOpen(true)}
            fullWidth
            sx={{ textTransform: 'none', border: '1px solid' }}
          >
            <ChatBubbleOutlineOutlinedIcon
              fontSize="small"
              sx={{ marginRight: '5px' }}
            />
            Chat
          </Button>
        </Grid>
      </Grid>

      <NotificationDialog
        header="Contact Information"
        content={content}
        open={open}
        onClose={() => setOpen(false)}
      />
    </Box>
  )
}
export default ActionButton
