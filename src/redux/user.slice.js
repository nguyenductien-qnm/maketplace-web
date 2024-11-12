import { authorizedAxios } from '~/utils/authorizedAxios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_ROOT } from '~/utils/constants'

const initialState = {
  currentUser: null
}

export const loginAPI = createAsyncThunk(
  'user/loginAPI',
  async ({ email, password }) => {
    const response = await authorizedAxios.post(
      `${API_ROOT}/v1/api/auth/sign-in`,
      {
        email,
        password
      }
    )
    return response.data
  }
)

export const verifyAccount = createAsyncThunk(
  'user/verifyAccount',
  async ({ otp }) => {
    const res = await authorizedAxios.get(
      `${API_ROOT}/v1/api/auth/verify-account/${otp}`
    )
    return { status: res.status, metadata: res.data.metadata }
  }
)

export const setupAccount = createAsyncThunk(
  'user/setupAccount',
  async (data) => {
    const result = await authorizedAxios.post(
      `${API_ROOT}/v1/api/user/setup-account`,
      rest
    )
    return result.data
  }
)

export const updateUserInfoAPI = createAsyncThunk(
  'user/updateUserInfoAPI',
  async (data) => {
    delete data.user_email
    const result = await authorizedAxios.post(
      `${API_ROOT}/v1/api/user/update-info`,
      data
    )
    console.log('resultAPI::::', result)
    return result.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAPI.fulfilled, (state, action) => {
        state.currentUser = action.payload.metadata.user
      })

      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.currentUser = action.payload.metadata
      })

      .addCase(setupAccount.fulfilled, (state, action) => {
        state.currentUser = action.payload.metadata
      })

      .addCase(updateUserInfoAPI.fulfilled, (state, action) => {
        state.currentUser.user_name = action.payload.metadata.user_name
        state.currentUser.user_avatar = action.payload.metadata.user_avatar
      })
  }
})

export default userSlice.reducer
