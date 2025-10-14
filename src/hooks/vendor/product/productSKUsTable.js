import { useEffect } from 'react'
import { useWatch } from 'react-hook-form'

export const useProductSKUsTable = ({ form }) => {
  const watchedVariations = useWatch({
    control: form.control,
    name: 'product_variations'
  })

  const productSKUs = form.watch('product_skus')

  useEffect(() => {
    if (watchedVariations && watchedVariations.length > 0) {
      const currentSkus = form.getValues('product_skus') || []
      const newSkus = generateSKUs(watchedVariations)

      const updatedSkus = newSkus.map((newSku) => {
        const oldSku = currentSkus.find(
          (sku) =>
            JSON.stringify(sku.sku_tier_indices) ===
            JSON.stringify(newSku.sku_tier_indices)
        )
        return oldSku
          ? { ...newSku, price: oldSku.price, stock: oldSku.stock }
          : newSku
      })
      form.setValue('product_skus', updatedSkus)
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
            price: '',
            stock: ''
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
