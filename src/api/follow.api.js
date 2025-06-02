import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const getFollowStatusAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/follow/follow-shop-status`,
    data,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

const followShopAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/follow/create`,
    data,
    { ...TOAST_MODE.ONLY_ERROR }
  )

  return res
}

const unfollowShopAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/follow/delete`,
    data,
    { ...TOAST_MODE.ONLY_ERROR }
  )

  return res
}

const toggleFollowNotificationAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/follow/toggle-follow-notification`,
    data,
    { ...TOAST_MODE.ONLY_ERROR }
  )

  return res
}

export {
  getFollowStatusAPI,
  followShopAPI,
  unfollowShopAPI,
  toggleFollowNotificationAPI
}
