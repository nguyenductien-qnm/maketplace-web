import { StatusCodes } from 'http-status-codes'
import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

// ============================ CUSTOMER ============================
const placeOrderAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/order/place-order`,
    data,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return res
}

const cancelOrderByUserAPI = async (data, loadingClass) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/order/cancel-order-by-user`,
    data,
    { loadingClass, ...TOAST_MODE.ALL }
  )
}

const updatePayPalOrderIdAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/order/update-paypal-order-id`,
    data,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}
const queryOrderByUserAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/order/query-order-by-user`,
    data,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

// ============================ VENDOR ============================

const getOrderDetailAPI = async (data) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/order/order-detail`,
    data,
    { ...TOAST_MODE.ONLY_ERROR }
  )
}

const queryOrderByOwnerAPI = async (data) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/order/query-order-by-owner`,
    data,
    { ...TOAST_MODE.ONLY_ERROR }
  )
}

const updateOrderStatusByOwnerAPI = async (data) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/order/update-order-status-by-owner`,
    data,
    { ...TOAST_MODE.ALL }
  )
}

// ============================ ADMIN ============================

const queryOrderByAdminAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/order/query`,
    payload,
    { ...TOAST_MODE.ONLY_ERROR }
  )

  return { status, resData: data }
}

const getOrderDetailByAdminAPI = async ({ _id }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/order/${_id}`,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const updateOrderStatusToShippingAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/order/mark-as-shipping`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
}

const updateOrderStatusToDeliveredAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/order/mark-as-delivered`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
}

const exportOrderDataByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/order/export`,
    payload,
    { ...TOAST_MODE.ONLY_ERROR, responseType: 'blob', loadingClass }
  )
  return { status, resData: data }
}

export {
  placeOrderAPI,
  updatePayPalOrderIdAPI,
  queryOrderByUserAPI,
  getOrderDetailAPI,
  queryOrderByOwnerAPI,
  updateOrderStatusByOwnerAPI,
  cancelOrderByUserAPI,
  queryOrderByAdminAPI,
  getOrderDetailByAdminAPI,
  updateOrderStatusToShippingAPI,
  updateOrderStatusToDeliveredAPI,
  exportOrderDataByAdminAPI
}
