import { create } from 'zustand'

export const useVoucherFormStore = create((set) => ({
  /* -------------------------- UI STATE -------------------------- */

  openModal: false,
  selectedProducts: [],

  /* -------------------------- ACTIONS --------------------------- */

  openProductModal: () => set({ openModal: true }),

  closeProductModal: () => set({ openModal: false }),

  setSelectedProducts: (products) => set({ selectedProducts: products }),

  removeProduct: (productId) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.filter(
        (p) => p._id !== productId
      )
    })),

  resetFormState: () =>
    set({
      openModal: false,
      selectedProducts: []
    })
}))
