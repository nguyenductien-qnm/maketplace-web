import { useEffect, useRef, useState } from 'react'
import {
  checkoutAPI,
  clearCartAPI,
  getCartByCustomerAPI,
  removeProductFromCartByCustomerAPI,
  updateCartProductQuantityByCustomerAPI
} from '~/api/cart.api'
import { navigate } from '~/helpers/navigation'
import { StatusCodes } from 'http-status-codes'
import { useDebounce } from '../common/useDebounce'

export const useCustomerCart = () => {
  const [loading, setLoading] = useState(true)
  const [productActive, setProductActive] = useState([])
  const [productInactive, setProductInactive] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [modalContent, setModalContent] = useState({ header: '', content: '' })
  const prevQuantityRef = useRef({})

  const isSelectedAllProduct = () => {
    const products = productActive.flatMap((i) => i.products)
    return (
      selectedProducts.length > 0 &&
      products.every((p) =>
        selectedProducts.some((i) => p.product_id == i.product_id)
      )
    )
  }

  const isAllShopProductsSelected = (shop_id) => {
    const shop = productActive.find((i) => i._id == shop_id)
    const shopProducts = shop?.products

    return (
      selectedProducts.length > 0 &&
      shopProducts.every((p) =>
        selectedProducts.some((i) => p.product_id == i.product_id)
      )
    )
  }

  const isSomeShopProductSelected = (shop_id) => {
    const shop = productActive.find((i) => i._id == shop_id)
    const shopProducts = shop?.products

    return shopProducts.some((p) =>
      selectedProducts.some((i) => p.product_id == i.product_id)
    )
  }

  const fetchCart = async () => {
    setLoading(true)
    try {
      const { status, resData } = await getCartByCustomerAPI()

      if (status === StatusCodes.OK) {
        const data = resData.metadata
        const active = data.map((s) => ({
          ...s,
          products: s.products.filter((p) => p.is_active)
        }))

        const inactive = data.map((s) => ({
          ...s,
          products: s.products.filter((p) => !p.is_active)
        }))

        setProductActive(active)
        setProductInactive(inactive)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  // useEffect(() => {
  //   if (selectedProducts.length > 0) {
  //     const updatedProducts = selectedProducts.map((selectedItem) => {
  //       const latestProduct = products.find(
  //         (p) => p.product_id === selectedItem.product_id
  //       )
  //       return latestProduct &&
  //         JSON.stringify(latestProduct) !== JSON.stringify(selectedItem)
  //         ? latestProduct
  //         : selectedItem
  //     })

  //     if (
  //       JSON.stringify(updatedProducts) !== JSON.stringify(selectedProducts)
  //     ) {
  //       setSelectedProducts(updatedProducts)
  //     }
  //   }
  // }, [products])

  const handleSelectProduct = (product) => {
    const ids = selectedProducts.map((p) => p.product_id)
    setSelectedProducts((prev) => {
      return ids.includes(product.product_id)
        ? prev.filter((p) => p.product_id !== product.product_id)
        : [...prev, product]
    })
  }

  const handleSelectShop = (shop) => {
    const shopItem = productActive.find((i) => i._id == shop._id)
    const shopProducts = shopItem.products
    if (isAllShopProductsSelected(shop._id)) {
      const productIds = shopProducts?.map((p) => p.product_id)
      setSelectedProducts((prev) =>
        prev.filter((p) => !productIds.includes(p.product_id))
      )
      return
    }

    setSelectedProducts((prev) => [
      ...prev,
      ...shopItem.products.filter(
        (p) => !prev.some((sp) => sp.product_id === p.product_id)
      )
    ])
  }

  const handleSelectAll = () => {
    const products = productActive.flatMap((i) => i.products)
    if (selectedProducts.length == products.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(products)
    }
  }

  const handleRemoveProduct = async (product) => {
    const { product_id } = product
    try {
      const { status } = await removeProductFromCartByCustomerAPI({
        _id: product_id,
        loadingClass: []
      })

      if (status === StatusCodes.OK) {
        setProductActive((prev) => {
          return prev.map((s) => ({
            ...s,
            products: s.products.filter((p) => p.product_id != product_id)
          }))
        })
      }
    } finally {
      //   '.btn-user-checkout',
      //   '.btn-user-clear-cart',
      //   '.btn-user-remove-product'
    }
  }

  const handleRemoveManyProduct = async () => {
    console.log(selectedProducts)
    // if (selectedProducts.length === 0) {
    //   toast.warn('Please select product(s)!')
    //   return
    // }
    // const res = await clearCartAPI(selectedProducts, [
    //   '.btn-user-checkout',
    //   '.btn-user-clear-cart',
    //   '.btn-user-remove-product'
    // ])
    // if (res.status === 200) {
    //   const selectedIds = selectedProducts.map((p) => p.product_id)
    //   setProducts((prev) =>
    //     prev.filter((p) => !selectedIds.includes(p.product_id))
    //   )
    //   setSelectedProducts([])
    // }
  }

  const handleAdjustQuantity = ({ product, shop_id, new_quantity }) => {
    const key = `${shop_id}-${product.product_id}`
    if (!prevQuantityRef.current[key])
      prevQuantityRef.current[key] = product.product_quantity

    handleSetQuantity({
      shop_id,
      product_id: product.product_id,
      quantity: new_quantity
    })

    if (new_quantity == '') return

    debouncedAPICall({ product, shop_id, new_quantity })
  }

  const debouncedAPICall = useDebounce(
    async ({ product, shop_id, new_quantity }) => {
      const payload = {
        product_parent_id: product.product_parent_id,
        shop_id: product.product_info.product_shop_id,
        new_quantity
      }

      const { status, resData } = await updateCartProductQuantityByCustomerAPI({
        product_id: product.product_id,
        payload
      })

      if (status === StatusCodes.OK) {
        const key = `${shop_id}-${product.product_id}`
        delete prevQuantityRef.current[key]
      }

      if (status === StatusCodes.OK && resData?.metadata?.is_updated) {
        const { product_quantity, warning } = resData?.metadata
        handleSetQuantity({
          shop_id,
          product_id: product.product_id,
          quantity: product_quantity
        })
        handleOpenModal('Notification', warning)
      }

      if (status !== StatusCodes.OK) {
        const key = `${shop_id}-${product.product_id}`
        const originalQuantity = prevQuantityRef.current[key] || 1
        handleSetQuantity({
          shop_id,
          product_id: product.product_id,
          quantity: originalQuantity
        })
      }
    },
    500
  )

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

  const handleSetQuantity = ({ shop_id, product_id, quantity }) => {
    setProductActive((prev) =>
      prev.map((shop) =>
        shop._id === shop_id
          ? {
              ...shop,
              products: shop.products.map((p) =>
                p.product_id === product_id
                  ? { ...p, product_quantity: quantity }
                  : p
              )
            }
          : shop
      )
    )
  }

  const handleOpenModal = (header, content) => {
    setModalContent({ header, content })
    setOpenModal(true)
  }

  const handleCloseModal = () => setOpenModal(false)

  return {
    ui: { loading, openModal, selectedProducts, modalContent },
    data: { productActive, productInactive },
    handler: {
      handleRemoveProduct,
      handleRemoveManyProduct,
      handleAdjustQuantity,
      handleCloseModal,
      handleSelectProduct,
      handleSelectAll,
      handleCheckOut,
      handleSelectShop,
      isAllShopProductsSelected,
      isSomeShopProductSelected,
      isSelectedAllProduct
    }
  }
}
