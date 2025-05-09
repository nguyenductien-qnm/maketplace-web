import { useParams } from 'react-router-dom'
import SPUForm from './SPUForm'
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
  Typography
} from '@mui/material'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import SKUForm from './SKUForm'
import { toast } from 'react-toastify'
import {
  createProductAPI,
  getDetailProductByOwnerAPI,
  updateProductAPI
} from '~/api/product.api'
import { useEffect, useState } from 'react'
import TypographyLabel from '~/components/common/TypographyLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import ProductFormSkeleton from './ProductFormSkeleton'
import resizeImage from '~/helpers/resizeImage'

const variations = ['Type', 'Size', 'Color', 'Material']
function ProductForm() {
  const { page } = useParams()
  const { _id } = useParams()
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
  const variationSelected = watch('product_classifications')
  const classifications = watch('product_classifications')

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getDetailProductByOwnerAPI(_id)
      const data = res.data.metadata
      if (!data) return
      Object.keys(data).forEach((key) => {
        if (
          key !== 'isMultiVariation' &&
          key !== 'product_sku' &&
          key !== 'product_classifications'
        ) {
          if (key == 'product_min_price' || key == 'product_max_price') {
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
      setLoading(false)
    }
    if (_id) fetchProduct()
  }, [_id])

  useEffect(() => {
    if (!isMultiVariation) {
      setValue('product_sku', [])
      setValue('product_classifications', [])
    }
  }, [isMultiVariation, setValue])

  useEffect(() => {
    if (classifications.length == 0) setValue('product_sku', [])
  }, [classifications])

  useEffect(() => {
    if (page === 'create-product') setLoading(false)
  }, [page])

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
      let hasDuplicate = false

      for (const item of formattedData.product_sku) {
        const { price, stock, _id, ...skuWithoutPriceStock } = item
        const skuKey = JSON.stringify(skuWithoutPriceStock).toLowerCase()
        if (seen.has(skuKey)) {
          toast.error(
            'Duplicate SKU detected! Please ensure each variation is unique.'
          )
          hasDuplicate = true
          break
        }

        seen.add(skuKey)
      }

      if (hasDuplicate) {
        return
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

    formattedData.product_thumb = resizeImage(
      formattedData.product_thumb,
      180,
      180
    )

    formattedData.product_gallery = formattedData.product_gallery.map((image) =>
      resizeImage(image, 2000, 2000)
    )

    if (page === 'update-product' && _id)
      await updateProductAPI(formattedData, '.btn-shop-create-product')
    else await createProductAPI(formattedData, '.btn-shop-create-product')
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {page === 'create-product' && (
          <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>
            Create Product
          </Typography>
        )}

        {page === 'update-product' && (
          <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>
            Update Product
          </Typography>
        )}

        <Divider sx={{ mt: '10px', mb: '30px' }} />
        {loading && <ProductFormSkeleton />}
        {!loading && (
          <Box>
            <SPUForm />

            <FormControlLabel
              control={
                <Switch
                  checked={isMultiVariation}
                  onChange={() =>
                    setValue('isMultiVariation', !isMultiVariation)
                  }
                  color="primary"
                />
              }
              label="Multi variation"
            />

            {isMultiVariation && (
              <Box sx={{ marginTop: '20px' }}>
                <TypographyLabel>Product variations</TypographyLabel>
                <FormControl fullWidth>
                  <Controller
                    name="product_classifications"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        size="small"
                        multiple
                        value={variationSelected}
                        onChange={(event) =>
                          setValue(
                            'product_classifications',
                            event.target.value
                          )
                        }
                        input={<OutlinedInput id="select-multiple-chip" />}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                      >
                        {variations.map((variation) => (
                          <MenuItem key={variation} value={variation}>
                            {variation}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>
            )}

            {productSKU.length > 0 && <SKUForm />}

            {isMultiVariation && (
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => {
                  const currentVariations =
                    getValues('product_classifications') || []

                  if (currentVariations.length === 0) {
                    toast.error('Please select variation first')
                    return
                  }

                  let newProductSKU = { price: '', stock: '' }

                  currentVariations.forEach((variation) => {
                    newProductSKU[variation] = ''
                  })

                  const currentProductSKU = getValues('product_sku') || []
                  setValue('product_sku', [...currentProductSKU, newProductSKU])
                }}
              >
                + Add Variation
              </Button>
            )}

            <Box sx={{ mt: '20px' }}>
              <Button
                className="btn-shop-create-product"
                type="submit"
                variant="contained"
                sx={{ width: '100%' }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        )}
      </form>
    </FormProvider>
  )
}
export default ProductForm
