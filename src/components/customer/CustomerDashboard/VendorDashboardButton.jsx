import { Box, Typography } from '@mui/material'
import { blue, red } from '@mui/material/colors'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function VendorDashboardButton() {
  const shopCountNotification = useSelector(
    (state) => state.notification.shop_notifications_count
  )

  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      <Link
        style={{
          fontSize: '14px',
          padding: '10px 20px',
          fontWeight: '600',
          color: 'white',
          backgroundColor: blue[600],
          borderRadius: '5px',
          textDecoration: 'none'
        }}
        to="/vendor/dashboard"
      >
        Go to vendor dashboard
      </Link>

      {shopCountNotification > 0 && (
        <Typography
          component={Link}
          to="/vendor/notifications"
          sx={{
            mt: 1,
            color: 'text.secondary',
            cursor: 'pointer',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            },
            userSelect: 'none'
          }}
        >
          (You have{' '}
          <Box
            component="span"
            sx={{
              color: red[600],
              fontWeight: 'bold'
            }}
          >
            {shopCountNotification}
          </Box>{' '}
          new notification{shopCountNotification > 1 ? 's' : ''})
        </Typography>
      )}
    </Box>
  )
}

export default VendorDashboardButton
