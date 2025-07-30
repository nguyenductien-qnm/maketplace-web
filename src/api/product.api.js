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
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/product/query-product-by-owner`,
    payloads,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

const getDetailProductByOwnerAPI = async (_id) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/product/get-product-by-id`,
    { _id },
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return res
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

const createProductAPI = async (data, loadingClass) => {
  await authorizedAxios.post(`${API_ROOT}/v1/api/product/create`, data, {
    loadingClass,
    ...TOAST_MODE.ALL
  })
}

const updateProductAPI = async (data, loadingClass) => {
  await authorizedAxios.post(`${API_ROOT}/v1/api/product/update`, data, {
    loadingClass,
    ...TOAST_MODE.ALL
  })
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

export {
  getProductDetailForCustomerAPI,
  searchProductByOwnerAPI,
  softDeleteProductAPI,
  deletePermanentProductAPI,
  restoreProductAPI,
  createProductAPI,
  updateProductAPI,
  getDetailProductByOwnerAPI,
  queryProductByOwnerAPI,
  queryProductByAdminAPI,
  getProductDetailByAdminAPI,
  updateProductStatusByAdminAPI
}
