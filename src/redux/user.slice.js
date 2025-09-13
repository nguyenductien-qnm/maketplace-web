import { authorizedAxios } from '~/utils/authorizedAxios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_ROOT } from '~/utils/constants'
import { navigate } from '~/helpers/navigation'
import { TOAST_MODE } from '~/utils/constants'

const initialState = {
  currentUser: null
}

export const loginAPI = createAsyncThunk(
  'user/loginAPI',
  async ({ data, loadingClass }) => {
    const res = await authorizedAxios.post(
      `${API_ROOT}/v1/api/auth/login`,
      data,
      { loadingClass, ...TOAST_MODE.ALL }
    )
    return res
  }
)

export const verifyAccountAPI = createAsyncThunk(
  'user/verifyAccount',
  async ({ otp }) => {
    const res = await authorizedAxios.get(
      `${API_ROOT}/v1/api/auth/verify-account/${otp}`,
      { ...TOAST_MODE.NONE }
    )
    return res
  }
)

export const setupAccountAPI = createAsyncThunk(
  'user/setupAccount',
  async ({ data, loadingClass }) => {
    const res = await authorizedAxios.post(
      `${API_ROOT}/v1/api/user/setup-account`,
      data,
      { loadingClass, ...TOAST_MODE.ALL }
    )
    return res
  }
)

export const updateUserProfileAPI = createAsyncThunk(
  'user/updateUserProfileAPI',
  async ({ payload, loadingClass }) => {
    const { status, data } = await authorizedAxios.put(
      `${API_ROOT}/v1/api/user/user/profile`,
      payload,
      { loadingClass, ...TOAST_MODE.ALL }
    )
    return { status, resData: data }
  }
)

export const logoutAPI = createAsyncThunk(
  'user/logoutAPI',
  async (toastMode) => {
    const res = await authorizedAxios.get(`${API_ROOT}/v1/api/auth/logout`, {
      ...toastMode
    })
    navigate('/auth/login')
    return res
  }
)

export const accountMigrationAPI = createAsyncThunk(
  'user/accountMigrationAPI',
  async ({ data, loadingClass }) => {
    const res = await authorizedAxios.post(
      `${API_ROOT}/v1/api/user/account-migration`,
      data,
      { loadingClass, ...TOAST_MODE.ALL }
    )
    return res
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginAPI.fulfilled, (state, action) => {
        state.currentUser = action.payload.data.metadata
      })

      .addCase(verifyAccountAPI.fulfilled, (state, action) => {
        state.currentUser = action.payload.data.metadata
      })

      .addCase(setupAccountAPI.fulfilled, (state, action) => {
        state.currentUser = action.payload.data.metadata
      })

      .addCase(updateUserProfileAPI.fulfilled, (state, action) => {
        state.currentUser.user_name =
          action.payload?.resData?.metadata?.user_name
        state.currentUser.user_avatar =
          action.payload?.resData?.metadata?.user_avatar
      })

      .addCase(accountMigrationAPI.fulfilled, (state) => {
        state.currentUser.user_role.push('SHOP')
      })

      .addCase(logoutAPI.fulfilled, (state) => {
        state.currentUser = null
      })
  }
})

export default userSlice.reducer
