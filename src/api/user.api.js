import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

const getUserInfoAPI = async () => {
  const res = await authorizedAxios.get(`${API_ROOT}/v1/api/user`)
  return res
}

const changePasswordAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/auth/change-password`,
    data,
    { loadingClass }
  )
  return res
}

const addNewAddressAPI = async ({ data, loadingClass }) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/user/add-new-address`,
    data,
    { loadingClass }
  )
  return res
}

const getAddressListAPI = async () => {
  const res = await authorizedAxios.get(`${API_ROOT}/v1/api/user/address-list`)
  return res
}

const setDefaultAddressAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/user/set-default-address`,
    data,
    { loadingClass }
  )
  return res
}

const deleteAddressAPI = async ({ data, loadingClass }) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/user/delete-address`,
    data,
    { loadingClass }
  )
  return res
}

const updateAddressAPI = async ({ data, loadingClass }) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/user/update-address`,
    data,
    { loadingClass }
  )
  return res
}

export {
  getUserInfoAPI,
  changePasswordAPI,
  addNewAddressAPI,
  getAddressListAPI,
  setDefaultAddressAPI,
  deleteAddressAPI,
  updateAddressAPI
}
