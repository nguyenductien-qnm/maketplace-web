import { useForm } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { navigate } from '~/helpers/navigation'
import { getVoucherStatus } from '~/utils/voucherStatus'
import { useVoucherFormStore } from '../state/voucher.form.store'
import { VOUCHER_FORM_DEFAULT_VALUES } from '../constants/voucherForm.constants'
import {
  useShopCreateVoucherMutation,
  useShopUpdateVoucherMutation,
  useShopVoucherFormSnapshotQuery
} from '../server/voucher.form.server'
import { VOUCHER_FORM_TITLE } from '../../admin/constants/voucher.constant'

export const useShopVoucherForm = () => {
  const { _id } = useParams()
  const { pathname } = useLocation()

  const form = useForm({
    defaultValues: VOUCHER_FORM_DEFAULT_VALUES,
    mode: 'onChange'
  })

  const isHydratingRef = useRef(false)

  const { watch, setValue, setError, clearErrors, handleSubmit } = form

  const {
    selectedProducts,
    isOpenProductModal,
    openProductModal,
    closeProductModal,
    setSelectedProducts,
    removeProduct
  } = useVoucherFormStore()

  const voucherApply = watch('voucher_apply')

  const isCreate = pathname === '/vendor/voucher/create'
  const isUpdate = pathname.includes('/vendor/voucher/update')

  const snapshotQuery = useShopVoucherFormSnapshotQuery({
    _id,
    isUpdate
  })

  const createMutation = useShopCreateVoucherMutation()

  const updateMutation = useShopUpdateVoucherMutation()

  const voucherStatus = snapshotQuery.data
    ? getVoucherStatus({
        start: snapshotQuery.data.voucher_start_date,
        end: snapshotQuery.data.voucher_end_date
      })
    : null

  useEffect(() => {
    if (!snapshotQuery.data) return
    isHydratingRef.current = true

    const data = snapshotQuery.data
    Object.keys(VOUCHER_FORM_DEFAULT_VALUES).forEach((key) => {
      setValue(key, data[key])
    })

    if (data.voucher_apply === 'specific') {
      setSelectedProducts(data.products)
      setValue('voucher_product_ids', data.voucher_product_ids)
    }

    if (data.voucher_type == 'percent')
      setValue('voucher_max_discount_amount', data.voucher_max_discount_amount)

    setTimeout(() => {
      isHydratingRef.current = false
    }, 0)
  }, [snapshotQuery.data])

  useEffect(() => {
    if (isHydratingRef.current) return
    if (voucherApply === 'all') {
      clearErrors('voucher_product_ids')
      setSelectedProducts([])
    }
  }, [voucherApply])

  const validateSpecificProducts = () => {
    if (selectedProducts.length === 0) {
      setError('voucher_product_ids', {
        type: 'manual',
        message: 'Please select product.'
      })
      return false
    }
    return true
  }

  const handleConfirmProducts = (data) => {
    if (data?.length == 0) return
    setSelectedProducts(data)
    clearErrors('voucher_product_ids')
  }

  const handleRemoveProduct = (productId) => {
    if (!productId) return
    removeProduct(productId)
  }

  const handleCreateVoucher = handleSubmit(async (data) => {
    if (data.voucher_apply === 'specific') {
      if (!validateSpecificProducts()) {
        return
      } else {
        data.voucher_product_ids = selectedProducts.map((p) => p._id)
      }
    }

    createMutation.mutate(
      { payload: data },
      { onSuccess: () => navigate('/vendor/voucher') }
    )
  })

  const handleUpdateVoucher = handleSubmit(async (data) => {
    if (data.voucher_apply === 'specific') {
      if (!validateSpecificProducts()) {
        return
      } else {
        data.voucher_product_ids = selectedProducts.map((p) => p._id)
      }
    }

    if (data.voucher_apply === 'specific' && !validateSpecificProducts()) return

    updateMutation.mutate(
      { _id, payload: data },
      { onSuccess: () => navigate('/vendor/voucher') }
    )
  })

  return {
    ui: {
      isLoading: snapshotQuery.isLoading,
      title: _id ? VOUCHER_FORM_TITLE['update'] : VOUCHER_FORM_TITLE['create'],
      isSubmitting: createMutation.isPending || updateMutation.isPending,
      voucherStatus,
      isOpenProductModal,
      isUpdate
    },

    data: {
      selectedProducts
    },

    handler: {
      handleSubmitForm: _id ? handleUpdateVoucher : handleCreateVoucher,
      handleOpenModal: openProductModal,
      handleCloseModal: closeProductModal,
      handleRemoveProduct,
      handleConfirmProducts
    },
    form
  }
}
