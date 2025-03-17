import axios from 'axios'
import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

const getProductByIdAPIForClient = async (_id) => {
  const res = await axios.post(
    `${API_ROOT}/v1/api/product/get-product-by-id-for-customer`,
    { _id }
  )
  return res
}

const searchProductByOwnerAPI = async (payload) => {
  const res = await axios.post(
    `${API_ROOT}/v1/api/product/get-product-by-id-for-customer`,
    payload
  )
  return res
}

export { getProductByIdAPIForClient, searchProductByOwnerAPI }
