import { useState, useEffect, useCallback, useMemo } from 'react'
import { queryProductByOwnerAPI } from '~/api/product.api'
import {
  createProductAPI,
  getDetailProductByOwnerAPI,
  updateProductAPI,
  deletePermanentProductAPI,
  restoreProductAPI,
  softDeleteProductAPI
} from '~/api/product.api'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { prepareImageForStorage } from '~/helpers/resizeImage'

const DEFAULT_VALUES = {
  isMultiVariation: false,
  product_name: '',
  product_thumb: '',
  product_gallery: [],
  product_min_price: null,
  product_max_price: null,
  product_stock: null,
  product_categories: [],
  product_visibility: 'private',
  product_specs: [
    { key: '', value: '' },
    { key: '', value: '' },
    { key: '', value: '' }
  ],
  product_description: '',
  product_classifications: [],
  product_sku: [],
  product_dimensions: {
    length: null,
    width: null,
    height: null,
    weight: null
  }
}

export const useVendorProductList = (status) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [actionType, setActionType] = useState('softDelete')

  const fetchProducts = async (filters = {}) => {
    setLoading(true)
    try {
      const res = await queryProductByOwnerAPI({ status, ...filters })
      setProducts(res?.data?.metadata || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleProductAction = useCallback((productId, actionType) => {
    switch (actionType) {
      case 'softDelete':
        setProducts((prev) =>
          prev.map((p) =>
            p._id === productId ? { ...p, deletedAt: new Date() } : p
          )
        )
        break
      case 'permanentDelete':
        setProducts((prev) => prev.filter((p) => p._id !== productId))
        break
      case 'restore':
        setProducts((prev) =>
          prev.map((p) => (p._id === productId ? { ...p, deletedAt: null } : p))
        )
        break
      default:
        break
    }
  }, [])

  const openConfirmModal = useCallback((productId, type) => {
    setSelectedProductId(productId)
    setActionType(type)
    setOpenModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setOpenModal(false)
  }, [])

  const handleConfirmAction = useCallback(async () => {
    if (!selectedProductId || !actionType) return
    try {
      switch (actionType) {
        case 'softDelete':
          await softDeleteProductAPI(selectedProductId)
          break
        case 'permanentDelete':
          await deletePermanentProductAPI(selectedProductId)
          break
        case 'restore':
          await restoreProductAPI(selectedProductId)
          break
      }
      handleProductAction(selectedProductId, actionType)
    } finally {
      closeModal()
    }
  }, [selectedProductId, actionType, handleProductAction, closeModal])

  const modalProps = {
    softDelete: {
      header: 'Confirm Temporary Deletion',
      content:
        'Are you sure you want to temporarily delete this product? You can restore it within 15 days.',
      confirmText: 'Soft Delete',
      confirmColor: 'warning'
    },
    permanentDelete: {
      header: 'Confirm Permanent Deletion',
      content:
        'This action cannot be undone! Are you sure you want to permanently delete this product?',
      confirmText: 'Delete Permanently',
      confirmColor: 'error'
    },
    restore: {
      header: 'Confirm Restore',
      content: 'Are you sure you want to restore this product?',
      confirmText: 'Restore',
      confirmColor: 'primary'
    }
  }

  return {
    products,
    loading,
    fetchProducts,
    handleProductAction,
    openModal,
    openConfirmModal,
    closeModal,
    handleConfirmAction,
    modalProps: modalProps[actionType]
  }
}

export const useVendorProductForm = (_id, pathname) => {
  const methods = useForm({ defaultValues: DEFAULT_VALUES })

  const { setValue, watch, setError, handleSubmit } = methods

  const [loading, setLoading] = useState(true)

  const isMultiVariation = watch('isMultiVariation')
  const productSKU = watch('product_sku')
  const classifications = watch('product_classifications')
  const isEditMode = useMemo(() => pathname.includes('/vendor/update-product'), [pathname])

  useEffect(() => {
    const fetchProduct = async () => {
      if (!_id) {
        setLoading(false)
        return
      }

      try {
        const { data } = await getDetailProductByOwnerAPI(_id)
        const product = data.metadata
        if (!product) return

        Object.entries(product).forEach(([key, value]) => {
          if (!['product_sku', 'product_classifications', 'isMultiVariation'].includes(key)) {
            const parsedValue =
              ['product_min_price', 'product_max_price'].includes(key) && typeof value === 'number'
                ? value.toString()
                : value
            setValue(key, parsedValue)
          }
        })

        if (product.product_sku?.length) {
          const updatedSKU = product.product_sku.map((skuItem) => {
            const mapped = {}
            product.product_classifications.forEach((cls, i) => {
              const name = cls.name
              mapped[name] = skuItem[name] || cls.options[skuItem.sku_tier_indices?.[i]]
            })
            return {
              ...mapped,
              _id: skuItem._id.toString(),
              price: skuItem.product_price.toString(),
              stock: skuItem.product_stock.toString()
            }
          })

          setValue('product_classifications', product.product_classifications.map((e) => e.name))
          setValue('product_sku', updatedSKU)
          setValue('isMultiVariation', true)
        }
      } catch (err) {
        toast.error('Failed to load product data')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [_id])

  useEffect(() => {
    if (!isMultiVariation) {
      setValue('product_sku', [])
      setValue('product_classifications', [])
    }
  }, [isMultiVariation, setValue])


  useEffect(() => {
    if (!isMultiVariation) {
      setValue('product_sku', [])
      setValue('product_classifications', [])
    }
  }, [isMultiVariation])

  useEffect(() => {
    if (classifications.length === 0) setValue('product_sku', [])
  }, [classifications, setValue])

  useEffect(() => {
    if (pathname === '/vendor/create-product') setLoading(false)
  }, [pathname])

  const formatData = useCallback((data) => {
    const parsed = {
      ...data,
      product_min_price: parseFloat(data.product_min_price.replace(/[$,]/g, '')),
      product_max_price: parseFloat(data.product_max_price.replace(/[$,]/g, '')),
      product_stock: parseInt(data.product_stock, 10),
    }

    if (data.isMultiVariation) {
      const variations = data.product_classifications || []
      const skuList = data.product_sku || []

      const formattedSKU = skuList.map((sku) => {
        const attrs = Object.fromEntries(
          variations.filter((key) => key in sku).map((key) => [key, sku[key]])
        )
        return {
          ...attrs,
          _id: sku._id,
          price: parseFloat(sku.price.replace(/[$,]/g, '')),
          stock: parseInt(sku.stock, 10),
        }
      })

      // Check for duplicates
      const seen = new Set()
      for (const { price, stock, _id, ...rest } of formattedSKU) {
        const key = JSON.stringify(rest).toLowerCase()
        if (seen.has(key)) {
          toast.error('Duplicate SKU detected! Please ensure each variation is unique.')
          return null
        }
        seen.add(key)
      }

      parsed.product_sku = formattedSKU
    } else {
      delete parsed.product_classifications
      delete parsed.product_sku
    }

    return parsed
  }, [])

  const validateData = useCallback((data) => {
    if (!data.product_sku?.length) {
      if (data.product_min_price !== data.product_max_price) {
        setError('product_min_price', { type: 'manual', message: 'Min and max price must be the same if no SKU.' })
        setError('product_max_price', { type: 'manual', message: 'Min and max price must be the same if no SKU.' })
        return false
      }
      return true
    }

    const prices = data.product_sku.map((s) => s.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const totalStock = data.product_sku.reduce((sum, s) => sum + s.stock, 0)

    const errors = [
      { field: 'product_min_price', condition: data.product_min_price !== minPrice, message: `Min price must be ${minPrice}.` },
      { field: 'product_max_price', condition: data.product_max_price !== maxPrice, message: `Max price must be ${maxPrice}.` },
      { field: 'product_stock', condition: data.product_stock !== totalStock, message: `Stock must be ${totalStock}.` }
    ]

    let hasError = false
    for (const { condition, field, message } of errors) {
      if (condition) {
        setError(field, { type: 'manual', message })
        hasError = true
      }
    }
    return !hasError
  }, [setError])

  const onSubmit = handleSubmit(async (formData) => {
    let data = formatData(formData)
    if (!data) return

    if (!validateData(data)) return

    data.product_thumb = prepareImageForStorage(data.product_thumb, { width: 180, height: 180 })
    data.product_gallery = data.product_gallery.map((img) =>
      prepareImageForStorage(img, { width: 2000, crop: 'limit', quality: 'auto:good' })
    )

    try {
      const api = isEditMode && _id ? updateProductAPI : createProductAPI
      await api(data, '.btn-shop-create-product')
    } catch (err) {
      toast.error('Submit failed!')
    }
  })
  return {
    methods,
    loading,
    isMultiVariation,
    productSKU,
    classifications,
    onSubmit
  }
}
