import { useState, useEffect, useCallback } from 'react'
import { queryProductByOwnerAPI } from '~/api/productSPU.api'
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
  const methods = useForm({
    defaultValues: {
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
  })

  const { setValue, watch, getValues, handleSubmit, setError, control } =
    methods

  const [loading, setLoading] = useState(true)

  const isMultiVariation = watch('isMultiVariation')
  const productSKU = watch('product_sku')
  const classifications = watch('product_classifications')

  useEffect(() => {
    const fetchProduct = async () => {
      if (!_id) {
        setLoading(false)
        return
      }

      try {
        const res = await getDetailProductByOwnerAPI(_id)
        const data = res.data.metadata
        if (!data) return

        Object.keys(data).forEach((key) => {
          if (
            key !== 'isMultiVariation' &&
            key !== 'product_sku' &&
            key !== 'product_classifications'
          ) {
            if (key === 'product_min_price' || key === 'product_max_price') {
              setValue(key, data[key].toString())
            } else {
              setValue(key, data[key])
            }
          }
        })

        if (data?.product_sku?.length > 0) {
          const updatedSku = data.product_sku.map((skuItem) => {
            let updatedItem = {}

            data.product_classifications.forEach((classification, index) => {
              const classificationName = classification.name
              if (!skuItem[classificationName]) {
                const i = skuItem?.sku_tier_indices[index]
                updatedItem[classificationName] = classification?.options[i]
              } else {
                updatedItem[classificationName] = skuItem[classificationName]
              }
            })

            return {
              ...updatedItem,
              _id: skuItem._id.toString(),
              price: skuItem.product_price.toString(),
              stock: skuItem.product_stock.toString()
            }
          })

          setValue('product_sku', updatedSku)
          setValue(
            'product_classifications',
            data.product_classifications.map((e) => e.name)
          )
          setValue('isMultiVariation', true)
        }
      } catch (error) {
        toast.error('Failed to load product data')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [_id, setValue])

  useEffect(() => {
    if (!isMultiVariation) {
      setValue('product_sku', [])
      setValue('product_classifications', [])
    }
  }, [isMultiVariation, setValue])

  useEffect(() => {
    if (classifications.length === 0) setValue('product_sku', [])
  }, [classifications, setValue])

  useEffect(() => {
    if (pathname === '/vendor/create-product') setLoading(false)
  }, [pathname])

  const onSubmit = async (data) => {
    let formattedData = {
      ...data,
      product_min_price: parseFloat(
        data.product_min_price.replace(/[$,]/g, '')
      ),
      product_max_price: parseFloat(
        data.product_max_price.replace(/[$,]/g, '')
      ),
      product_stock: parseInt(data.product_stock, 10)
    }

    if (data.isMultiVariation) {
      const variations = data.product_classifications || []
      const skuProduct = data.product_sku || []

      formattedData.product_sku = skuProduct.map((sku) => {
        const filteredKeys = Object.fromEntries(
          variations.filter((key) => key in sku).map((key) => [key, sku[key]])
        )
        return {
          _id: sku._id,
          price: parseFloat(sku.price.replace(/[$,]/g, '')),
          stock: parseInt(sku.stock, 10),
          ...filteredKeys
        }
      })

      const seen = new Set()
      for (const item of formattedData.product_sku) {
        const { price, stock, _id, ...skuWithoutPriceStock } = item
        const skuKey = JSON.stringify(skuWithoutPriceStock).toLowerCase()
        if (seen.has(skuKey)) {
          toast.error(
            'Duplicate SKU detected! Please ensure each variation is unique.'
          )
          return
        }
        seen.add(skuKey)
      }
    } else {
      delete formattedData.product_classifications
      delete formattedData.product_sku
    }

    if (!formattedData.product_sku || formattedData.product_sku.length === 0) {
      if (formattedData.product_min_price !== formattedData.product_max_price) {
        setError('product_min_price', {
          type: 'manual',
          message: 'Min and max price must be the same if no SKU.'
        })
        setError('product_max_price', {
          type: 'manual',
          message: 'Min and max price must be the same if no SKU.'
        })
        return
      }
    } else {
      const prices = formattedData.product_sku.map((sku) => sku.price)
      const minPrice = Math.min(...prices)
      const maxPrice = Math.max(...prices)
      const totalStock = formattedData.product_sku.reduce(
        (sum, sku) => sum + sku.stock,
        0
      )

      const errors = [
        {
          condition: formattedData.product_min_price !== minPrice,
          field: 'product_min_price',
          message: `Min price must be ${minPrice}.`
        },
        {
          condition: formattedData.product_max_price !== maxPrice,
          field: 'product_max_price',
          message: `Max price must be ${maxPrice}.`
        },
        {
          condition: formattedData.product_stock !== totalStock,
          field: 'product_stock',
          message: `Stock must be ${totalStock} when SKUs exist.`
        }
      ]

      const hasError = errors.reduce((acc, { condition, field, message }) => {
        if (condition) {
          setError(field, { type: 'manual', message })
          return true
        }
        return acc
      }, false)
      if (hasError) return
    }

    formattedData.product_thumb = prepareImageForStorage(
      formattedData.product_thumb,
      {
        width: 180,
        height: 180
      }
    )

    formattedData.product_gallery = formattedData.product_gallery.map((image) =>
      prepareImageForStorage(image, {
        width: 2000,
        crop: 'limit',
        quality: 'auto:good'
      })
    )

    try {
      if (pathname === '/vendor/update-product' && _id) {
        await updateProductAPI(formattedData, '.btn-shop-create-product')
      } else {
        await createProductAPI(formattedData, '.btn-shop-create-product')
      }
    } catch (error) {
      toast.error('Submit failed!')
    }
  }

  return {
    methods,
    loading,
    isMultiVariation,
    productSKU,
    classifications,
    onSubmit
  }
}
