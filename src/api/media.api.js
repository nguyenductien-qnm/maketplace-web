import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const initMediaUploadSingleAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/media/init`,
    payload,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data.metadata }
}

const initMediaUploadBatchesAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/media/batches/init`,
    payload,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data.metadata }
}

export { initMediaUploadSingleAPI, initMediaUploadBatchesAPI }
