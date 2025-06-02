import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

const initialState = {
  user_notifications: [],
  user_notifications_count: null,
  shop_notifications_count: null
}

export const fetchNotificationUserAPI = createAsyncThunk(
  'notification/fetchNotificationUserAPI',
  async () => {
    const res = await authorizedAxios.get(
      `${API_ROOT}/v1/api/notification/user`
    )
    return res
  }
)

export const countUnreadNotificationUserAPI = createAsyncThunk(
  'notification/countUnreadNotificationUserAPI',
  async () => {
    const res = await authorizedAxios.get(
      `${API_ROOT}/v1/api/notification/user/count-unread`
    )
    return res
  }
)

export const markNotificationAsRead = createAsyncThunk(
  'notification/markNotificationAsRead',
  async () => {
    const res = await authorizedAxios.get(
      `${API_ROOT}/v1/api/notification/mark-read`
    )
    return res
  }
)

export const countUnreadNotificationShopAPI = createAsyncThunk(
  'notification/countUnreadNotificationShopAPI',
  async () => {
    const res = await authorizedAxios.get(
      `${API_ROOT}/v1/api/notification/shop/count-unread`
    )
    return res
  }
)

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    incrementNotificationUser: (state, action) => {
      const newNotification = action.payload

      if (!state.user_notifications) {
        state.user_notifications = []
      }

      state.user_notifications.unshift(newNotification)

      if (state.user_notifications.length > 8) {
        state.user_notifications.pop()
      }
      state.user_notifications_count += 1
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationUserAPI.fulfilled, (state, action) => {
        state.user_notifications = action.payload.data.metadata
      })
      .addCase(countUnreadNotificationUserAPI.fulfilled, (state, action) => {
        state.user_notifications_count = action.payload.data.metadata
      })
      .addCase(countUnreadNotificationShopAPI.fulfilled, (state, action) => {
        state.shop_notifications_count = action.payload.data.metadata
      })
  }
})

export const { incrementNotificationUser } = notificationSlice.actions

export default notificationSlice.reducer
