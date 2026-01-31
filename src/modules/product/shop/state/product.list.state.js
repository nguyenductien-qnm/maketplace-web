import { create } from 'zustand'

const useShopProductState = create((set) => ({
  selectedProductId: null,
  isOpenDetailModal: false,
  isOpenConfirmDialog: false,
  isOpenRevenueModal: false,
  isOpenReasonDialog: false,
  tempFilters: { sort_by: 'newest' },

  openDetailModal: (productId) => {
    set({
      isOpenDetailModal: true,
      selectedProductId: productId
    })
  },

  closeDetailModal: () => {
    set({
      isOpenDetailModal: false,
      selectedProductId: null
    })
  },

  openReasonDialog: (productId) => {
    set({ isOpenReasonDialog: true, selectedProductId: productId })
  },

  closeReasonDialog: () => {
    set({ isOpenReasonDialog: false, selectedProductId: null })
  },

  openRevenueModal: (productId) => {
    set({
      isOpenRevenueModal: true,
      selectedProductId: productId
    })
  },

  closeRevenueModal: () => {
    set({
      isOpenRevenueModal: false,
      selectedProductId: null
    })
  },

  openConfirmDialog: (productId) => {
    set({
      isOpenConfirmDialog: true,
      selectedProductId: productId
    })
  },

  closeConfirmDialog: () => {
    set({
      isOpenConfirmDialog: false,
      selectedProductId: null
    })
  },

  setTempFilters: (filters) => set({ tempFilters: filters }),

  updateTempFilter: (field, value) =>
    set((state) => {
      const next = { ...state.tempFilters }

      if (value === null || value === undefined || value === '') {
        delete next[field]
      } else {
        next[field] = value
      }

      return { tempFilters: next }
    }),

  clearTempFilters: ({ currentStatus, limit }) =>
    set({
      tempFilters: { status: currentStatus, sort_by: 'newest', page: 1, limit }
    })
}))

export default useShopProductState
