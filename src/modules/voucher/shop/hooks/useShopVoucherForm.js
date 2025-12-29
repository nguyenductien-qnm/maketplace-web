import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { navigate } from '~/helpers/navigation'
import { StatusCodes } from 'http-status-codes'
import { getVoucherStatus } from '~/utils/voucherStatus'
import { useShopVoucherFormServer } from '../server/voucher.form.server'
import { useVoucherFormStore } from '../state/voucher.form.store'
import {
  VOUCHER_FORM_DEFAULT_VALUES,
  VOUCHER_FORM_PAGE_TITLE
} from '../constants/voucherForm.constants'

export const useShopVoucherForm = () => {
  /* --------------------------- page mode ---------------------------------- */

  const { _id } = useParams()
  const { pathname } = useLocation()

  const isCreate = pathname === '/vendor/voucher/create'
  const isUpdate = pathname.includes('/vendor/voucher/update')

  const pageTitle = isCreate
    ? VOUCHER_FORM_PAGE_TITLE.CREATE
    : isUpdate
    ? VOUCHER_FORM_PAGE_TITLE.UPDATE
    : ''

  const form = useForm({
    defaultValues: VOUCHER_FORM_DEFAULT_VALUES,
    mode: 'onChange'
  })

  const { watch, setValue, setError, clearErrors, handleSubmit } = form

  /* --------------------------- UI state ----------------------------------- */

  const {
    openModal,
    selectedProducts,
    openProductModal,
    closeProductModal,
    setSelectedProducts,
    removeProduct,
    resetFormState
  } = useVoucherFormStore()

  /* ------------------------- server state --------------------------------- */

  const { detailQuery, createMutation, updateMutation } =
    useShopVoucherFormServer({
      _id,
      isUpdate
    })

  const loading = detailQuery.isLoading
  const isSubmitting = createMutation.isPending || updateMutation.isPending

  /* ------------------------ derived state --------------------------------- */

  const voucherApply = watch('voucher_apply')

  const voucherStatus = detailQuery.data
    ? getVoucherStatus({
        start: detailQuery.data.resData.metadata.voucher_start_date,
        end: detailQuery.data.resData.metadata.voucher_end_date
      })
    : null

  /* ----------------------------- effects ---------------------------------- */

  // map server data -> form
  useEffect(() => {
    if (!detailQuery.data) return

    const data = detailQuery.data.resData.metadata

    Object.keys(VOUCHER_FORM_DEFAULT_VALUES).forEach((key) => {
      setValue(key, data[key])
    })

    if (data.voucher_apply === 'specific') {
      setSelectedProducts(data.products ?? [])
    }
  }, [detailQuery.data])

  // clear products when apply = all
  useEffect(() => {
    if (voucherApply === 'all') {
      clearErrors('voucher_product_ids')
      setSelectedProducts([])
    }
  }, [voucherApply])

  /* ----------------------------- guard ------------------------------------ */

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

  /* ----------------------------- submit ----------------------------------- */

  const handleSubmitForm = handleSubmit(async (formData) => {
    if (formData.voucher_apply === 'specific' && !validateSpecificProducts()) {
      return
    }

    const payload = {
      ...formData,
      voucher_product_ids:
        formData.voucher_apply === 'specific'
          ? selectedProducts.map((p) => p._id)
          : []
    }

    const mutation = isCreate ? createMutation : updateMutation

    const res = await mutation.mutateAsync({
      _id,
      payload
    })

    if (res.status === StatusCodes.CREATED) {
      resetFormState()
      navigate('/vendor/voucher')
    }
  })

  /* ----------------------------- return ----------------------------------- */

  return {
    ui: {
      loading,
      isSubmitting,
      pageTitle,
      isUpdate,
      voucherStatus,
      openModal
    },
    data: {
      selectedProducts
    },
    handler: {
      handleSubmitForm,
      handleOpenModal: openProductModal,
      handleCloseModal: closeProductModal,
      handleConfirmProducts: setSelectedProducts,
      handleRemoveProduct: removeProduct
    },
    form
  }
}
