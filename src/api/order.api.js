import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const placeOrderAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/order/place-order`,
    data,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return res
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

const cancelOrderByUserAPI = async (data, loadingClass) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/order/cancel-order-by-user`,
    data,
    { loadingClass, ...TOAST_MODE.ALL }
  )
}

export {
  placeOrderAPI,
  updatePayPalOrderIdAPI,
  queryOrderByUserAPI,
  getOrderDetailAPI,
  queryOrderByOwnerAPI,
  updateOrderStatusByOwnerAPI,
  cancelOrderByUserAPI
}
