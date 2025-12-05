import { authorizedAxios } from '~/utils/authorizedAxios'
import cleanFilters from '~/utils/cleanFilters'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const getCartByCustomerAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/user/cart`,
    {
      params: cleanFilters(payload),
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
    { loadingClass, ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const removeProductsFromCartByCustomerAPI = async ({
  payload,
  loadingClass
}) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/user/cart/products/bulk-delete`,
    payload,
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

export {
  addToCartAPI,
  getCartByCustomerAPI,
  removeProductFromCartByCustomerAPI,
  removeProductsFromCartByCustomerAPI,
  updateCartProductQuantityByCustomerAPI
}
