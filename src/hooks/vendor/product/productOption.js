import { useRef } from 'react'
import { useFieldArray } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'

export const useProductOptions = ({
  control,
  errors,
  setError,
  clearErrors,
  variationIndex
}) => {
  const { fields, update, append, remove, move } = useFieldArray({
    control,
    name: `product_variations.${variationIndex}.options`
  })

  const debounceRef = useRef(null)

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

  return {
    fieldsOptions: fields,
    handleAddOption,
    handleRemoveOption,
    handleChangeOption,
    triggerUpdateOption,
    handleMoveOption
  }
}
