import { useState, useEffect, useMemo } from 'react'
import {
  createProductByOwnerAPI,
  getDetailProductByOwnerAPI,
  updateProductAPI
} from '~/api/product.api'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router-dom'
import { getCategoriesByOwnerAPI } from '~/api/category.api'
import { StatusCodes } from 'http-status-codes'
import {
  FIELD_REQUIRED_MESSAGE,
  PRODUCT_PRICE_MAX,
  PRODUCT_PRICE_MESSAGE,
  PRODUCT_PRICE_MIN,
  PRODUCT_STOCK_MAX,
  PRODUCT_STOCK_MESSAGE,
  PRODUCT_STOCK_MIN
} from '~/utils/validators'
import { pick } from 'lodash'
import buildFormData from '~/helpers/buildFormData'
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
  const { _id } = useParams()
  const { pathname } = useLocation()

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

  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categoriesTree, setCategoriesTree] = useState([])

  const enableVariations = watch('enable_variations')
  const productSKUs = watch('products_sku')
  const productVariations = watch('product_variations')

  useEffect(() => {
    fetchCategories()
    if (pathname === '/vendor/product/create') setLoading(false)
  }, [pathname])

  const fetchCategories = async () => {
    const { status, resData } = await getCategoriesByOwnerAPI()
    if (status === StatusCodes.OK) setCategoriesTree(resData.metadata || [])
  }

  const isCreate = pathname === '/vendor/product/create'
  const isUpdate = pathname.includes('/vendor/update-product')
  const pageTitle = isCreate
    ? 'Create Product'
    : isUpdate
    ? 'Update Product'
    : ''

  useEffect(() => {
    if (productVariations?.length == 0) {
      setValue('enable_variations', false)
    }
  }, [productVariations])

  const isEditMode = useMemo(
    () => pathname.includes('/vendor/update-product'),
    [pathname]
  )

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

  const handleFormSubmit = handleSubmit(async () => {
    try {
      setIsSubmitting(true)
      const productFields = enableVariations
        ? VARIABLE_PRODUCT_FIELDS
        : SIMPLE_PRODUCT_FIELDS

      const productData = pick(getValues(), productFields)

      const formattedData = formatProductData(productData, productFields)
      await createProductByOwnerAPI({
        payload: formattedData,
        loadingClass: []
      })
    } finally {
      setIsSubmitting(false)
    }
  })

  const formatProductData = (data, productFields) => {
    let formattedData = {}
    if (enableVariations) {
      formattedData = {
        ...data,
        product_images: data.product_images?.map((img) => img.file),
        product_variations: data.product_variations?.map((v) => {
          const options = v?.options?.map((o) => o.value)
          return { name: v.name, options }
        }),
        products_sku: data.products_sku?.map((sku) => {
          return {
            ...sku,
            product_price: parseFloat(sku.product_price?.replace('$', '') || 0),
            product_stock: parseInt(sku.product_stock)
          }
        })
      }
    } else {
      formattedData = {
        ...data,
        product_images: data.product_images?.map((img) => img.file),
        product_price: parseFloat(data.product_price?.replace('$', '') || 0),
        product_stock: parseInt(data.product_stock)
      }
    }

    return buildFormData(formattedData, productFields)
  }

  // const handleFormSubmit = () => {
  //   console.log(getValues())
  // }

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     if (!_id) {
  //       setLoading(false)
  //       return
  //     }

  //     try {
  //       const { data } = await getDetailProductByOwnerAPI(_id)
  //       const product = data.metadata
  //       if (!product) return

  //       Object.entries(product).forEach(([key, value]) => {
  //         if (
  //           ![
  //             'product_sku',
  //             'product_classifications',
  //             'isMultiVariation'
  //           ].includes(key)
  //         ) {
  //           const parsedValue =
  //             ['product_min_price', 'product_max_price'].includes(key) &&
  //             typeof value === 'number'
  //               ? value.toString()
  //               : value
  //           setValue(key, parsedValue)
  //         }
  //       })

  //       if (product.product_sku?.length) {
  //         const updatedSKU = product.product_sku.map((skuItem) => {
  //           const mapped = {}
  //           product.product_classifications.forEach((cls, i) => {
  //             const name = cls.name
  //             mapped[name] =
  //               skuItem[name] || cls.options[skuItem.sku_tier_indices?.[i]]
  //           })
  //           return {
  //             ...mapped,
  //             _id: skuItem._id.toString(),
  //             price: skuItem.product_price.toString(),
  //             stock: skuItem.product_stock.toString()
  //           }
  //         })

  //         setValue(
  //           'product_classifications',
  //           product.product_classifications.map((e) => e.name)
  //         )
  //         setValue('product_sku', updatedSKU)
  //         setValue('isMultiVariation', true)
  //       }
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchProduct()
  // }, [_id])

  // useEffect(() => {
  //   if (!isMultiVariation) {
  //     setValue('product_sku', [])
  //     setValue('product_classifications', [])
  //   }
  // }, [isMultiVariation, setValue])

  // useEffect(() => {
  //   if (!isMultiVariation) {
  //     setValue('product_sku', [])
  //     setValue('product_classifications', [])
  //   }
  // }, [isMultiVariation])

  // useEffect(() => {
  //   if (classifications.length === 0) setValue('product_sku', [])
  // }, [classifications, setValue])

  // const formatData = useCallback((data) => {
  //   const parsed = {
  //     ...data,
  //     product_min_price: parseFloat(
  //       data.product_min_price.replace(/[$,]/g, '')
  //     ),
  //     product_max_price: parseFloat(
  //       data.product_max_price.replace(/[$,]/g, '')
  //     ),
  //     product_stock: parseInt(data.product_stock, 10)
  //   }

  //   if (
  //     data.isMultiVariation &&
  //     data.product_sku.length > 0 &&
  //     data.product_classifications.length > 0
  //   ) {
  //     const variations = data.product_classifications || []
  //     const skuList = data.product_sku || []

  //     const formattedSKU = skuList.map((sku) => {
  //       const attrs = Object.fromEntries(
  //         variations.filter((key) => key in sku).map((key) => [key, sku[key]])
  //       )
  //       return {
  //         ...attrs,
  //         _id: sku._id,
  //         price: parseFloat(sku.price.replace(/[$,]/g, '')),
  //         stock: parseInt(sku.stock, 10)
  //       }
  //     })

  //     // Check for duplicates
  //     const seen = new Set()
  //     for (const { price, stock, _id, ...rest } of formattedSKU) {
  //       const key = JSON.stringify(rest).toLowerCase()
  //       if (seen.has(key)) {
  //         toast.error(
  //           'Duplicate SKU detected! Please ensure each variation is unique.'
  //         )
  //         return null
  //       }
  //       seen.add(key)
  //     }

  //     parsed.product_sku = formattedSKU
  //   } else {
  //     parsed.isMultiVariation = false
  //     delete parsed.product_classifications
  //     delete parsed.product_sku
  //   }

  //   Object.keys(parsed).forEach((k) => {
  //     if (k != '_id' && !(k in DEFAULT_VALUES)) delete parsed[k]
  //   })
  //   return parsed
  // }, [])

  // const validateData = useCallback(
  //   (data) => {
  //     if (!data.product_sku?.length) {
  //       if (data.product_min_price !== data.product_max_price) {
  //         setError('product_min_price', {
  //           type: 'manual',
  //           message: 'Min and max price must be the same if no SKU.'
  //         })
  //         setError('product_max_price', {
  //           type: 'manual',
  //           message: 'Min and max price must be the same if no SKU.'
  //         })
  //         return false
  //       }
  //       return true
  //     }

  //     const prices = data.product_sku.map((s) => s.price)
  //     const minPrice = Math.min(...prices)
  //     const maxPrice = Math.max(...prices)
  //     const totalStock = data.product_sku.reduce((sum, s) => sum + s.stock, 0)

  //     const errors = [
  //       {
  //         field: 'product_min_price',
  //         condition: data.product_min_price !== minPrice,
  //         message: `Min price must be ${minPrice}.`
  //       },
  //       {
  //         field: 'product_max_price',
  //         condition: data.product_max_price !== maxPrice,
  //         message: `Max price must be ${maxPrice}.`
  //       },
  //       {
  //         field: 'product_stock',
  //         condition: data.product_stock !== totalStock,
  //         message: `Stock must be ${totalStock}.`
  //       }
  //     ]

  //     let hasError = false
  //     for (const { condition, field, message } of errors) {
  //       if (condition) {
  //         setError(field, { type: 'manual', message })
  //         hasError = true
  //       }
  //     }
  //     return !hasError
  //   },
  //   [setError]
  // )

  // const onSubmit = handleSubmit(async (formData) => {
  //   let data = formatData(formData)
  //   if (!data) return

  //   if (!validateData(data)) return

  //   if (!data.product_thumb.includes('w_180,h_180')) {
  //     data.product_thumb = prepareImageForStorage(data.product_thumb, {
  //       width: 180,
  //       height: 180
  //     })
  //   }

  //   data.product_gallery = data.product_gallery.map((img) => {
  //     if (!img?.includes('w_2000')) {
  //       return prepareImageForStorage(img, {
  //         width: 2000,
  //         crop: 'limit',
  //         quality: 'auto:good'
  //       })
  //     }
  //     return img
  //   })

  //   const api = isEditMode && _id ? updateProductAPI : createProductAPI
  //   await api(data, '.btn-shop-create-product')
  // })

  return {
    ui: {
      loading,
      isSubmitting,
      pageTitle
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
