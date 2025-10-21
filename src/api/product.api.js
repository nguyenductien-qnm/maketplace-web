import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

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
const queryProductByOwnerAPI = async (payloads) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/shop/product`,
    payloads,
    { ...TOAST_MODE.ONLY_ERROR }
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

const createProductByOwnerAPI = async ({ payload, loadingClass }) => {
  await authorizedAxios.post(`${API_ROOT}/v1/api/shop/product`, payload, {
    loadingClass,
    ...TOAST_MODE.ALL
  })
}

const updateProductByOwnerAPI = async ({ _id, payload, loadingClass }) => {
  await authorizedAxios.put(`${API_ROOT}/v1/api/shop/product/${_id}`, payload, {
    loadingClass,
    ...TOAST_MODE.ALL
  })
}

const searchProductByOwnerAPI = async (payload) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/product/get-product-for-customer`,
    payload,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

const softDeleteProductAPI = async (_id) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/product/soft-delete`,
    {
      _id
    },
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

const deletePermanentProductAPI = async (_id) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/product/delete-permanent`,
    {
      _id
    },
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

const restoreProductAPI = async (_id) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/product/restore`,
    {
      _id
    },
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

// ============================ ADMIN ============================

const queryProductByAdminAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/product/query`,
    payload,
    {
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
  searchProductByOwnerAPI,
  softDeleteProductAPI,
  deletePermanentProductAPI,
  restoreProductAPI,
  createProductByOwnerAPI,
  updateProductByOwnerAPI,
  getProductDetailByOwnerAPI,
  queryProductByOwnerAPI,
  queryProductByAdminAPI,
  getProductDetailByAdminAPI,
  updateProductStatusByAdminAPI,
  exportProductsByAdminAPI
}
