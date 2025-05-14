import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

const placeOrderAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/order/place-order`,
    data,
    { loadingClass }
  )
  return res
}

const updatePayPalOrderIdAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/order/update-paypal-order-id`,
    data
  )
  return res
}

const queryOrderByUserAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/order/query-order-by-user`,
    data
  )
  return res
}

const getOrderDetailAPI = async (data) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/order/order-detail`,
    data
  )
}

const queryOrderByOwnerAPI = async (data) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/order/query-order-by-owner`,
    data
  )
}

const updateOrderStatusByOwnerAPI = async (data) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/order/update-order-status-by-owner`,
    data
  )
}

const cancelOrderByUserAPI = async (data, loadingClass) => {
  return await authorizedAxios.post(
    `${API_ROOT}/v1/api/order/cancel-order-by-user`,
    data,
    { loadingClass }
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
