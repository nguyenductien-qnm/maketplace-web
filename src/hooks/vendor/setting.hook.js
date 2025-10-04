import { StatusCodes } from 'http-status-codes'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { navigate } from '~/helpers/navigation'
import {
  getShopSettingByOwnerAPI,
  updateAddressSettingByOwnerAPI,
  updateAlertSettingByOwnerAPI,
  updateCustomCategoriesByOwnerAPI,
  updateOperationSettingByOwnerAPI
} from '~/api/shop.api'
import { useSelector } from 'react-redux'

const ADDRESS_FIELDS = ['province', 'district', 'ward', 'street']

const ALERT_FIELDS = [
  'alert_low_stock_enabled',
  'alert_low_stock_threshold',
  'alert_new_order',
  'alert_new_review',
  'alert_order_delivered',
  'alert_order_cancelled'
]

const OPERATION_FIELDS = ['shop_status', 'shop_refund_type']

const LOADING_CLASS = ['.btn-action-setting-owner']

const useVendorSetting = () => {
  const [loading, setLoading] = useState(true)
  const [address, setAddress] = useState(null)
  const [open, setOpen] = useState(false)
  const [shopCategories, setShopCategories] = useState([])
  const categoriesTree = useSelector((state) => state.categories.categories)

  const {
    register,
    setValue,
    formState: { errors },
    control,
    handleSubmit,
    getValues
  } = useForm()

  useEffect(() => {
    fetchShop()
  }, [])

  const fetchShop = async () => {
    try {
      setLoading(true)
      const { status, resData } = await getShopSettingByOwnerAPI()
      if (status === StatusCodes.OK) {
        const { metadata: data } = resData
        setFieldData(data)
      }
    } catch (err) {
      const { status } = err
      if (status === StatusCodes.FORBIDDEN || status === StatusCodes.NOT_FOUND)
        navigate('/unauthorized')
    } finally {
      setLoading(false)
    }
  }

  const setFieldData = (data) => {
    const { shop_alerts: alerts, shop_address: address, shop_categories } = data
    setAddress(address)
    setShopCategories(shop_categories || [])

    setValue('alert_low_stock_enabled', alerts?.alert_low_stock.enabled)
    setValue('alert_low_stock_threshold', alerts?.alert_low_stock.threshold)
    setValue('alert_new_order', alerts?.alert_new_order)
    setValue('alert_order_cancelled', alerts?.alert_order_cancelled)
    setValue('alert_order_delivered', alerts?.alert_order_delivered)
    setValue('alert_new_review', true)
    setValue('shop_status', data?.shop_status)
    setValue('shop_refund_type', data?.shop_refund_type)
    setValue('province', address?.province || {})
    setValue('district', address?.district || {})
    setValue('ward', address?.ward || {})
    setValue('street', address?.street || '')
  }

  const handleAddressFormSubmit = handleSubmit(async () => {
    const payload = Object.fromEntries(
      ADDRESS_FIELDS.map((field) => [field, getValues(field)])
    )

    await updateAddressSettingByOwnerAPI({
      payload,
      loadingClass: LOADING_CLASS
    })
  })

  const handleAlertFormSubmit = handleSubmit(async () => {
    const payload = Object.fromEntries(
      ALERT_FIELDS.map((field) => [field, getValues(field)])
    )
    await updateAlertSettingByOwnerAPI({ payload, loadingClass: LOADING_CLASS })
  })

  const handleOperationFormSubmit = handleSubmit(async () => {
    const payload = Object.fromEntries(
      OPERATION_FIELDS.map((field) => [field, getValues(field)])
    )
    await updateOperationSettingByOwnerAPI({
      payload,
      loadingClass: LOADING_CLASS
    })
  })

  const handleCustomCategoriesFormSubmit = async (data) => {
    const { status, resData } = await updateCustomCategoriesByOwnerAPI({
      payload: { shop_categories: data },
      loadingClass: LOADING_CLASS
    })
    if (status === StatusCodes.OK) {
      setShopCategories(resData?.metadata || [])
      setOpen(false)
    }
  }

  return {
    loading,
    address,
    shopCategories,
    register,
    setValue,
    errors,
    control,
    categoriesTree,
    open,
    setOpen,
    handleAddressFormSubmit,
    handleAlertFormSubmit,
    handleOperationFormSubmit,
    handleCustomCategoriesFormSubmit
  }
}
export { useVendorSetting }
