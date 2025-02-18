import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

const placeOrderAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/order/place-order`,
    data
  )
  return res
}

export { placeOrderAPI }
