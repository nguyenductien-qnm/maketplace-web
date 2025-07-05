import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const queryCategoriesByAdminAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/category/admin`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const queryCategoryDetailByAdminAPI = async ({ id, parent }) => {
  const isRoot = parent === 0
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/category/admin/${id}`,
    {
      params: { root: isRoot },
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const createCategoryRootAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/category/admin/root`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
}

const createCategoryChildAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/category/admin/child`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
}

const updateCategoryRootByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/category/admin/root`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
}

const updateCategoryChildByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/category/admin/child`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
}

const updateCategoryPositionAPI = async ({ payload }) => {
  try {
    const { status, data } = await authorizedAxios.put(
      `${API_ROOT}/v1/api/category/admin/update-position`,
      payload,
      { ...TOAST_MODE.ONLY_ERROR }
    )
    return { status, resData: data }
  } catch (e) {
    const { status } = e
    return { status }
  }
}

const deleteCategoryByAdminAPI = async ({ _id, payload, loadingClass }) => {
  const { status } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/category/admin/${_id}/delete`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status }
}

export {
  createCategoryRootAPI,
  queryCategoriesByAdminAPI,
  createCategoryChildAPI,
  queryCategoryDetailByAdminAPI,
  updateCategoryRootByAdminAPI,
  updateCategoryChildByAdminAPI,
  updateCategoryPositionAPI,
  deleteCategoryByAdminAPI
}
