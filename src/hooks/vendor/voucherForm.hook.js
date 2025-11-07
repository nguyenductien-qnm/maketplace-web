import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const DEFAULT_VALUES = {
  voucher_name: '',
  voucher_code: '',
  voucher_start_date: '',
  voucher_end_date: '',
  voucher_type: 'fixed_amount',
  voucher_visibility: 'public',
  voucher_apply: 'all',
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
    trigger,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange'
  })

  const { _id } = useParams()
  const { pathname } = useLocation()

  const [openModal, setOpenModal] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])
  const voucherApply = watch('voucher_apply')

  useEffect(() => {
    if (voucherApply == 'all') setSelectedProducts([])
  }, [voucherApply])

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

  const handleOpenModal = () => setOpenModal(true)

  const handleCloseModal = () => setOpenModal(false)

  const handleConfirmProducts = (selectedProducts) => {
    setSelectedProducts(selectedProducts)
    handleCloseModal()
  }

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.filter((product) => product._id !== productId)
    )
  }

  return {
    ui: { loading, isSubmitting, pageTitle, openModal },
    data: { selectedProducts },
    handler: {
      handleOpenModal,
      handleCloseModal,
      handleConfirmProducts,
      handleRemoveProduct
    },
    form: {
      register,
      control,
      trigger,
      errors,
      setError,
      clearErrors,
      getValues,
      setValue,
      watch
    }
  }
}
