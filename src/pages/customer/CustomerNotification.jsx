import Box from '@mui/material/Box'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import EmptyNotification from '~/components/shared/Notification/EmptyNotification'
import NotificationItem from '~/components/shared/Notification/NotificationItem'
import { useUserNotification } from '~/hooks/user/notification.hook'

function CustomerNotifications() {
  const { loading, notifications } = useUserNotification()
  return (
    <Box>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '50px' }}>
          <CircularIndeterminate />
        </Box>
      )}
      {!loading && notifications?.length === 0 && <EmptyNotification />}
      {!loading &&
        notifications?.length > 0 &&
        notifications?.map((notification) => (
          <NotificationItem
            key={notification?._id}
            notification={notification}
          />
        ))}
    </Box>
  )
}
export default CustomerNotifications
