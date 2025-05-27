import { useEffect, useState } from 'react'
import {
  checkoutAPI,
  clearCartAPI,
  getCartProductsAPI,
  removeProductAPI,
  updateQuantityProductCartAPI
} from '~/api/cart.api'
import { toast } from 'react-toastify'
import { navigate } from '~/helpers/navigation'

export const useShoppingCart = () => {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [modalContent, setModalContent] = useState({ header: '', content: '' })

  useEffect(() => {
    const getData = async () => {
      try {
        const productsData = await getCartProductsAPI()
        setProducts(productsData.data.metadata)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    if (selectedProducts.length > 0) {
      const updatedProducts = selectedProducts.map((selectedItem) => {
        const latestProduct = products.find(
          (p) => p.product_id === selectedItem.product_id
        )
        return latestProduct &&
          JSON.stringify(latestProduct) !== JSON.stringify(selectedItem)
          ? latestProduct
          : selectedItem
      })

      if (
        JSON.stringify(updatedProducts) !== JSON.stringify(selectedProducts)
      ) {
        setSelectedProducts(updatedProducts)
      }
    }
  }, [products])

  const handleSelectedProduct = (product) => {
    setSelectedProducts((prev) => {
      const ids = prev.map((p) => p.product_id)
      return ids.includes(product.product_id)
        ? prev.filter((p) => p.product_id !== product.product_id)
        : [...prev, product]
    })
  }

  const handleClearCartAPI = async () => {
    if (selectedProducts.length === 0) {
      toast.warn('Please select product(s)!')
      return
    }
    const res = await clearCartAPI(selectedProducts, [
      '.btn-user-checkout',
      '.btn-user-clear-cart',
      '.btn-user-remove-product'
    ])
    if (res.status === 200) {
      const selectedIds = selectedProducts.map((p) => p.product_id)
      setProducts((prev) =>
        prev.filter((p) => !selectedIds.includes(p.product_id))
      )
      setSelectedProducts([])
    }
  }

  const removeProduct = async (product) => {
    const res = await removeProductAPI({ _id: product.product_id }, [
      '.btn-user-checkout',
      '.btn-user-clear-cart',
      '.btn-user-remove-product'
    ])
    if (res.status === 200)
      setProducts((prev) =>
        prev.filter((p) => p.product_id !== product.product_id)
      )
  }

  const setQuantitySelected = async (product, newQuantity) => {
    const oldQuantity = product.quantity
    setProducts((prev) =>
      prev.map((p) =>
        p.product_id === product.product_id
          ? { ...p, quantity: newQuantity }
          : p
      )
    )
    const res = await updateQuantityProductCartAPI(product, newQuantity)
    if (res.status !== 200) {
      handleOpenModal('Notification', res.message)
      setProducts((prev) =>
        prev.map((p) =>
          p.product_id === product.product_id
            ? { ...p, quantity: oldQuantity }
            : p
        )
      )
    }
  }

  const handleCheckOut = async () => {
    const res = await checkoutAPI({ products: selectedProducts }, [
      '.btn-user-checkout',
      '.btn-user-clear-cart',
      '.btn-user-remove-product'
    ])

    if (res.status === 200) {
      navigate(res.data?.metadata?.checkoutUrl)
    } else {
      if (Array.isArray(res.message)) {
        handleOpenModal('Notification', res.message[0])
      } else {
        handleOpenModal('Notification', res.message)
      }

      const productNeedUpdate = res?.metadata?.updatedProduct
      setProducts((prev) =>
        prev
          .map((p) => {
            const updated = productNeedUpdate?.find(
              (upd) => upd.product_id === p.product_id
            )
            if (updated) return updated.quantity === 0 ? null : updated
            return p
          })
          .filter(Boolean)
      )
    }
  }

  const handleOpenModal = (header, content) => {
    setModalContent({ header, content })
    setOpenModal(true)
  }

  const handleCloseModal = () => setOpenModal(false)

  return {
    loading,
    products,
    selectedProducts,
    modalContent,
    openModal,
    handleSelectedProduct,
    handleClearCartAPI,
    handleCheckOut,
    removeProduct,
    setQuantitySelected,
    handleCloseModal
  }
}
