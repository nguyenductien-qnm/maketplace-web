import { useEffect } from 'react'
import { useWatch } from 'react-hook-form'

export const useProductSKUsTable = ({ form }) => {
  const watchedVariations = useWatch({
    control: form.control,
    name: 'product_variations'
  })

  const productSKUs = form.watch('products_sku')

  useEffect(() => {
    if (watchedVariations && watchedVariations.length > 0) {
      const currentSkus = form.getValues('products_sku') || []
      const newSkus = generateSKUs(watchedVariations)

      const updatedSkus = newSkus.map((newSku) => {
        const oldSku = currentSkus.find(
          (sku) =>
            JSON.stringify(sku.sku_tier_indices) ===
            JSON.stringify(newSku.sku_tier_indices)
        )
        return oldSku
          ? {
              ...newSku,
              product_price: oldSku.product_price,
              product_stock: oldSku.product_stock,
              product_code: oldSku.product_code
            }
          : newSku
      })
      form.setValue('products_sku', updatedSkus)
    }
  }, [
    watchedVariations?.length,
    watchedVariations?.map((v) => v.options.length).join(',')
  ])

  const generateSKUs = () => {
    if (!watchedVariations || watchedVariations.length === 0) return []

    const generate = (variations, indices = []) => {
      if (indices.length === variations.length) {
        return [
          {
            sku_tier_indices: [...indices],
            product_code: null,
            product_price: '',
            product_stock: ''
          }
        ]
      }

      const currentVariation = variations[indices.length]
      let result = []

      currentVariation.options.forEach((_, idx) => {
        result = result.concat(generate(variations, [...indices, idx]))
      })

      return result
    }

    return generate(watchedVariations)
  }

  return {
    productVariations: watchedVariations,
    productSKUs
  }
}
