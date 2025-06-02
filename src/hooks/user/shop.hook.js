import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  followShopAPI,
  getFollowStatusAPI,
  toggleFollowNotificationAPI,
  unfollowShopAPI
} from '~/api/follow.api'
import { getShopByUserAPI } from '~/api/shop.api'

export const useCustomerShop = () => {
  const user = useSelector((state) => state.user.currentUser)
  const [shop, setShop] = useState({})
  const { shop_slug } = useParams()
  const [followInfo, setFollowInfo] = useState({
    is_following: false,
    notify_on: false
  })

  useEffect(() => {
    const fetchShop = async () => {
      const res = await getShopByUserAPI({ shop_slug })
      setShop(res?.data?.metadata || {})
    }

    fetchShop()
  }, [shop_slug])

  useEffect(() => {
    const fetchFollowStatus = async () => {
      if (!user || !shop._id) return
      const res = await getFollowStatusAPI({ shop_id: shop._id })
      setFollowInfo(res?.data?.metadata)
    }

    fetchFollowStatus()
  }, [user, shop])

  const handleFollowShop = async () => {
    const res = await followShopAPI({ shop_id: shop?._id })
    if (res.status === 200)
      setFollowInfo({ is_following: true, notify_on: true })
  }

  const handleUnfollowShop = async () => {
    const res = await unfollowShopAPI({ shop_id: shop?._id })
    if (res.status === 200)
      setFollowInfo({ is_following: false, notify_on: false })
  }

  const handleToggleFollowNotification = async () => {
    const res = await toggleFollowNotificationAPI({ shop_id: shop?._id })
    if (res.status === 200)
      setFollowInfo((prev) => ({
        ...prev,
        notify_on: !prev.notify_on
      }))
  }

  return {
    shop,
    followInfo,
    handleFollowShop,
    handleUnfollowShop,
    handleToggleFollowNotification
  }
}
