import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const LOADING_CLASS = [
  '.btn-submit-commission-form',
  '.btn-cancel-submit-commission-form'
]

export const useAdminCommissionRateForm = ({
  action,
  commissionRate,
  onSubmit
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors }
  } = useForm()

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (action === 'update' && commissionRate) {
      setValue('_id', commissionRate?._id || '')
      setValue('category_code', commissionRate.category_code || '')
      setValue('refund_rate_auto', commissionRate.refund_rate_auto || '')
      setValue('refund_rate_manual', commissionRate.refund_rate_manual || '')
    } else {
      reset()
    }
  }, [action, commissionRate])

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await onSubmit({ data, loadingClass: LOADING_CLASS })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    handleFormSubmit,
    isSubmitting,
    control
  }
}
