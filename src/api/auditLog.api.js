import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const ACTION_FROM_STATUS = {
  approved: 'approve',
  rejected: 'reject',
  banned: 'ban'
}

const getAuditLogDetailAPI = async ({ _id, entity, action }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/audit-log?entity_id=${_id}&entity_type=${entity}&action=${ACTION_FROM_STATUS[action]}`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

export { getAuditLogDetailAPI }
