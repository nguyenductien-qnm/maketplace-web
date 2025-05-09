import axios from 'axios'
import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

const getProductDetailForCustomerAPI = async (product_slug) => {
  const res = await axios.post(
    `${API_ROOT}/v1/api/product/get-product-for-customer`,
    { product_slug }
  )
  return res
}

const getDetailProductByOwnerAPI = async (_id) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/product/get-product-by-id`,
    { _id }
  )
  return res
}

const searchProductByOwnerAPI = async (payload) => {
  const res = await axios.post(
    `${API_ROOT}/v1/api/product/get-product-for-customer`,
    payload
  )
  return res
}

const softDeleteProductAPI = async (_id) => {
  const res = await axios.post(`${API_ROOT}/v1/api/product/soft-delete`, {
    _id
  })
  return res
}

const deletePermanentProductAPI = async (_id) => {
  const res = await axios.post(`${API_ROOT}/v1/api/product/delete-permanent`, {
    _id
  })
  return res
}

const restoreProductAPI = async (_id) => {
  const res = await axios.post(`${API_ROOT}/v1/api/product/restore`, {
    _id
  })
  return res
}

const createProductAPI = async (data, loadingClass) => {
  await authorizedAxios.post(`${API_ROOT}/v1/api/product/create`, data, {
    loadingClass
  })
}

const updateProductAPI = async (data, loadingClass) => {
  await authorizedAxios.post(`${API_ROOT}/v1/api/product/update`, data, {
    loadingClass
  })
}

export {
  getProductDetailForCustomerAPI,
  searchProductByOwnerAPI,
  softDeleteProductAPI,
  deletePermanentProductAPI,
  restoreProductAPI,
  createProductAPI,
  updateProductAPI,
  getDetailProductByOwnerAPI
}
