import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'
// ============================ VENDOR ============================
const getCategoriesByOwnerAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/shop/categories`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const getShopCategoriesAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/shop/categories`,
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

const queryCategoryByAdminAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/categories`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const getCategoryDetailByAdminAPI = async ({ _id }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/categories/${_id}`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const getCategoryFormSnapshotAPI = async ({ _id }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/categories/${_id}/form`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const createRootCategoryByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/categories/root`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
}

const createChildCategoryByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/categories/child`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
}

const updateRootCategoryByAdminAPI = async ({ _id, payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/categories/${_id}/root`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
}

const updateChildCategoryByAdminAPI = async ({
  _id,
  payload,
  loadingClass
}) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/categories/${_id}/child`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
}

const updateCategoryRootByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/categories/${_id}/child`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
}

const updateCategoryChildByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/categories/child`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
}

const updateCategoryPositionByAdminAPI = async ({ _id, payload }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/categories/${_id}/position`,
    payload,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const deleteCategoryByAdminAPI = async ({ _id, loadingClass }) => {
  const { status, data } = await authorizedAxios.delete(
    `${API_ROOT}/v1/api/admin/categories/${_id}`,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
}

const exportCategoryDataByAdminAPI = async ({ loadingClass }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/category/export`,
    {
      ...TOAST_MODE.ONLY_ERROR,
      responseType: 'blob',
      loadingClass
    }
  )

  return { status, resData: data }
}

// ============================ COMMON ============================
const getCategoriesAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/categories`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const getCategoryTreeAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/categories`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

export {
  createRootCategoryByAdminAPI,
  queryCategoryByAdminAPI,
  createChildCategoryByAdminAPI,
  getCategoryDetailByAdminAPI,
  updateCategoryChildByAdminAPI,
  updateCategoryPositionByAdminAPI,
  deleteCategoryByAdminAPI,
  getCategoriesRootByAdminAPI,
  getCategoriesAPI,
  exportCategoryDataByAdminAPI,
  getCategoriesByOwnerAPI,
  getCategoryFormSnapshotAPI,
  updateRootCategoryByAdminAPI,
  updateChildCategoryByAdminAPI,
  updateCategoryRootByAdminAPI, // delete,
  getCategoryTreeAPI,
  getShopCategoriesAPI
}
