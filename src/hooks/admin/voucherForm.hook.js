import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'

export const useAdminVoucherForm = ({ action, voucher, onSubmit, onClose }) => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger
  } = useForm({
    defaultValues: {
      voucher_type: 'fixed_amount',
      voucher_visibility: 'public'
    }
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (action === 'update' && voucher) {
      const voucherType = voucher.voucher_type
      setValue('voucher_code', voucher?.voucher_code || '')
      setValue('voucher_name', voucher?.voucher_name || '')
      setValue('voucher_type', voucher?.voucher_type || '')
      setValue('voucher_value', voucher?.voucher_value || '')
      setValue('voucher_start_date', voucher?.voucher_start_date || '')
      setValue('voucher_end_date', voucher?.voucher_end_date || '')
      setValue('voucher_quantity', voucher?.voucher_quantity || '')
      setValue('voucher_visibility', voucher?.voucher_visibility || '')
      setValue(
        'voucher_min_order_value',
        voucher?.voucher_min_order_value || ''
      )
      setValue(
        'voucher_max_distribution_per_buyer',
        voucher?.voucher_max_distribution_per_buyer || ''
      )
      if (voucherType == 'percent')
        setValue(
          'voucher_max_discount_amount',
          voucher?.voucher_max_discount_amount || ''
        )
    } else {
      reset()
    }
  }, [action, voucher])

  const handleFormSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
    } finally {
      setIsSubmitting(false)
    }
  })

  const customHandleClose = () => {
    if (isSubmitting) return
    onClose()
  }

  return {
    register,
    errors,
    control,
    trigger,
    watch,
    handleFormSubmit,
    isSubmitting,
    customHandleClose
  }
}
