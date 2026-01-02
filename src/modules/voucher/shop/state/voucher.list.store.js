import { create } from 'zustand'

export const useShopVoucherStore = create((set) => ({
  isOpenDetailModal: false,
  isOpenConfirmDialog: false,
  isOpenReasonDialog: false,
  selectedVoucherId: null,
  tempFilters: { sort_by: 'newest' },

  openDetailModal: (voucherId) => {
    set({ isOpenDetailModal: true, selectedVoucherId: voucherId })
  },

  closeDetailModal: () => {
    set({ isOpenDetailModal: false, selectedVoucherId: null })
  },

  openConfirmDialog: (voucherId) => {
    set({ isOpenConfirmDialog: true, selectedVoucherId: voucherId })
  },

  closeConfirmDialog: () => {
    set({ isOpenConfirmDialog: false, selectedVoucherId: null })
  },

  openReasonDialog: (voucherId) => {
    set({ isOpenReasonDialog: true, selectedVoucherId: voucherId })
  },

  closeReasonDialog: () => {
    set({ isOpenReasonDialog: false, selectedVoucherId: null })
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

  clearTempFilters: () => set({ tempFilters: { sort_by: 'newest' } })
}))
