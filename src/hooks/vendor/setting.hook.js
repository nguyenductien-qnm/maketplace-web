import { StatusCodes } from 'http-status-codes'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  getShopSettingByOwnerAPI,
  updateAddressSettingByOwnerAPI,
  updateAlertSettingByOwnerAPI,
  updateCustomCategoriesByOwnerAPI,
  updateOperationSettingByOwnerAPI
} from '~/api/shop.api'
import { useSelector } from 'react-redux'
import { asyncHandlerShop } from '~/helpers/asyncHandler'

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
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState(null)
  const [shopCategoriesTree, setShopCategoriesTree] = useState([])
  const [shopCategoriesCode, setShopCategoriesCode] = useState([])
  const categoriesTree = useSelector((state) => state.categories.categories)

  const DIALOG_CONTENT = {
    ADDRESS: {
      open: openDialog,
      onClose: () => setOpenDialog(false),
      header: 'Why We Request Your Address',
      content:
        'We need your address to ensure accurate delivery, proper shop management, and to calculate shipping fees based on your shop location.'
    },
    ALERT: {
      open: openDialog,
      onClose: () => setOpenDialog(false),
      header: 'Learn More About Shop Alerts',
      content:
        'These alerts will be sent to your registered email address to keep you updated on important shop activities such as new orders, low stock, and customer reviews.'
    },

    REFUND: {
      open: openDialog,
      onClose: () => setOpenDialog(false),
      header: 'Learn More About Refund Types',
      content:
        'Refund type determines how refund requests are handled. “Auto” means refunds are automatically approved by the system, helping you save platform fees. “Manual” allows you to review and approve refund requests yourself — giving you more control but with slightly higher platform fees.'
    },

    CATEGORIES: {
      open: openDialog,
      onClose: () => setOpenDialog(false),
      header: 'Learn More About Custom Categories',
      content:
        'You can only create products under the categories you have customized. When selecting categories, make sure to include both parent and child categories to ensure proper product classification and visibility.'
    }
  }

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
    setLoading(true)
    const [res] = await asyncHandlerShop(
      async () => await getShopSettingByOwnerAPI()
    )

    if (res?.status === StatusCodes.OK) {
      const { metadata: data } = res.resData
      setFieldData(data)
    }

    setLoading(false)
  }

  const setFieldData = (data) => {
    const {
      shop_alerts: alerts,
      shop_address: address,
      shop_categories_tree,
      shop_categories_code
    } = data
    setAddress(address)
    setShopCategoriesTree(shop_categories_tree || [])
    setShopCategoriesCode(shop_categories_code || [])

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

  const handleOpenDialog = (type) => {
    setDialogType(type)
    setOpenDialog(true)
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
      const { shop_categories_code, shop_categories_tree } = resData?.metadata
      setShopCategoriesTree(shop_categories_tree || [])
      setShopCategoriesCode(shop_categories_code || [])
      setOpen(false)
    }
  }

  return {
    loading,
    address,
    openDialog,
    dialogType,
    handleOpenDialog,
    shopCategoriesTree,
    shopCategoriesCode,
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
    handleCustomCategoriesFormSubmit,
    DIALOG_CONTENT
  }
}
export { useVendorSetting }
