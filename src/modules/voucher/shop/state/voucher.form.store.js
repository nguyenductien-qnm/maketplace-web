import { create } from 'zustand'

export const useVoucherFormStore = create((set) => ({
  isOpenProductModal: false,
  selectedProducts: [],

  openProductModal: () => set({ isOpenProductModal: true }),

  closeProductModal: () => set({ isOpenProductModal: false }),

  setSelectedProducts: (products) =>
    set({ selectedProducts: products, isOpenProductModal: false }),

  removeProduct: (productId) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.filter(
        (p) => p._id !== productId
      )
    })),

  resetFormState: () =>
    set({
      isOpenProductModal: false,
      selectedProducts: []
    })
}))
