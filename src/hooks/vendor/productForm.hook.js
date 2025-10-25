import buildFormData from '~/helpers/buildFormData'
import { pick } from 'lodash'
import { navigate } from '~/helpers/navigation'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { StatusCodes } from 'http-status-codes'
import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getCategoriesByOwnerAPI } from '~/api/category.api'
import {
  createProductByOwnerAPI,
  getProductDetailByOwnerAPI,
  updateProductByOwnerAPI
} from '~/api/product.api'

import {
  FIELD_REQUIRED_MESSAGE,
  PRODUCT_PRICE_MAX,
  PRODUCT_PRICE_MESSAGE,
  PRODUCT_PRICE_MIN,
  PRODUCT_STOCK_MAX,
  PRODUCT_STOCK_MESSAGE,
  PRODUCT_STOCK_MIN
} from '~/utils/validators'

const DEFAULT_VALUES = {
  enable_variations: false,
  product_name: '',
  product_images: [],
  product_price: null,
  product_stock: null,
  product_category: '',
  product_visibility: '',
  product_tags: [],
  product_attributes: [
    { key: '', value: '' },
    { key: '', value: '' },
    { key: '', value: '' }
  ],
  product_description: '',
  product_variations: [],
  products_sku: [],
  product_dimensions: {
    length: null,
    width: null,
    height: null,
    weight: null
  }
}

const BASE_PRODUCT_FIELDS = [
  'product_images',
  'product_name',
  'product_category',
  'product_description',
  'product_tags',
  'product_attributes',
  'product_dimensions',
  'product_visibility',
  'enable_variations'
]

const SIMPLE_PRODUCT_FIELDS = [
  ...BASE_PRODUCT_FIELDS,
  'product_price',
  'product_stock'
]

const VARIABLE_PRODUCT_FIELDS = [
  ...BASE_PRODUCT_FIELDS,
  'product_variations',
  'products_sku'
]

