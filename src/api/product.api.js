import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'
import cleanFilters from '~/utils/cleanFilters'

// ============================ CUSTOMER ============================
const getProductDetailForCustomerAPI = async (product_slug) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/product/get-product-for-customer`,
    { product_slug },
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}
// ============================ VENDOR ============================
const queryProductByOwnerAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/product`,
    {
      params: cleanFilters(payload),
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const getProductDetailByOwnerAPI = async ({ _id }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/product/${_id}`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const getProductMetricsByOwnerAPI = async ({ _id }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/product/metrics/${_id}`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const createProductByOwnerAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/shop/product`,
    payload,
    {
      loadingClass,
      ...TOAST_MODE.ALL
    }
  )
  return { status, resData: data }
}

const updateProductByOwnerAPI = async ({ _id, payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/shop/product/${_id}`,
    payload,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

const deleteProductByOwnerAPI = async ({ _id, loadingClass }) => {
  const { status, data } = await authorizedAxios.delete(
    `${API_ROOT}/v1/api/shop/product/${_id}`,
    { loadingClass, ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}
// ============================ ADMIN ============================

const queryProductByAdminAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/product`,
    {
      params: cleanFilters(payload),
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const getProductDetailByAdminAPI = async ({ _id }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/product/${_id}`,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const updateProductStatusByAdminAPI = async ({
  payload,
  loadingClass,
  action
}) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/product/update-status/${action}`,
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
  getProductDetailForCustomerAPI,
  getProductMetricsByOwnerAPI,
  deleteProductByOwnerAPI,
  createProductByOwnerAPI,
  updateProductByOwnerAPI,
  getProductDetailByOwnerAPI,
  queryProductByOwnerAPI,
  queryProductByAdminAPI,
  getProductDetailByAdminAPI,
  updateProductStatusByAdminAPI,
  exportProductsByAdminAPI
}
