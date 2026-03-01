import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'
const initialState = {
  isOpen: false,
  categories: []
}

export const getCategoriesAPI = createAsyncThunk(
  'categories/getCategoriesAPI',
  async () => {
    const result = await authorizedAxios.get(`${API_ROOT}/v1/api/categories`)
    return result.data
  }
)

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    handleCategories: (state) => {
      state.isOpen = !state.isOpen
    }
  },
  extraReducers(builder) {
    builder.addCase(getCategoriesAPI.fulfilled, (state, action) => {
      state.categories = action.payload.metadata
    })
  }
})

export const { handleCategories } = categoriesSlice.actions

export default categoriesSlice.reducer
