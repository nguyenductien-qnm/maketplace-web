import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const checkoutByCustomerAPI = async ({ payload, loadingClass }) => {
  try {
    console.log('ok')
    const { status, data } = await authorizedAxios.post(
      `${API_ROOT}/v1/api/user/checkout`,
      payload,
      { loadingClass, ...TOAST_MODE.ONLY_ERROR }
    )
    return { status, resData: data }
  } catch (error) {
    return {
      status: error.response ? error.response.status : 500,
      message: error.data.message,
      metadata: error.data?.metadata
    }
  }
}

const updateCheckoutVoucherAPI = async ({ payload, loadingClass }) => {
  try {
    const { status, data } = await authorizedAxios.post(
      `${API_ROOT}/v1/api/user/checkout/voucher`,
      payload,
      { loadingClass, ...TOAST_MODE.ONLY_ERROR }
    )
    return { status, resData: data }
  } catch (error) {
    return {
      status: error.response ? error.response.status : 500,
      message: error.data.message,
      metadata: error.data?.metadata
    }
  }
}

const updateCheckoutAddressAPI = async ({ payload, loadingClass }) => {
  try {
    const { status, data } = await authorizedAxios.post(
      `${API_ROOT}/v1/api/user/checkout/address`,
      payload,
      { loadingClass, ...TOAST_MODE.ONLY_ERROR }
    )
    return { status, resData: data }
  } catch (error) {
    return {
      status: error.response ? error.response.status : 500,
      message: error.data.message,
      metadata: error.data?.metadata
    }
  }
}

const updateCheckoutPaymentMethodAPI = async ({ payload, loadingClass }) => {
  try {
    const { status, data } = await authorizedAxios.post(
      `${API_ROOT}/v1/api/user/checkout/payment-method`,
      payload,
      { loadingClass, ...TOAST_MODE.ONLY_ERROR }
    )
    return { status, resData: data }
  } catch (error) {
    return {
      status: error.response ? error.response.status : 500,
      message: error.data.message,
      metadata: error.data?.metadata
    }
  }
}

export {
  checkoutByCustomerAPI,
  updateCheckoutVoucherAPI,
  updateCheckoutAddressAPI,
  updateCheckoutPaymentMethodAPI
}
