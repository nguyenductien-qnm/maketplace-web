import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const queryProductByOwnerAPI = async (payloads) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/product/query-product-by-owner`,
    payloads,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

const getProductDetailForCustomerAPI = async (product_slug) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/product/get-product-for-customer`,
    { product_slug },
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

const queryProductByAdminAPI = async (data) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/product/query-by-admin`,
    data,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
}

const getProductDetailByAdminAPI = async ({ _id }) => {
  return await authorizedAxios.get(
    `${API_ROOT}/v1/api/product/detail-by-admin?_id=${_id}`,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
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
  getProductDetailByAdminAPI
}
