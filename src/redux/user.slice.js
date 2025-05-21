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
      `${API_ROOT}/v1/api/auth/setup-account`,
      data,
      { loadingClass, ...TOAST_MODE.ALL }
    )
    return res
  }
)

export const updateUserInfoAPI = createAsyncThunk(
  'user/updateUserInfoAPI',
  async ({ data, loadingClass }) => {
    delete data.user_email
    const res = await authorizedAxios.post(
      `${API_ROOT}/v1/api/user/update-info`,
      data,
      { loadingClass, ...TOAST_MODE.ALL }
    )
    return res
  }
)

export const logoutAPI = createAsyncThunk(
  'user/logoutAPI',
  async ({ toastMode }) => {
    const res = await authorizedAxios.get(`${API_ROOT}/v1/api/auth/logout`, {
      toastMode
    })
    navigate('/auth/login')
    return res
  }
)

export const accountMigrationAPI = createAsyncThunk(
  'user/accountMigrationAPI',
  async (data) => {
    const res = await authorizedAxios.post(
      `${API_ROOT}/v1/api/user/account-migration`,
      data,
      { ...TOAST_MODE.ALL }
    )
    return res
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null
    }
  },
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

      .addCase(updateUserInfoAPI.fulfilled, (state, action) => {
        state.currentUser.user_name = action.payload.data.metadata.user_name
        state.currentUser.user_avatar = action.payload.data.metadata.user_avatar
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