export const useVendorProductForm = () => {
  // ============================== DATA ==============================
  const {
    setValue,
    watch,
    register,
    getValues,
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: DEFAULT_VALUES })

  const { _id } = useParams()
  const { pathname } = useLocation()

  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categoriesTree, setCategoriesTree] = useState([])

  const enableVariations = watch('enable_variations')
  const productSKUs = watch('products_sku')
  const productVariations = watch('product_variations')

  const isCreate = pathname === '/vendor/product/create'
  const isUpdate = pathname.includes('/vendor/product/update')
  const pageTitle = isCreate
    ? 'Create Product'
    : isUpdate
    ? 'Update Product'
    : ''

  // ============================== EFFECT ==============================

  useEffect(() => {
    fetchCategories()
    if (isCreate) setLoading(false)
    if (isUpdate) {
      fetchProductDetail()
    }
  }, [pathname])

  useEffect(() => {
    if (productVariations?.length == 0) {
      setValue('enable_variations', false)
    }
  }, [productVariations])
  // ============================== API ==============================

  const fetchCategories = async () => {
    const { status, resData } = await getCategoriesByOwnerAPI()
    if (status === StatusCodes.OK) setCategoriesTree(resData.metadata || [])
  }

  const fetchProductDetail = async () => {
    try {
      const { status, resData } = await getProductDetailByOwnerAPI({ _id })
      if (status === StatusCodes.OK) setFormData(resData?.metadata)
    } finally {
      setLoading(false)
    }
  }

  const handleFormSubmit = handleSubmit(async () => {
    try {
      setIsSubmitting(true)
      const productFields = enableVariations
        ? VARIABLE_PRODUCT_FIELDS
        : SIMPLE_PRODUCT_FIELDS

      const productData = pick(getValues(), productFields)

      const action = isCreate ? 'create' : 'update'

      const formattedData = formatProductData({
        data: productData,
        productFields,
        action
      })

      if (isCreate) {
        const { status } = await createProductByOwnerAPI({
          payload: formattedData,
          loadingClass: ['.btn-vendor-submit-product-form']
        })
        if (status === StatusCodes.CREATED) {
          navigate('/vendor/product')
        }
      }

      if (isUpdate) {
        const { status } = await updateProductByOwnerAPI({
          _id,
          payload: formattedData,
          loadingClass: ['.btn-vendor-submit-product-form']
        })
        if (status === StatusCodes.OK) {
          navigate('/vendor/product')
        }
      }
    } catch {
      setIsSubmitting(false)
    } finally {
      setIsSubmitting(false)
    }
  })

  // ============================== HANDLER ==============================
  const setFormData = (data) => {
    const { product_type, products_sku, product_variations } = data
    setValue('product_name', data?.product_name)
    setValue('product_images', data?.product_images)
    setValue('product_visibility', data?.product_visibility)
    setValue('product_category', data?.product_category)
    setValue('product_description', data?.product_description)
    setValue('product_tags', data?.product_tags)
    setValue('product_attributes', data?.product_attributes)
    setValue('product_dimensions', data?.product_dimensions)
    if (product_type == 'variable' && products_sku.length > 0) {
      setValue('enable_variations', true)
      setValue('products_sku', products_sku)
      product_variations.map((variation) => {
        return (variation.options = variation.options?.map((option) => {
          return { value: option }
        }))
      })
      setValue('product_variations', product_variations)
    } else {
      setValue('product_price', products_sku[0].product_price)
      setValue('product_stock', products_sku[0].product_stock)
    }
  }

  const handleEnableVariation = () => {
    setValue('enable_variations', true)
  }

  const handleApplyAll = (price, stock) => {
    if (stock < PRODUCT_STOCK_MIN || stock > PRODUCT_STOCK_MAX) {
      toast.error(PRODUCT_STOCK_MESSAGE)
      return
    }
    const numValue = parseFloat(String(price).replace(/[$,]/g, ''))
    if (numValue < PRODUCT_PRICE_MIN + 0.01 || numValue > PRODUCT_PRICE_MAX) {
      toast.error(PRODUCT_PRICE_MESSAGE)
      return
    }
    const updateProductSKUs = productSKUs.map((p) => ({
      ...p,
      product_price: price,
      product_stock: stock
    }))
    clearErrors('products_sku')
    setValue('products_sku', updateProductSKUs)
  }

  const handleAddVariation = () => {
    if (productVariations.length < 2) {
      setValue('product_variations', [
        ...productVariations,
        { name: '', options: [{ value: '' }] }
      ])
    }
  }

  const handleChangeVariation = (e, variationIndex) => {
    const newValue = e.target.value.trim()
    setValue(`product_variations.${variationIndex}.name`, newValue)

    const updatedVariations = [...productVariations]
    updatedVariations[variationIndex].name = newValue

    validateVariationsWithData(updatedVariations)
  }

  const handleRemoveVariation = (variationIndex) => {
    const updatedVariations = [...productVariations]
    updatedVariations.splice(variationIndex, 1)
    setValue('product_variations', updatedVariations)
    clearErrors(`product_variations.${0}.name`)
    clearErrors(`product_variations.${1}.name`)
  }

  const validateVariationsWithData = (variations) => {
    const valueMap = new Map()

    variations.forEach((variation) => {
      const val = variation.name.trim().toLowerCase()
      valueMap.set(val, (valueMap.get(val) || 0) + 1)
    })

    for (let i = 0; i < variations.length; i++) {
      const variationName = variations[i].name.trim().toLowerCase()
      if (valueMap.get(variationName) > 1) {
        setError(
          `product_variations.${i}.name`,
          { type: 'manual', message: 'The variation must be different.' },
          { shouldFocus: false }
        )
      } else if (variationName) {
        clearErrors(`product_variations.${i}.name`)
      } else {
        setError(
          `product_variations.${i}.name`,
          { type: 'manual', message: FIELD_REQUIRED_MESSAGE },
          { shouldFocus: false }
        )
      }
    }
  }

  const normalizePrice = (value) => {
    if (typeof value === 'string') {
      const cleaned = value.replace(/[^\d.]/g, '')
      return parseFloat(cleaned) || 0
    }
    return value ?? 0
  }

  const formatProductData = ({ data, productFields, action }) => {
    const formattedData = { ...data }

    if (action == 'create')
      formattedData.product_images = data.product_images?.map((img) => img.file)

    if (action == 'update') {
      const imageFiles = []
      const imageMetadata = []

      data.product_images?.forEach((img, index) => {
        if (img.file instanceof File) {
          imageFiles.push(img.file)
          imageMetadata.push({ isNew: true, order: index })
        } else {
          imageMetadata.push({ ...img, order: index })
        }
      })

      formattedData.product_images = imageMetadata
      formattedData.new_product_images = imageFiles
    }

    if (enableVariations) {
      formattedData.product_variations = data.product_variations?.map((v) => ({
        name: v.name,
        options: v.options?.map((o) => o.value)
      }))

      formattedData.products_sku = data.products_sku?.map((sku) => ({
        ...sku,
        product_price: normalizePrice(sku.product_price),
        product_stock: parseInt(sku.product_stock)
      }))
    } else {
      formattedData.product_price = normalizePrice(data.product_price)
      formattedData.product_stock = parseInt(data.product_stock)
    }

    const fieldsFormData =
      formattedData.new_product_images?.length > 0
        ? [...productFields, 'new_product_images']
        : productFields

    return buildFormData(formattedData, fieldsFormData)
  }

  return {
    ui: {
      loading,
      isSubmitting,
      pageTitle,
      isUpdate
    },

    form: {
      register,
      control,
      errors,
      setError,
      clearErrors,
      getValues,
      setValue,
      watch
    },

    data: {
      categoriesTree,
      variations: {
        isEnabled: enableVariations,
        items: productVariations
      }
    },

    handlers: {
      onSubmit: handleFormSubmit,
      handleApplyAll,
      variations: {
        onEnable: handleEnableVariation,
        onAdd: handleAddVariation,
        onChange: handleChangeVariation,
        onRemove: handleRemoveVariation
      }
    }
  }
}
