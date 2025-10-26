import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router-dom'

const DEFAULT_VALUES = {
  voucher_name: '',
  voucher_code: '',
  voucher_start_date: '',
  voucher_end_date: '',
  voucher_type: '',
  voucher_status: '',
  voucher_value: '',
  voucher_quantity: '',
  voucher_min_order_value: '',
  voucher_max_distribution_per_buyer: ''
}
export const useVendorVoucherForm = () => {
  const {
    setValue,
    watch,
    register,
    getValues,
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm(DEFAULT_VALUES)

  const { _id } = useParams()
  const { pathname } = useLocation()

  const isCreate = pathname === '/vendor/voucher/create'
  const isUpdate = pathname.includes('/vendor/voucher/update')
  const pageTitle = isCreate
    ? 'Create Voucher'
    : isUpdate
    ? 'Update Voucher'
    : ''

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isCreate) setLoading(false)
  }, [pathname])

  return {
    ui: { loading, isSubmitting, pageTitle },
    form: {
      register,
      control,
      errors,
      setError,
      clearErrors,
      getValues,
      setValue,
      watch
    }
  }
}
