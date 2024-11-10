import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    handleCategories: (state) => {
      state.isOpen = !state.isOpen
    }
  }
})

export const { handleCategories } = categoriesSlice.actions

export default categoriesSlice.reducer
