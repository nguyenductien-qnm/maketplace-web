import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT, TOAST_MODE } from '~/utils/constants'

const initialState = {
  products: null,
  total: null
}

export const addProductToCartAPI = createAsyncThunk(
  'cart/addProductToCartAPI',
  async ({ payload, loadingClass }) => {
    const res = await authorizedAxios.post(
      `${API_ROOT}/v1/api/user/cart`,
      payload,
      { loadingClass, ...TOAST_MODE.ALL }
    )
    return res.data
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addProductToCartAPI.fulfilled, (state, action) => {
      state.products = [action.payload.metadata, ...state.products]
      state.total += 1
    })
  }
})

export default cartSlice.reducer
