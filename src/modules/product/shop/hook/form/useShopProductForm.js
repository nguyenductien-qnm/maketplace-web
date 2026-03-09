import { pick } from 'lodash'
import { navigate } from '~/helpers/navigation'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { StatusCodes } from 'http-status-codes'
import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getCategoriesByOwnerAPI } from '~/api/category.api'
import { getProductDetailByShopAPI } from '~/api/product.api'
import {
  useShopCreateProductMutation,
  useShopUpdateProductMutation
} from '../../server/product.form.server'

import {
  FIELD_REQUIRED_MESSAGE,
  PRODUCT_PRICE_MAX,
  PRODUCT_PRICE_MESSAGE,
  PRODUCT_PRICE_MIN,
  PRODUCT_STOCK_MAX,
  PRODUCT_STOCK_MESSAGE,
  PRODUCT_STOCK_MIN
} from '~/utils/validators'

import {
  PRODUCT_FORM_DEFAULT_VALUES,
  SIMPLE_PRODUCT_FIELDS,
  VARIABLE_PRODUCT_FIELDS
} from '../../constants/product.constant'

export const useShopProductForm = () => {
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
  } = useForm({ defaultValues: PRODUCT_FORM_DEFAULT_VALUES })

  const { _id } = useParams()
  const { pathname } = useLocation()

  const isCreate = pathname === '/vendor/product/create'
  const isUpdate = pathname.includes('/vendor/product/update')
  const pageTitle = isCreate
    ? 'Create Product'
    : isUpdate
      ? 'Update Product'
      : ''

  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categoriesTree, setCategoriesTree] = useState([])
  const [productStatus, setProductStatus] = useState(null)

  const enableVariations = watch('enable_variations')
  const productSKUs = watch('products_sku')
  const productVariations = watch('product_variations')

  const createMutation = useShopCreateProductMutation()
  const updateMutation = useShopUpdateProductMutation()

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
      const { status, resData } = await getProductDetailByShopAPI({ _id })
      if (status === StatusCodes.OK) setFormData(resData?.metadata)
    } finally {
      setLoading(false)
    }
  }

  const handleFormSubmit = handleSubmit(async () => {
    const productFields = enableVariations
      ? VARIABLE_PRODUCT_FIELDS
      : SIMPLE_PRODUCT_FIELDS

    const productData = pick(getValues(), productFields)

    const formattedData = formatProductData({
      data: productData,
      productFields
    })

    if (isCreate) {
      createMutation.mutate(
        { payload: formattedData }
        // { onSuccess: () => navigate('/vendor/product') }
      )
    }

    if (isUpdate) {
      updateMutation.mutate(
        { payload: formattedData },
        { onSuccess: () => navigate('/vendor/product') }
      )
    }
  })

  // ============================== HANDLER ==============================
  const setFormData = (data) => {
    const { product_type, products_sku, product_variations, product_status } =
      data
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
    setProductStatus(product_status)
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

  const formatProductData = ({ data, productFields }) => {
    const formattedData = { ...data }

    formattedData.product_images = formattedData.product_images.map(
      ({ previewUrl, ...rest }) => rest
    )

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

    return pick(formattedData, productFields)
  }

  return {
    ui: {
      loading,
      isSubmitting: createMutation.isPending || updateMutation.isPending,
      pageTitle,
      isUpdate,
      productStatus
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
      safeInfo: {
        isEnabled: enableVariations,
        items: productVariations
      }
    },

    handlers: {
      onSubmit: handleFormSubmit,

      saleInfo: {
        onEnable: handleEnableVariation,
        onAdd: handleAddVariation,
        onChange: handleChangeVariation,
        onRemove: handleRemoveVariation,
        onApplyAll: handleApplyAll
      }
    }
  }
}
