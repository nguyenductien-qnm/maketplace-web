import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const addToCartAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/cart/add-to-cart`,
    data,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return res
}

const getCartProductsAPI = async () => {
  const res = await authorizedAxios.get(
    `${API_ROOT}/v1/api/cart/get-cart-products`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

const removeProductAPI = async (_id, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/cart/remove-product`,
    _id,
    { loadingClass, ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

const updateQuantityProductCartAPI = async (product, newQuantity) => {
  try {
    const res = await authorizedAxios.post(
      `${API_ROOT}/v1/api/cart/update-quantity-product-cart`,
      { product, newQuantity },
      {
        ...TOAST_MODE.NONE
      }
    )
    return res
  } catch (error) {
    return {
      status: error.response ? error.response.status : 500,
      message: error.response.data.message
    }
  }
}

const checkoutAPI = async (data, loadingClass) => {
  try {
    const res = await authorizedAxios.post(
      `${API_ROOT}/v1/api/cart/checkout`,
      data,
      { loadingClass, ...TOAST_MODE.ONLY_ERROR }
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

const prepareCheckoutAPI = async (data, loadingClass) => {
  try {
    const res = await authorizedAxios.post(
      `${API_ROOT}/v1/api/cart/prepare-checkout`,
      data,
      { loadingClass, ...TOAST_MODE.ONLY_ERROR }
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

const clearCartAPI = async (selectedProducts, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/cart/clear-cart`,
    {
      selectedProducts
    },
    { loadingClass, ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

export {
  addToCartAPI,
  getCartProductsAPI,
  removeProductAPI,
  updateQuantityProductCartAPI,
  clearCartAPI,
  checkoutAPI,
  prepareCheckoutAPI
}
