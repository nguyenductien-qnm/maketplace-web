import { useRef, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { toast } from 'react-toastify'
import { FIELD_REQUIRED_MESSAGE, MAX_TOTAL_VARIANTS } from '~/utils/validators'

export const useProductOptions = ({ form, variationIndex }) => {
  const [activeId, setActiveId] = useState(null)
  const [activeIndex, setActiveIndex] = useState(null)

  const { control, watch, errors, setError, clearErrors, setValue, getValues } =
    form
  const { fields, update, append, remove, move } = useFieldArray({
    control,
    name: `product_variations.${variationIndex}.options`
  })

  const debounceRef = useRef(null)

  const calculateTotalCombinations = (variations) => {
    if (!variations || variations.length === 0) return 0

    return variations.reduce((total, variation) => {
      const optionCount =
        variation.options?.filter((opt) => opt.value?.trim()).length || 0
      return total === 0 ? optionCount : total * optionCount
    }, 0)
  }

  const handleAddOption = () => {
    const error = errors?.product_variations?.[variationIndex]?.options
    if (error) return
    for (let index = 0; index < fields.length; index++) {
      const opt = fields[index].value
      if (!opt.trim()) {
        setError(
          `product_variations.${variationIndex}.options.${index}.value`,
          {
            type: 'manual',
            message: FIELD_REQUIRED_MESSAGE
          },
          { shouldFocus: true }
        )
        return
      }
    }

    const allVariations = watch('product_variations')

    const updatedVariations = allVariations.map((v, idx) => {
      if (idx === variationIndex) {
        return {
          ...v,
          options: [...v.options, { value: 'temp' }]
        }
      }
      return v
    })

    const totalCombinations = calculateTotalCombinations(updatedVariations)

    if (totalCombinations > MAX_TOTAL_VARIANTS) {
      toast.error(`Cannot add more options. Total combinations maximum is 96`)

      return
    }
    append({ value: '' })
  }

  const handleRemoveOption = (index) => {
    clearErrors(`product_variations.${variationIndex}.options.${index}`)
    remove(index)
    const updatedFields = fields.filter((_, i) => i !== index)
    setFieldsError(updatedFields)
  }

  const handleMoveOption = (oldIndex, newIndex) => {
    move(oldIndex, newIndex)

    const currentSKU = getValues('products_sku')

    const createIndexMap = (old, newIdx) => {
      if (old < newIdx) {
        return (idx) => {
          if (idx === old) return newIdx
          if (idx > old && idx <= newIdx) return idx - 1
          return idx
        }
      } else {
        return (idx) => {
          if (idx === old) return newIdx
          if (idx >= newIdx && idx < old) return idx + 1
          return idx
        }
      }
    }

    const mapIndex = createIndexMap(oldIndex, newIndex)

    const newProductsSKU = currentSKU
      .map((sku) => ({
        ...sku,
        sku_tier_indices: sku.sku_tier_indices.map((idx, i) =>
          i === variationIndex ? mapIndex(idx) : idx
        )
      }))
      .sort((a, b) => {
        for (let i = 0; i < a.sku_tier_indices.length; i++) {
          const diff = a.sku_tier_indices[i] - b.sku_tier_indices[i]
          if (diff !== 0) return diff
        }
        return 0
      })

    setValue('products_sku', newProductsSKU)
  }

  const handleChangeOption = (e, optionIndex) => {
    const value = e.target.value
    clearErrors(
      `product_variations.${variationIndex}.options.${optionIndex}.value`
    )

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      validateOptionChange(value, optionIndex)
    }, 300)
  }

  const triggerUpdateOption = (e, optionIndex) => {
    update(optionIndex, { value: e.target.value })
  }

  const validateOptionChange = (value, optionIndex) => {
    const valueMap = new Map()

    let cloneFields = [...fields]

    cloneFields = cloneFields.map((data, i) =>
      i === optionIndex ? { ...data, value } : data
    )

    cloneFields.forEach((opt) => {
      const val = opt.value.trim().toLowerCase()
      valueMap.set(val, (valueMap.get(val) || 0) + 1)
    })

    setFieldsError(cloneFields)
  }

  const setFieldsError = (fieldsToValidate) => {
    const valueMap = new Map()
    fieldsToValidate.forEach((opt) => {
      const val = opt.value.trim().toLowerCase()
      valueMap.set(val, (valueMap.get(val) || 0) + 1)
    })

    for (let i = 0; i < fieldsToValidate.length; i++) {
      const optValue = fieldsToValidate[i].value.trim().toLowerCase()
      if (valueMap.get(optValue) > 1) {
        setError(
          `product_variations.${variationIndex}.options.${i}.value`,
          { type: 'manual', message: 'The option must be different.' },
          { shouldFocus: false }
        )
      } else if (optValue) {
        clearErrors(`product_variations.${variationIndex}.options.${i}.value`)
      } else {
        setError(
          `product_variations.${variationIndex}.options.${i}.value`,
          { type: 'manual', message: FIELD_REQUIRED_MESSAGE },
          { shouldFocus: false }
        )
      }
    }
  }

  const handleDragStart = (event) => {
    const id = event.active.id
    setActiveId(id)
    const index = fields.findIndex((o) => o.id == id)
    setActiveIndex(index)
    document.body.style.cursor = 'grabbing'
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveId(null)
    setActiveIndex(null)
    document.body.style.cursor = ''
    if (!over) return
    if (active.id === over.id) return

    const oldIndex = fields.findIndex((i) => i.id === active.id)
    const newIndex = fields.findIndex((i) => i.id === over.id)
    handleMoveOption(oldIndex, newIndex)
  }

  return {
    activeId,
    activeIndex,
    fieldsOptions: fields,
    handleAddOption,
    handleRemoveOption,
    handleChangeOption,
    triggerUpdateOption,
    handleDragStart,
    handleDragEnd
  }
}
