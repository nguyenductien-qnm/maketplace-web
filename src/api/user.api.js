import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

// ============================ CUSTOMER ============================
const getUserProfileAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/user/user/profile`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const changePasswordByUserAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/auth/change-password`,
    payload,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

const accountMigrationByUserAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/user/user/account-migration`,
    payload,
    { loadingClass, ...TOAST_MODE.ALL }
  )
  return { status, resData: data }
}

const getAddressesByUserAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/user/user/addresses`,
    { ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const createAddressByUserAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.post(
    `${API_ROOT}/v1/api/user/user/addresses`,
    payload,
    { loadingClass, ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const updateAddressByUserAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/user/user/addresses/${payload?._id}`,
    payload,
    { loadingClass, ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const setDefaultAddressByUserAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.put(
    `${API_ROOT}/v1/api/user/user/addresses/default/${payload?._id}`,
    payload,
    { loadingClass, ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
}

const deleteAddressByUserAPI = async ({ payload, loadingClass }) => {
  const { status, data } = await authorizedAxios.delete(
    `${API_ROOT}/v1/api/user/user/addresses/${payload?._id}`,
    { loadingClass, ...TOAST_MODE.ONLY_ERROR }
  )
  return { status, resData: data }
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
    `${API_ROOT}/v1/api/admin/user/get-user-list-for-filter`,
    {
      ...TOAST_MODE.NONE
    }
  )
  return { status, resData: data }
}

const getStaffListForFilterAPI = async () => {
  const { status, data } = await authorizedAxios.get(
    `${API_ROOT}/v1/api/admin/user/get-staff-list-for-filter`,
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
  getUserProfileAPI,
  changePasswordByUserAPI,
  createAddressByUserAPI,
  getAddressesByUserAPI,
  setDefaultAddressByUserAPI,
  deleteAddressByUserAPI,
  updateAddressByUserAPI,
  queryUserByAdminAPI,
  banUserByAdminAPI,
  unbanUserByAdminAPI,
  getUserDetailByAdminAPI,
  updateUserPasswordByAdminAPI,
  exportUserDataAPI,
  getUserListForFilterAPI,
  getStaffListForFilterAPI,
  accountMigrationByUserAPI
}
