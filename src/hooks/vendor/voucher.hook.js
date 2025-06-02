import { useState, useEffect } from 'react'
import {
  queryVoucherByOwnerAPI,
  shopCreateVoucherAPI,
  shopDeleteVoucherAPI,
  shopUpdateVoucherAPI
} from '~/api/voucher.api'
import { queryProductByOwnerAPI } from '~/api/product.api'
import { useForm } from 'react-hook-form'

export const useVendorVoucher = (status) => {
  const [vouchers, setVouchers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchVouchers = async (filter = {}) => {
    setLoading(true)
    try {
      const res = await queryVoucherByOwnerAPI({ status, ...filter })
      setVouchers(res?.data?.metadata || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVouchers()
  }, [])

  const createVoucher = async (data) => {
    const res = await shopCreateVoucherAPI(data, [
      '.btn-shop-cancel-submit-voucher',
      '.btn-shop-submit-voucher'
    ])
    if (res.status === 200) {
      setVouchers((prev) => [res?.data?.metadata, ...prev])
    }
    return res
  }

  const updateVoucher = async (data) => {
    const res = await shopUpdateVoucherAPI(data, [
      '.btn-shop-cancel-submit-voucher',
      '.btn-shop-submit-voucher'
    ])
    if (res.status === 200) {
      setVouchers((prev) =>
        prev.map((v) =>
          v._id === res?.data?.metadata?._id ? res?.data?.metadata : v
        )
      )
    }
    return res
  }

  const deleteVoucher = async (data) => {
    const { _id } = data
    const res = await shopDeleteVoucherAPI({ _id }, [
      '.btn-shop-confirm-delete-voucher',
      '.btn-shop-cancel-delete-order'
    ])
    if (res.status === 200) {
      setVouchers((prev) => prev.filter((v) => v._id !== _id))
    }
    return res
  }

  return {
    vouchers,
    loading,
    fetchVouchers,
    createVoucher,
    updateVoucher,
    deleteVoucher
  }
}

export const useVendorVoucherModal = ({
  voucher,
  action,
  onClose,
  handleCreateVoucher,
  handleUpdateVoucher
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    control
  } = useForm({
    shouldUnregister: true,
    defaultValues: {
      voucher_type: 'percent',
      voucher_status: 'public',
      voucher_applies: 'all'
    }
  })

  const voucherApplies = watch('voucher_applies')
  const voucherStatus = watch('voucher_status')
  const voucherType = watch('voucher_type')

  const [searchValue, setSearchValue] = useState('')
  const [selectProduct, setSelectProduct] = useState([])
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      if (voucherApplies === 'specific') {
        try {
          setLoading(true)
          const res = await queryProductByOwnerAPI({ status: 'PUBLIC' })
          setProduct(res?.data?.metadata)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchProducts()
  }, [voucherApplies])

  useEffect(() => {
    if (voucher) {
      setSelectProduct(voucher?.voucher_product_ids || [])
      reset({ ...voucher })
    } else {
      reset({})
      setSelectProduct([])
    }
  }, [voucher])

  const handleSearch = async () => {
    try {
      setLoading(true)
      const res = await queryProductByOwnerAPI({
        status: 'PUBLIC',
        search: searchValue
      })
      setProduct(res?.data?.metadata)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectProduct = (product) => {
    setSelectProduct((prev) =>
      prev.includes(product._id)
        ? prev.filter((id) => id !== product._id)
        : [...prev, product._id]
    )
  }

  const onSubmit = handleSubmit(async (data) => {
    if (voucherApplies === 'specific') {
      data.voucher_product_ids = selectProduct
    } else {
      delete data.voucher_product_ids
    }

    let res = null
    if (action === 'CREATE') {
      res = await handleCreateVoucher(data)
    } else if (action === 'UPDATE') {
      data._id = voucher._id
      res = await handleUpdateVoucher(data)
    }

    if (res.status === 200) {
      reset()
      onClose()
    }
  })

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    watch,
    control,
    voucherStatus,
    voucherType,
    voucherApplies,
    product,
    loading,
    searchValue,
    setSearchValue,
    handleSearch,
    handleSelectProduct,
    selectProduct
  }
}
