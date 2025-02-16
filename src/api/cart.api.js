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

const removeProductAPI = async (_id) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/cart/remove-product`,
    _id
  )
  return res
}

const updateQuantityProductCartAPI = async (product, newQuantity) => {
  try {
    const res = await authorizedAxios.post(
      `${API_ROOT}/v1/api/cart/update-quantity-product-cart`,
      { product, newQuantity }
    )
    return res
  } catch (error) {
    return {
      status: error.response ? error.response.status : 500,
      message: error.data.message
    }
  }
}

const checkoutAPI = async (data) => {
  try {
    const res = await authorizedAxios.post(
      `${API_ROOT}/v1/api/cart/checkout`,
      data
    )
    return res
  } catch (error) {
    return {
      status: error.response ? error.response.status : 500,
      message: error.data.message,
      metadata: error.data?.metadata
    }
  }
}

const clearCartAPI = async (selectedProducts) => {
  const res = await authorizedAxios.post(`${API_ROOT}/v1/api/cart/clear-cart`, {
    selectedProducts
  })
  return res
}

export {
  addToCartAPI,
  getCartProductsAPI,
  removeProductAPI,
  updateQuantityProductCartAPI,
  clearCartAPI,
  checkoutAPI
}
