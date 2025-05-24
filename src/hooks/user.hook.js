import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  addNewAddressAPI,
  changePasswordAPI,
  deleteAddressAPI,
  getAddressListAPI,
  getUserInfoAPI,
  setDefaultAddressAPI,
  updateAddressAPI
} from '~/api/user.api'
import { uploadImageToCloudinary } from '~/helpers/apiSendImage'
import {
  accountMigrationAPI,
  setupAccountAPI,
  updateUserInfoAPI
} from '~/redux/user.slice'
import formatDateForInput from '~/utils/formatDateForInput'
import interceptorLoadingElements from '~/utils/interceptorLoading'
import generateURL from '~/utils/generateURL'
import { toast } from 'react-toastify'
import { checkShopURLAPI } from '~/api/shop.api'
import sortAddressByDefault from '~/helpers/sortAddressByDefault'

const steps = ['CHANGE YOUR PASSWORD', 'INFORMATION USER']

export const useSetupAccount = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())
  const [formData, setFormData] = useState({
    new_password: '',
    confirm_password: '',
    userInfo: {}
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formRef = useRef(null)

  const isStepSkipped = (step) => skipped.has(step)

  const handleNext = () => {
    if (activeStep === 0) {
      formRef.current?.submitFormPassword()
    } else {
      formRef.current?.submitFormInfo()
    }
  }

  const handleBack = () => setActiveStep((prev) => prev - 1)

  const handleSkip = () => {
    setSkipped((prev) => new Set(prev).add(activeStep))
    setActiveStep((prev) => prev + 1)
  }

  const handleSubmitPassword = (data) => {
    setFormData((prev) => ({
      ...prev,
      new_password: data.new_password,
      confirm_password: data.confirm_password
    }))
    setActiveStep((prev) => prev + 1)
  }

  const handleSubmitInfo = async (data) => {
    await new Promise((resolve) => {
      setFormData((prev) => {
        resolve()
        return { ...prev, userInfo: data }
      })
    })
    setActiveStep((prev) => prev + 1)
  }

  const finishProgress = async () => {
    const res = await dispatch(
      setupAccountAPI({
        data: formData,
        loadingClass: '.btn-auth-setup-account'
      })
    )
    if (res.payload?.status === 200) {
      setTimeout(() => navigate('/home'), 1000)
    }
  }

  return {
    steps,
    activeStep,
    isStepSkipped,
    formRef,
    handleNext,
    handleBack,
    handleSkip,
    handleSubmitPassword,
    handleSubmitInfo,
    finishProgress
  }
}

export const useChangePassword = () => {
  const methods = useForm()

  const onSubmit = methods.handleSubmit(async (data) => {
    const result = await changePasswordAPI(data, '.btn-user-change-password')
    if (result.status === 200) methods.reset({})
  })

  return {
    ...methods,
    onSubmit
  }
}

export const useUserInfoForm = () => {
  const dispatch = useDispatch()
  const methods = useForm()

  const { reset, getValues } = methods

  const [avatarUrl, setAvatarUrl] = useState(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await getUserInfoAPI()
      const userInfo = res.data.metadata
      setFieldData(userInfo)
      setAvatarUrl(userInfo.user_avatar)
    }
    fetchUserInfo()
  }, [])

  const setFieldData = (userInfo) => {
    reset({
      user_avatar: userInfo.user_avatar,
      user_email: userInfo.user_email,
      user_name: userInfo.user_name,
      user_phone: userInfo.user_phone,
      user_gender: userInfo.user_gender || '',
      user_intro: userInfo.user_intro,
      user_date_of_birth: userInfo.user_date_of_birth
        ? formatDateForInput(userInfo.user_date_of_birth)
        : ''
    })
  }

  const handleUploadFileAvatar = async (event) => {
    interceptorLoadingElements(true, '.btn-user-upload-avatar')
    interceptorLoadingElements(true, '.btn-user-update-info')
    const file = event.target.files[0]
    if (!file) return
    const url = await uploadImageToCloudinary(file)
    if (url) setAvatarUrl(url)

    const currentValue = getValues()
    reset({ ...currentValue, user_avatar: url })
    interceptorLoadingElements(false, '.btn-user-upload-avatar')
    interceptorLoadingElements(false, '.btn-user-update-info')
  }

  const onSubmit = methods.handleSubmit(async (data) => {
    await dispatch(
      updateUserInfoAPI({ data, loadingClass: '.btn-user-update-info' })
    )
  })

  return {
    avatarUrl,
    handleUploadFileAvatar,
    onSubmit,
    ...methods
  }
}

