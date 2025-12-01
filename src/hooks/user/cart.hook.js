import { useEffect, useRef, useState } from 'react'
import { navigate } from '~/helpers/navigation'
import { StatusCodes } from 'http-status-codes'
import { useDebounce } from '../common/useDebounce'
import {
  checkoutAPI,
  getCartByCustomerAPI,
  removeProductFromCartByCustomerAPI,
  removeProductsFromCartByCustomerAPI,
  updateCartProductQuantityByCustomerAPI
} from '~/api/cart.api'

const LIMIT = 10

export const useCustomerCart = () => {
  const [loading, setLoading] = useState(true)
  const [productActive, setProductActive] = useState([])
  const [productInactive, setProductInactive] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [modalContent, setModalContent] = useState({ header: '', content: '' })
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const prevQuantityRef = useRef({})

  useEffect(() => {
    fetchCart({ currentPage: page })
  }, [])

  useEffect(() => {
    const next = productActive.filter((s) => s.products.length > 0)
    if (next.length !== productActive.length) {
      setProductActive(next)
    }
  }, [productActive])

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

  const fetchCart = async ({ currentPage }) => {
    setLoading(true)
    try {
      const payload = { page: currentPage, limit: LIMIT }
      const { status, resData } = await getCartByCustomerAPI({ payload })

      if (status === StatusCodes.OK) {
        const { cart, count } = resData.metadata

        mergeProducts(cart)
        setCount(count)
      }
    } catch (error) {
      console.error('Fetch cart error:', error)
    } finally {
      setLoading(false)
    }
  }

  const mergeProducts = (newShops) => {
    const activeMap = new Map(productActive.map((s) => [s._id, s]))
    const inactiveMap = new Map(productInactive.map((s) => [s._id, s]))

    newShops.forEach((shop) => {
      const activeProds = shop.products.filter((p) => p.is_active)
      const inactiveProds = shop.products.filter((p) => !p.is_active)

      if (activeProds.length > 0) {
        const existing = activeMap.get(shop._id)
        activeMap.set(
          shop._id,
          existing
            ? { ...existing, products: [...existing.products, ...activeProds] }
            : { ...shop, products: activeProds }
        )
      }

      if (inactiveProds.length > 0) {
        const existing = inactiveMap.get(shop._id)
        inactiveMap.set(
          shop._id,
          existing
            ? {
                ...existing,
                products: [...existing.products, ...inactiveProds]
              }
            : { ...shop, products: inactiveProds }
        )
      }
    })

    setProductActive(Array.from(activeMap.values()))
    setProductInactive(Array.from(inactiveMap.values()))
  }

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchCart({ currentPage: nextPage })
  }

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
        setCount((prev) => prev - 1)

        setSelectedProducts((prev) =>
          prev.filter((p) => p.product_id !== product_id)
        )
      }
    } finally {
      //   '.btn-user-checkout',
      //   '.btn-user-clear-cart',
      //   '.btn-user-remove-product'
    }
  }

  const handleRemoveManyProduct = async (products) => {
    const productIds = products?.map((p) => p.product_id)
    if (!productIds?.length) return

    const { status, resData } = await removeProductsFromCartByCustomerAPI({
      payload: { productIds },
      loadingClass: []
    })

    if (status === StatusCodes.OK) {
      const { count } = resData.metadata

      const idsToDelete = new Set(productIds)

      setProductActive((prev) =>
        prev.map((s) => ({
          ...s,
          products: s.products.filter((p) => !idsToDelete.has(p.product_id))
        }))
      )

      setSelectedProducts([])

      setCount((prev) => prev - count)
    }
    //   '.btn-user-checkout',
    //   '.btn-user-clear-cart',
    //   '.btn-user-remove-product'
  }

  const handelClearProductInactive = async () => {
    const productIds = productInactive
      .flatMap((i) => i.products)
      .map((p) => p.product_id)

    const { status, resData } = await removeProductsFromCartByCustomerAPI({
      payload: { productIds },
      loadingClass: []
    })

    if (status === StatusCodes.OK) {
      const { count } = resData.metadata
      setProductInactive([])
      setCount((prev) => prev - count)
    }
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

  return {
    ui: {
      loading,
      openModal,
      selectedProducts,
      modalContent,
      page,
      count,
      LIMIT
    },
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
      handleLoadMore,
      isAllShopProductsSelected,
      isSomeShopProductSelected,
      isSelectedAllProduct,
      handelClearProductInactive
    }
  }
}
