import { useFieldArray } from 'react-hook-form'
import { toast } from 'react-toastify'

export const useProductImages = ({ control }) => {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'product_images'
  })

  const handleUploadImages = (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    if (files.length + fields?.length > 9) {
      toast.warn('You can only upload up to 9 files.')
      return
    }

    files.forEach((file) => {
      const url = URL.createObjectURL(file)
      append({ url, file })
    })
  }

  const handleRemoveImages = (index) => {
    remove(index)
  }

  const handleMoveImages = (fromIndex, toIndex) => {
    move(fromIndex, toIndex)
  }

  return {
    fieldsImage: fields,
    handleUploadImages,
    handleRemoveImages,
    handleMoveImages
  }
}
