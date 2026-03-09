import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'
import cleanFilters from '~/utils/cleanFilters'

// ============================ CUSTOMER ============================
const getProductDetailByCustomerAPI = async ({ product_slug }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/user/product/${product_slug}`,
    { product_slug },
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

// ============================ VENDOR ============================
const queryProductByShopAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/products`,
    {
      params: cleanFilters(payload),
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const getProductDetailByShopAPI = async ({ _id }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/products/${_id}`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const getProductMetricsByShopAPI = async ({ _id }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/products/metrics/${_id}`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const getProductSummaryByShopAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/products/summary`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const createProductByShopAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/shop/products`,
    payload,
    {
      loadingClass,
      ...TOAST_MODE.ALL
    }
  )
  return { status, resData: data }
}

const updateProductByShopAPI = async ({ _id, payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/shop/products/${_id}`,
    payload,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

const deleteProductByShopAPI = async ({ _id, loadingClass }) => {
  const { status, data } = await authorizedAxios.delete(
    `${API_ROOT}/v1/api/shop/products/${_id}`,
    { loadingClass, ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}
// ============================ ADMIN ============================

const queryProductByAdminAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/products`,
    {
      params: cleanFilters(payload),
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const getProductSummaryByAdminAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/products/summary`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const getProductDetailByAdminAPI = async ({ _id }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/products/${_id}`,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const banProductByAdmin = async ({ _id, payload }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/products/ban/${_id}`,
    payload,
    { ...TOAST_MODE.ALL }
  )

  return { status, resData: data }
}

const unbanProductByAdmin = async ({ _id, payload }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/products/unban/${_id}`,
    payload,
    { ...TOAST_MODE.ALL }
  )

  return { status, resData: data }
}

const approveProductByAdmin = async ({ _id, payload }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/products/approve/${_id}`,
    payload,
    { ...TOAST_MODE.ALL }
  )

  return { status, resData: data }
}

const rejectProductByAdmin = async ({ _id, payload }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/products/reject/${_id}`,
    payload,
    { ...TOAST_MODE.ALL }
  )

  return { status, resData: data }
}

const updateProductStatusByAdminAPI = async ({ payload, action }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/product/${action}`,
    payload,
    {
      ...TOAST_MODE.ALL,
      loadingClass
    }
  )
  return { status, resData: data }
}

const exportProductsByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/product/export`,
    payload,
    {
      ...TOAST_MODE.ONLY_ERROR,
      responseType: 'blob',
      loadingClass
    }
  )

  return { status, resData: data }
}

export {
  getProductDetailByCustomerAPI,
  getProductMetricsByShopAPI,
  deleteProductByShopAPI,
  createProductByShopAPI,
  updateProductByShopAPI,
  getProductDetailByShopAPI,
  queryProductByShopAPI,
  queryProductByAdminAPI,
  getProductDetailByAdminAPI,
  updateProductStatusByAdminAPI,
  exportProductsByAdminAPI,
  getProductSummaryByShopAPI,
  getProductSummaryByAdminAPI,
  banProductByAdmin,
  unbanProductByAdmin,
  approveProductByAdmin,
  rejectProductByAdmin
}
