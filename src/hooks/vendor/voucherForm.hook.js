import { useForm } from 'react-hook-form'
import { navigate } from '~/helpers/navigation'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getVoucherStatus } from '~/utils/voucherStatus'
import { asyncHandlerShop } from '~/helpers/asyncHandler'
import { StatusCodes } from 'http-status-codes'
import {
  createVoucherByShopAPI,
  getVoucherDetailByShopAPI,
  updateVoucherByShopAPI
} from '~/api/voucher.api'

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
  voucher_max_distribution_per_buyer: '',
  voucher_max_discount_amount: ''
}

const LOADING_CLASS = '.btn-vendor-submit-voucher-form'

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

  const isCreate = pathname === '/vendor/voucher/create'
  const isUpdate = pathname.includes('/vendor/voucher/update')
  const pageTitle = isCreate
    ? 'Create Voucher'
    : isUpdate
    ? 'Update Voucher'
    : ''

  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [voucherStatus, setVoucherStatus] = useState(null)
  const [selectedProducts, setSelectedProducts] = useState([])

  const voucherApply = watch('voucher_apply')

  useEffect(() => {
    if (voucherApply == 'all') {
      clearErrors('voucher_product_ids')
      setSelectedProducts([])
    }
  }, [voucherApply])

  useEffect(() => {
    if (_id && isUpdate) {
      fetchVoucher()
    }
  }, [_id, isUpdate])

  useEffect(() => {
    if (isCreate) setLoading(false)
  }, [pathname])

  const fetchVoucher = async () => {
    try {
      setLoading(true)

      const [res] = await asyncHandlerShop(
        async () => await getVoucherDetailByShopAPI({ _id })
      )

      if (res?.status === StatusCodes.OK) {
        const data = res.resData.metadata
        setFormData(data)
        const { voucher_start_date: start, voucher_end_date: end } = data
        const voucherStatus = getVoucherStatus({ start, end })
        setVoucherStatus(voucherStatus)
      }
    } finally {
      setLoading(false)
    }
  }

  const setFormData = (data) => {
    const { voucher_apply } = data

    Object.keys(DEFAULT_VALUES).forEach((key) => {
      setValue(key, data[key])
    })

    if (voucher_apply == 'specific') setSelectedProducts(data.products)
  }

  const handleOpenModal = () => setOpenModal(true)

  const handleCloseModal = () => setOpenModal(false)

  const handleConfirmProducts = (selectedProducts) => {
    if (selectedProducts.length > 0) {
      clearErrors('voucher_product_ids')
      setSelectedProducts(selectedProducts)
    }

    handleCloseModal()
  }

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.filter((product) => product._id !== productId)
    )
  }

  const handleSubmitForm = handleSubmit(async (data) => {
    const payload = data

    if (data.voucher_apply === 'specific') {
      if (selectedProducts.length == 0) {
        setError('voucher_product_ids', {
          type: 'manual',
          message: 'Please select product.'
        })
        return
      }
      payload.voucher_product_ids = selectedProducts.map(
        (product) => product._id
      )
    }

    try {
      setIsSubmitting(true)
      let statusAPI = null
      if (isCreate) {
        const { status } = await createVoucherByShopAPI({
          payload,
          loadingClass: LOADING_CLASS
        })
        statusAPI = status
      } else if (isUpdate) {
        const { status } = await updateVoucherByShopAPI({
          _id,
          payload,
          loadingClass: LOADING_CLASS
        })
        statusAPI = status
      }

      if (statusAPI == StatusCodes.OK || statusAPI == StatusCodes.CREATED)
        navigate('/vendor/voucher')
    } finally {
      setIsSubmitting(false)
    }
  })

  return {
    ui: {
      loading,
      isSubmitting,
      pageTitle,
      voucherStatus,
      isUpdate,
      openModal
    },
    data: { selectedProducts },
    handler: {
      handleOpenModal,
      handleCloseModal,
      handleConfirmProducts,
      handleRemoveProduct,
      handleSubmitForm
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