export const useAccountMigration = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [availableShopSlug, setAvailableShopSlug] = useState(true)
  const [tempAddress, setTempAddress] = useState({
    selectedProvince: {},
    selectedDistrict: {},
    selectedWard: {}
  })

  const methods = useForm()

  const handleAddressChange = (address) => {
    setTempAddress(address)
  }

  const handleChangeShopName = async (e) => {
    const shopName = e.target.value.trim()

    if (!shopName) {
      methods.setValue('shop_slug', '')
      return
    }

    const shopSlug = generateURL(shopName)
    methods.setValue('shop_slug', shopSlug)
    await checkShopURL()
  }

  const checkShopURL = async () => {
    try {
      const currentSlug = methods.getValues('shop_slug')
      if (!currentSlug) return
      const res = await checkShopURLAPI({ shop_slug: currentSlug })
      if (res) {
        methods.clearErrors(['shop_slug'])
        setAvailableShopSlug(true)
      }
    } catch (error) {
      methods.setError('shop_slug', {
        type: 'manual',
        message: 'This URL is already taken.'
      })
      setAvailableShopSlug(false)
    }
  }

  const onSubmit = methods.handleSubmit(async (data) => {
    if (!availableShopSlug) {
      toast.error('This shop name is available.')
      return
    }

    data.province = tempAddress?.selectedProvince
    data.district = tempAddress?.selectedDistrict
    data.ward = tempAddress?.selectedWard

    const res = await dispatch(
      accountMigrationAPI({ data, loadingClass: '.btn-account-migration' })
    )
    if (res.payload.status === 200) {
      setTimeout(() => {
        navigate('/my-account/dashboard')
      }, 500)
    }
  })

  return {
    ...methods,
    handleAddressChange,
    handleChangeShopName,
    onSubmit,
    checkShopURL,
    tempAddress
  }
}

export const useAddressList = () => {
  const [userAddressList, setUserAddressList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAddressList = async () => {
      try {
        const res = await getAddressListAPI()
        const sortedData = sortAddressByDefault(res.data?.metadata || [])
        setUserAddressList(sortedData)
      } finally {
        setLoading(false)
      }
    }
    fetchAddressList()
  }, [])

  const addAddress = (data) => {
    if (data.default) {
      const updatedList = userAddressList.map((item) => ({
        ...item,
        default: false
      }))
      setUserAddressList(sortAddressByDefault([...updatedList, data]))
      return
    }
    setUserAddressList((prev) => [...prev, data])
  }

  const setDefaultAddress = async (_id) => {
    const res = await setDefaultAddressAPI(
      { _id },
      '.btn-user-set-default-address'
    )
    if (res.status === 200) {
      const updatedList = userAddressList.map((item) => ({
        ...item,
        default: item._id === _id
      }))
      setUserAddressList(sortAddressByDefault(updatedList))
    }
  }

  const updateAddress = (data) => {
    setUserAddressList((prev) =>
      prev.map((item) => (item._id === data._id ? { ...item, ...data } : item))
    )
  }

  const deleteAddress = (_id) => {
    setUserAddressList((prev) => prev.filter((item) => item._id !== _id))
  }

  return {
    userAddressList,
    loading,
    addAddress,
    setDefaultAddress,
    updateAddress,
    deleteAddress
  }
}

export const useAddressForm = ({ actionType, addressItem, onSuccess }) => {
  const {
    register,
    watch,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
    clearErrors
  } = useForm()

  const [open, setOpen] = useState(false)
  const [tempAddress, setTempAddress] = useState({
    selectedProvince: {},
    selectedDistrict: {},
    selectedWard: {}
  })

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    reset()
    setOpen(false)
  }

  const handleAddressChange = (address) => setTempAddress(address)

  useEffect(() => {
    if (addressItem) {
      setValue('full_name', addressItem.full_name)
      setValue('phone_number', addressItem.phone_number)
    }
  }, [addressItem, setValue])

  const handleAddressAction = async (data) => {
    data.province = tempAddress.selectedProvince
    data.district = tempAddress.selectedDistrict
    data.ward = tempAddress.selectedWard

    if (actionType === 'create') {
      const res = await addNewAddressAPI({ data })
      if (res.status === 201) {
        onSuccess(res.data?.metadata)
        handleClose()
      }
    } else if (actionType === 'update') {
      data._id = addressItem._id
      const res = await updateAddressAPI({ data })
      if (res.status === 200) {
        onSuccess(res.data?.metadata)
        handleClose()
      }
    }
  }

  const handleDelete = async () => {
    if (!addressItem?._id) return
    const res = await deleteAddressAPI({ data: { _id: addressItem._id } })
    if (res.status === 200) {
      onSuccess(addressItem._id, 'delete')
      handleClose()
    }
  }

  return {
    register,
    watch,
    errors,
    reset,
    handleSubmit,
    setValue,
    clearErrors,
    open,
    handleOpen,
    handleClose,
    tempAddress,
    handleAddressChange,
    handleAddressAction,
    handleDelete
  }
}
