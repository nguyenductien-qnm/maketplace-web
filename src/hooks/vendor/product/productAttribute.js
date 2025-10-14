import { useFieldArray } from 'react-hook-form'
import { toast } from 'react-toastify'

export const useProductAttributes = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'product_attributes'
  })

  const handleAddAttribute = () => {
    const length = fields?.length
    if (length > 9) {
      toast.warn('You can add up to 10 items only')
      return
    }
    append({ key: '', value: '' })
  }

  const handleRemoveAttribute = (index) => {
    remove(index)
  }

  return {
    fieldsAttribute: fields,
    handleAddAttribute,
    handleRemoveAttribute
  }
}
