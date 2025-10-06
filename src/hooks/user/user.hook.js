import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  createAddressByUserAPI,
  changePasswordByUserAPI,
  deleteAddressByUserAPI,
  getAddressesByUserAPI,
  getUserProfileAPI,
  setDefaultAddressByUserAPI,
  updateAddressByUserAPI
} from '~/api/user.api'
import { uploadImageToCloudinary } from '~/helpers/apiSendImage'
import {
  setupAccountAPI,
  updateUserProfileAPI,
  verifyAccountAPI
} from '~/redux/user.slice'
import interceptorLoadingElements from '~/utils/interceptorLoading'
import sortAddressByDefault from '~/helpers/sortAddressByDefault'
import { StatusCodes } from 'http-status-codes'
import { navigate } from '~/helpers/navigation'
import { checkBasicShopInfoAPI, getShopStatusByOwnerAPI } from '~/api/shop.api'
import { toast } from 'react-toastify'

const STEPS_SETUP_ACCOUNT = ['CHANGE YOUR PASSWORD', 'INFORMATION USER']

const STEPS_ACCOUNT_MIGRATION = [
  'Basic Info',
  'Shop Type & Tax',
  'Payment & Refund ',
  'Review'
]

const LOADING_CLASS_USER_ADDRESS_FORM = [
  '.btn-action-user-address',
  '.btn-user-set-default-address'
]

const LOADING_CLASS_ACCOUNT_MIGRATION = ['.btn-action-account-migration']
// ============================ USER PROFILE ============================
const useUserProfileForm = () => {
  const dispatch = useDispatch()
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  const [avatarUrl, setAvatarUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const fetchUserInfo = async () => {
    try {
      setLoading(true)
      const { status, resData } = await getUserProfileAPI()
      if (status === StatusCodes.OK) {
        const { user_avatar } = resData?.metadata
        setFieldData(resData?.metadata)
        setAvatarUrl(user_avatar)
      }
    } catch (err) {
      if (err?.status === StatusCodes.FORBIDDEN) navigate('/access-denied')
    } finally {
      setLoading(false)
    }
  }

  const setFieldData = (data) => {
    setValue('user_avatar', data?.user_avatar || '')
    setValue('user_email', data?.user_email || '')
    setValue('user_name', data?.user_name || '')
    setValue('user_phone', data?.user_phone || '')
    setValue('user_gender', data?.user_gender || '')
    setValue('user_intro', data?.user_intro || '')
    setValue('user_code', data?.user_code || '')
    setValue('user_date_of_birth', data?.user_date_of_birth || '')
    setValue('createdAt', data?.createdAt || '')
  }

  const handleUploadFileAvatar = async (event) => {
    interceptorLoadingElements(true, '.btn-user-upload-avatar')
    interceptorLoadingElements(true, '.btn-user-update-info')
    const file = event.target.files[0]
    if (!file) return
    const url = await uploadImageToCloudinary(file)
    if (url) {
      setAvatarUrl(url)
      setValue('user_avatar', url)
    }

    interceptorLoadingElements(false, '.btn-user-upload-avatar')
    interceptorLoadingElements(false, '.btn-user-update-info')
  }

  const handleUpdateProfile = handleSubmit(async (data) => {
    const { user_email, user_code, createdAt, user_avatar, ...rest } = data
    await dispatch(
      updateUserProfileAPI({
        payload: { ...rest, user_avatar: avatarUrl },
        loadingClass: '.btn-user-update-info'
      })
    )
  })

  return {
    loading,
    register,
    control,
    errors,
    avatarUrl,
    handleUploadFileAvatar,
    handleUpdateProfile
  }
}

// ============================ USER VERIFY ACCOUNT ============================
const useUserVerifyAccount = () => {
  const dispatch = useDispatch()
  const { otp } = useParams()
  const [state, setState] = useState('pending')

  useEffect(() => {
    handleVerifyAccount()
  }, [])

  const handleVerifyAccount = async () => {
    const res = await dispatch(verifyAccountAPI({ otp }))

    if (res.payload?.status === StatusCodes.OK) {
      setState('success')
    } else {
      setState('failure')
    }
  }

  return { state }
}

// ============================ USER SETUP ACCOUNT ============================
const useSetupAccount = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm()

  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())

  const dispatch = useDispatch()

  const isStepSkipped = (step) => skipped.has(step)

  const handleNext = handleSubmit(() => {
    setActiveStep((prev) => prev + 1)
  })

  const handleBack = () => setActiveStep((prev) => prev - 1)

  const handleValidateData = handleSubmit()

  const handleFormSubmit = handleSubmit(async (data) => {
    const res = await dispatch(
      setupAccountAPI({
        data,
        loadingClass: '.btn-auth-setup-account'
      })
    )
    if (res.payload?.status === 200) {
      setTimeout(() => navigate('/home'), 1000)
    }
  })

  return {
    register,
    errors,
    watch,
    STEPS_SETUP_ACCOUNT,
    activeStep,
    isStepSkipped,
    handleNext,
    handleBack,
    handleFormSubmit,
    handleValidateData
  }
}

