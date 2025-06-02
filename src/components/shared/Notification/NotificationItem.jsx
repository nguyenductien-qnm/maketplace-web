import Box from '@mui/material/Box'
import Markdown from 'react-markdown'
import { Link as MuiLink } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
function NotificationItem({ notification, small = false }) {
  if (!notification) return null

  return (
    <Box
      sx={{
        width: small ? '400px' : '100%',
        backgroundColor: notification.read ? 'transparent' : '#f5f5f5'
      }}
      display="flex"
      alignItems="center"
      gap={2}
      p={small ? 1 : 2}
      borderBottom="1px solid #eee"
    >
      <Box>
        <img
          src={notification?.meta?.shop_avatar}
          alt="Shop Avatar"
          width={48}
          height={48}
          style={{ borderRadius: '50%' }}
        />
      </Box>

      <Box flex={1}>
        <Markdown>{notification?.content}</Markdown>

        {!small && (
          <MuiLink
            component={RouterLink}
            to={`/product/${notification.meta.product_slug}`}
            sx={{
              '&:hover': {
                color: 'primary.main',
                textDecoration: 'underline'
              }
            }}
          >
            View product now
          </MuiLink>
        )}
      </Box>
    </Box>
  )
}

export default NotificationItem
