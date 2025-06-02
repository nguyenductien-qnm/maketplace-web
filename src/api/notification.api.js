import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const getNotificationByUserAPI = async () => {
  const res = await authorizedAxios.get(
    `${API_ROOT}/v1/api/notification/user`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

export { getNotificationByUserAPI }