// ============================ USER CHANGE PASSWORD FORM ============================
const useChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm()

  const handleChangePassword = handleSubmit(async (data) => {
    const { status } = await changePasswordByUserAPI({
      payload: data,
      loadingClass: '.btn-user-change-password'
    })
    if (status === StatusCodes.OK) reset(undefined)
  })

  return {
    register,
    watch,
    errors,
    handleChangePassword
  }
}

// ============================ USER ACCOUNT MIGRATION ============================

// ============================ USER OWNER SHOP STATUS ============================
const useOwnerShopStatus = () => {
  const [shopStatus, setShopStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.user.currentUser)

  useEffect(() => {
    handleCheckIsPendingShop()
  }, [])

  const handleCheckIsPendingShop = async () => {
    try {
      const { status, resData } = await getShopStatusByOwnerAPI()
      if (status === StatusCodes?.OK) {
        const { status } = resData?.metadata
        setShopStatus(status)
      }
    } catch (err) {
      navigate('/home')
    } finally {
      setLoading(false)
    }
  }

  return { user, loading, shopStatus }
}

// ============================ USER ADDRESS ============================
const useUserAddresses = () => {
  const [loading, setLoading] = useState(true)
  const [isDenied, setDenied] = useState(false)

  const [openModal, setOpenModal] = useState(false)
  const [action, setAction] = useState(null)
  const [selectAddress, setSelectAddress] = useState(null)

  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    if (isDenied) navigate('/access-denied')
  }, [isDenied])

  useEffect(() => {
    fetchAddresses()
  }, [])

  const handleOpenModal = ({ action, address }) => {
    setAction(action)
    if (action === 'update') {
      setSelectAddress(address)
    }
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setAction(null)
    setSelectAddress(null)
  }

  const fetchAddresses = async () => {
    setLoading(true)
    try {
      const { status, resData } = await getAddressesByUserAPI()
      if (status === StatusCodes.OK) {
        const { metadata } = resData
        setAddresses(sortAddressByDefault(metadata || []))
      }
    } catch (err) {
      if (err?.status === StatusCodes.FORBIDDEN) setDenied(true)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAddress = async ({ data }) => {
    const { status, resData } = await createAddressByUserAPI({
      payload: data,
      loadingClass: LOADING_CLASS_USER_ADDRESS_FORM
    })
    if (status === StatusCodes.CREATED) {
      const { metadata } = resData
      if (metadata?.default) {
        const updatedList = addresses.map((item) => ({
          ...item,
          default: false
        }))
        setAddresses(sortAddressByDefault([...updatedList, metadata]))
        handleCloseModal()
        return
      }
      setAddresses((prev) => [...prev, metadata])
      handleCloseModal()
    }
  }

  const handleUpdateAddress = async ({ data }) => {
    const { status, resData } = await updateAddressByUserAPI({
      payload: data,
      loadingClass: LOADING_CLASS_USER_ADDRESS_FORM
    })
    if (status === StatusCodes.OK) {
      const { metadata } = resData
      setAddresses((prev) =>
        prev.map((item) => (item._id === data._id ? metadata : item))
      )
      handleCloseModal()
    }
  }

  const handleSetDefaultAddress = async ({ _id }) => {
    const { status } = await setDefaultAddressByUserAPI({
      payload: { _id },
      loadingClass: LOADING_CLASS_USER_ADDRESS_FORM
    })
    if (status === StatusCodes.OK) {
      const updatedList = addresses.map((item) => ({
        ...item,
        default: item._id === _id
      }))
      setAddresses(sortAddressByDefault(updatedList))
    }
  }

  const handleDeleteAddress = async ({ _id }) => {
    const { status } = await deleteAddressByUserAPI({
      payload: { _id },
      loadingClass: LOADING_CLASS_USER_ADDRESS_FORM
    })
    if (status === StatusCodes.OK) {
      handleCloseModal()
      setAddresses((prev) => prev.filter((item) => item._id !== _id))
    }
  }

  const handleSubmit = async ({ data }) => {
    action === 'create'
      ? await handleCreateAddress({ data })
      : await handleUpdateAddress({ data })
  }

  return {
    addresses,
    openModal,
    action,
    loading,
    selectAddress,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    handleSetDefaultAddress,
    handleDeleteAddress
  }
}

// ============================ USER ADDRESS FORM ============================
const useAddressForm = ({ action, address, onSubmit }) => {
  const {
    register,
    watch,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
    clearErrors,
    control
  } = useForm()

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (action === 'update' && address) {
      setValue('_id', address?._id || '')
      setValue('full_name', address?.full_name || '')
      setValue('phone_number', address?.phone_number || '')
      setValue('province', address?.province || {})
      setValue('district', address?.district || {})
      setValue('ward', address?.ward || {})
      setValue('street', address?.street || '')
    } else {
      reset(undefined)
    }
  }, [action, address])

  const handleFormSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true)
    try {
      await onSubmit({ data })
    } finally {
      setIsSubmitting(false)
    }
  })

  return {
    isSubmitting,
    register,
    watch,
    errors,
    reset,
    handleSubmit,
    setValue,
    clearErrors,
    handleFormSubmit,
    control
  }
}

export {
  useUserProfileForm,
  useSetupAccount,
  useChangePasswordForm,
  useUserAddresses,
  useAddressForm,
  useUserVerifyAccount,
  useOwnerShopStatus
}
