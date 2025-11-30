import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const getCartByCustomerAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/user/cart`,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const addToCartAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/cart/add-to-cart`,
    data,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return res
}

const removeProductFromCartByCustomerAPI = async ({ _id, loadingClass }) => {
  const { status, data } = await authorizedAxios.delete(
    `${API_ROOT}/v1/api/user/cart/product/${_id}`,
    _id,
    { loadingClass, ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const updateCartProductQuantityByCustomerAPI = async ({
  product_id,
  payload
}) => {
  try {
    const { status, data } = await authorizedAxios.put(
      `${API_ROOT}/v1/api/user/cart/product/${product_id}`,
      payload,
      { ...TOAST_MODE.ONLY_ERROR }
    )
    return { status, resData: data }
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
  getCartByCustomerAPI,
  removeProductFromCartByCustomerAPI,
  updateCartProductQuantityByCustomerAPI,
  clearCartAPI,
  checkoutAPI,
  prepareCheckoutAPI
}
