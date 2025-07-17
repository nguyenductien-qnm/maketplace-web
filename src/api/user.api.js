import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const getUserInfoAPI = async () => {
  const res = await authorizedAxios.get(`${API_ROOT}/v1/api/user`, {
    ...TOAST_MODE.NONE
  })
  return res
}

const changePasswordAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/auth/change-password`,
    data,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return res
}

const getAddressListAPI = async () => {
  const res = await authorizedAxios.get(
    `${API_ROOT}/v1/api/user/address-list`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

const addNewAddressAPI = async ({ data, loadingClass }) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/user/add-new-address`,
    data,
    { loadingClass, ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

const setDefaultAddressAPI = async (data, loadingClass) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/user/set-default-address`,
    data,
    { loadingClass, ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

const deleteAddressAPI = async ({ data, loadingClass }) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/user/delete-address`,
    data,
    { loadingClass, ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

const updateAddressAPI = async ({ data, loadingClass }) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/user/update-address`,
    data,
    { loadingClass, ...TOAST_MODE.ONLY_ERROR }
  )
  return res
}

const queryUserByAdminAPI = async ({ data }) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/user/query-user-by-admin`,
    data,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return res
}

const banUserAPI = async ({ data }) => {
  const res = await authorizedAxios.post(`${API_ROOT}/v1/api/user/ban`, data, {
    ...TOAST_MODE.ALL
  })
  return res
}

const unbanUserAPI = async ({ data }) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/user/unban`,
    data,
    {
      ...TOAST_MODE.ALL
    }
  )
  return res
}

const getUserDetailForAdminAPI = async ({ _id }) => {
  const res = await authorizedAxios.get(
    `${API_ROOT}/v1/api/user/detail-for-admin?_id=${_id}`,
    {
      ...TOAST_MODE.ALL
    }
  )
  return res
}

const updateUserPasswordForAdminAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/user/update-user-password-for-admin`,
    data,
    {
      ...TOAST_MODE.ALL
    }
  )
  return res
}

const exportUserDataAPI = async (data) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/user/export`,
    data,
    {
      ...TOAST_MODE.ALL,
      responseType: 'blob'
    }
  )

  const blob = res.data
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'users.csv'
  a.click()
  window.URL.revokeObjectURL(url)

  return res
}

const getUserListForFilterAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/user/get-user-list-for-filter`,
    {
      ...TOAST_MODE.NONE
    }
  )
  return { status, resData: data }
}

export {
  getUserInfoAPI,
  changePasswordAPI,
  addNewAddressAPI,
  getAddressListAPI,
  setDefaultAddressAPI,
  deleteAddressAPI,
  updateAddressAPI,
  queryUserByAdminAPI,
  banUserAPI,
  unbanUserAPI,
  getUserDetailForAdminAPI,
  updateUserPasswordForAdminAPI,
  exportUserDataAPI,
  getUserListForFilterAPI
}
