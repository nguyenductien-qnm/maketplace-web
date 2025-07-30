import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

// ============================ COMMON ============================
const getCategoriesAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/category`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

// ============================ ADMIN ============================

const getCategoriesRootByAdminAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/category/root`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const queryCategoriesByAdminAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/category`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const queryCategoryDetailByAdminAPI = async ({ id, parent }) => {
  const isRoot = parent === 0
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/category/${id}`,
    {
      params: { root: isRoot },
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const createCategoryRootAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/category/root`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
}

const createCategoryChildAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/category/child`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
}

const updateCategoryRootByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/category/root`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
}

const updateCategoryChildByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/category/child`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
}

const updateCategoryPositionAPI = async ({ payload }) => {
  try {
    const { status, data } = await authorizedAxios.put(
      `${API_ROOT}/v1/api/admin/category/update-position`,
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
    `${API_ROOT}/v1/api/admin/category/${_id}/delete`,
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
  deleteCategoryByAdminAPI,
  getCategoriesRootByAdminAPI,
  getCategoriesAPI
}
