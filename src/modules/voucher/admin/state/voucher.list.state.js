import { create } from 'zustand'

export const useAdminVoucherStore = create((set) => ({
  action: null,
  formMode: null,
  commandAction: null,
  selectedVoucherId: null,

  isOpenReasonModal: false,
  isOpenDetailModal: false,
  isOpenForm: false,

  tempFilters: { sort_by: 'newest' },

  openForm: (voucherId = null) =>
    set({
      isOpenForm: true,
      selectedVoucherId: voucherId,
      action: voucherId ? 'update' : 'create'
    }),

  closeForm: () =>
    set({
      isOpenForm: false,
      selectedVoucherId: null,
      action: null
    }),

  openDetailModal: (voucherId) =>
    set({
      isOpenDetailModal: true,
      selectedVoucherId: voucherId
    }),

  closeDetailModal: () =>
    set({
      isOpenDetailModal: false,
      selectedVoucherId: null
    }),

  openReasonModal: (voucherId, action) =>
    set({
      isOpenReasonModal: true,
      selectedVoucherId: voucherId,
      commandAction: action
    }),

  closeReasonModal: () =>
    set({
      isOpenReasonModal: false,
      selectedVoucherId: null,
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
