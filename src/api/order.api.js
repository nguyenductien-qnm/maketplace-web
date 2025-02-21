import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

const placeOrderAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/order/place-order`,
    data
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

const getOrdersByUserAPI = async () => {
  const res = await authorizedAxios.get(
    `${API_ROOT}/v1/api/order/get-orders-by-user`
  )
  return res
}

export { placeOrderAPI, updatePayPalOrderIdAPI, getOrdersByUserAPI }
