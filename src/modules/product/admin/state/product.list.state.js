import { create } from 'zustand'

export const useAdminProductStore = create((set) => ({
  commandAction: null,
  selectedProductId: null,
  isOpenReasonModal: false,
  isOpenDetailModal: false,
  tempFilters: { sort_by: 'newest' },

  openDetailModal: (voucherId) =>
    set({
      isOpenDetailModal: true,
      selectedProductId: voucherId
    }),

  closeDetailModal: () =>
    set({
      isOpenDetailModal: false,
      selectedProductId: null
    }),

  openReasonModal: (voucherId, action) =>
    set({
      isOpenReasonModal: true,
      selectedProductId: voucherId,
      commandAction: action
    }),

  closeReasonModal: () =>
    set({
      isOpenReasonModal: false,
      selectedProductId: null,
      commandAction: null
    }),

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
