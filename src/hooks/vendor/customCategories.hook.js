import { useState } from 'react'
import { useForm } from 'react-hook-form'

const useVendorCustomCategories = ({ onSubmit }) => {
  const { control, getValues, handleSubmit, setValue } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFormSubmit = handleSubmit(async () => {
    setIsSubmitting(true)
    try {
      const values = getValues()
      const data = values.shop_categories?.map((c) => {
        if (c) return c.toString()
      })
      await onSubmit(data)
    } finally {
      setIsSubmitting(false)
    }
  })

  return {
    control,
    setValue,
    isSubmitting,
    handleFormSubmit
  }
}

export default useVendorCustomCategories
