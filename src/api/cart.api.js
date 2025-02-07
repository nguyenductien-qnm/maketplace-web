import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

const addToCartAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/cart/add-to-cart`,
    data
  )
  return res
}

const getCartProductsAPI = async () => {
  const res = await authorizedAxios.get(
    `${API_ROOT}/v1/api/cart/get-cart-products`
  )
  return res
}

export { addToCartAPI, getCartProductsAPI }
