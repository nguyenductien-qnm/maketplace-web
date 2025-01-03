import { authorizedAxios } from '~/utils/authorizedAxios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_ROOT } from '~/utils/constants'

const initialState = {
  currentUser: null
}

export const loginAPI = createAsyncThunk(
  'user/loginAPI',
  async ({ email, password }) => {
    const res = await authorizedAxios.post(`${API_ROOT}/v1/api/auth/sign-in`, {
      email,
      password
    })
    console.log('res::::', res)
    return res
  }
)

export const verifyAccountAPI = createAsyncThunk(
  'user/verifyAccount',
  async ({ otp }) => {
    const res = await authorizedAxios.get(
      `${API_ROOT}/v1/api/auth/verify-account/${otp}`
    )
    return res
  }
)

export const setupAccountAPI = createAsyncThunk(
  'user/setupAccount',
  async (data) => {
    const res = await authorizedAxios.post(
      `${API_ROOT}/v1/api/user/setup-account`,
      data
    )
    return res
  }
)

export const updateUserInfoAPI = createAsyncThunk(
  'user/updateUserInfoAPI',
  async (data) => {
    delete data.user_email
    const res = await authorizedAxios.post(
      `${API_ROOT}/v1/api/user/update-info`,
      data
    )
    return res
  }
)

export const accountMigrationAPI = createAsyncThunk(
  'user/accountMigrationAPI',
  async (data) => {
    const res = await authorizedAxios.post(
      `${API_ROOT}/v1/api/user/account-migration`,
      data
    )
    return res
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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
        state.currentUser.user_role.push('shop')
      })
  }
})

export default userSlice.reducer
