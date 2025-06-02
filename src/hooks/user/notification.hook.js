import { useEffect, useState } from 'react'
import { getNotificationByUserAPI } from '~/api/notification.api'

export const useUserNotification = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getNotificationByUserAPI()
        setNotifications(res?.data?.metadata || [])
      } finally {
        setLoading(false)
      }
    }
    fetchNotifications()
  }, [])

  return {
    loading,
    notifications
  }
}
