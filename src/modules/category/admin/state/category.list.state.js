import { create } from 'zustand'

const useAdminCategoryStore = create((set) => ({
  commandAction: null,
  selectedCategoryId: null,

  isOpenForm: false,
  isOpenDetailModal: false,
  isOpenConfirmDialog: false,

  openForm: (categoryId = null, action) => {
    set({
      selectedCategoryId: categoryId,
      isOpenForm: true,
      commandAction: action
    })
  },

  closeForm: () => {
    set({
      selectedCategoryId: null,
      isOpenForm: false,
      commandAction: null
    })
  },

  openDetailModal: (categoryId) => {
    set({
      selectedCategoryId: categoryId,
      isOpenDetailModal: true
    })
  },

  closeDetailModal: () => {
    set({
      selectedCategoryId: null,
      isOpenDetailModal: false
    })
  },

  openConfirmDialog: (categoryId) => {
    set({
      selectedCategoryId: categoryId,
      isOpenConfirmDialog: true
    })
  },

  closeConfirmDialog: () => {
    set({
      selectedCategoryId: null,
      isOpenConfirmDialog: false
    })
  }
}))

export default useAdminCategoryStore
