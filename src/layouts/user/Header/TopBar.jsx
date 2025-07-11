import styled from '@emotion/styled'
import { Badge, Box, Popover, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { navigate } from '~/helpers/navigation'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import NotificationItem from '~/components/shared/Notification/NotificationItem'
const TypographyCustom = styled(Typography)({
  color: grey[600],
  fontSize: '12px',
  fontWeight: '700',
  '&:hover': {
    cursor: 'pointer',
    color: grey[900]
  }
})

function TopBar() {
  const userNotificationCount = useSelector(
    (state) => state.notification.user_notifications_count
  )

  const userNotifications = useSelector(
    (state) => state.notification.user_notifications
  )

  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '40px'
      }}
    >
      <Box sx={{ display: 'flex', gap: '20px' }}>
        <TypographyCustom>FAQ</TypographyCustom>
        <TypographyCustom>My Account</TypographyCustom>
        <TypographyCustom>About Us</TypographyCustom>
        <TypographyCustom>Contact</TypographyCustom>
      </Box>

      <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Box
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          onClick={() => navigate('/my-account/notifications')}
          sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          <Badge
            color="error"
            variant="dot"
            invisible={!userNotificationCount || userNotificationCount === 0}
          >
            <NotificationsNoneIcon fontSize="small" />
          </Badge>

          <TypographyCustom>Notifications</TypographyCustom>
          <Popover
            id="mouse-over-popover"
            sx={{ pointerEvents: 'none' }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            {userNotifications?.map((notification) => (
              <NotificationItem
                key={notification?._id}
                notification={notification}
                small={true}
              />
            ))}
          </Popover>
        </Box>
        <TypographyCustom>Order Tracking</TypographyCustom>
        <TypographyCustom>English</TypographyCustom>
        <TypographyCustom>USD</TypographyCustom>
      </Box>
    </Box>
  )
}

export default TopBar
