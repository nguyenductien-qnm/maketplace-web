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

// ============================ ADMIN ============================
const queryUserByAdminAPI = async ({ payload }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/user/query`,
    payload,
    {
      ...TOAST_MODE.ONLY_ERROR
    }
  )
  return { status, resData: data }
}

const banUserByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/user/update-status/ban`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
}

const unbanUserByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/user/update-status/unban`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
}

const getUserDetailByAdminAPI = async ({ _id }) => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/user/${_id}`,
    {
      ...TOAST_MODE.ALL
    }
  )
  return { status, resData: data }
}

const updateUserPasswordByAdminAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/admin/user/update-password`,
    payload,
    { ...TOAST_MODE.ALL, loadingClass }
  )
  return { status, resData: data }
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

const getStaffListForFilterAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/user/get-staff-list-for-filter`,
    {
      ...TOAST_MODE.NONE
    }
  )
  return { status, resData: data }
}

const exportUserDataAPI = async ({ payload, loadingClass }) => {
  const res = await authorizedAxios.post(
    `${API_ROOT}/v1/api/admin/user/export`,
    payload,
    {
      ...TOAST_MODE.ALL,
      responseType: 'blob',
      loadingClass
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

export {
  getUserInfoAPI,
  changePasswordAPI,
  addNewAddressAPI,
  getAddressListAPI,
  setDefaultAddressAPI,
  deleteAddressAPI,
  updateAddressAPI,
  queryUserByAdminAPI,
  banUserByAdminAPI,
  unbanUserByAdminAPI,
  getUserDetailByAdminAPI,
  updateUserPasswordByAdminAPI,
  exportUserDataAPI,
  getUserListForFilterAPI,
  getStaffListForFilterAPI
}
