import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
  accountMigrationAPI,
  setupAccountAPI,
  updateUserProfileAPI
} from '~/redux/user.slice'
import interceptorLoadingElements from '~/utils/interceptorLoading'
import sortAddressByDefault from '~/helpers/sortAddressByDefault'
import { StatusCodes } from 'http-status-codes'
import { navigate } from '~/helpers/navigation'

const steps = ['CHANGE YOUR PASSWORD', 'INFORMATION USER']

const LOADING_CLASS_USER_ADDRESS_FORM = [
  '.btn-action-user-address',
  '.btn-user-set-default-address'
]
// ============================ USER PROFILE ============================
export const useUserProfileForm = () => {
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
      if (err?.status === StatusCodes.FORBIDDEN) navigate('/unauthorized')
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

// ============================ USER CHANGE PASSWORD FORM ============================
export const useChangePasswordForm = () => {
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

export const useAccountMigration = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [tempAddress, setTempAddress] = useState({
    selectedProvince: {},
    selectedDistrict: {},
    selectedWard: {}
  })

  const methods = useForm()

  const handleAddressChange = (address) => {
    setTempAddress(address)
  }

  const onSubmit = methods.handleSubmit(async (data) => {
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
    onSubmit,
    tempAddress
  }
}

// ============================ USER ADDRESS ============================
export const useUserAddresses = () => {
  // ================= STATE =================

  const [loading, setLoading] = useState(true)
  const [isDenied, setDenied] = useState(false)

  const [openModal, setOpenModal] = useState(false)
  const [action, setAction] = useState(null)
  const [selectAddress, setSelectAddress] = useState(null)

  const [addresses, setAddresses] = useState([])

  // ================ EFFECTS ================
  useEffect(() => {
    if (isDenied) navigate('/unauthorized')
  }, [isDenied])

  useEffect(() => {
    fetchAddresses()
  }, [])

  // ================ HANDLERS ================
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
export const useAddressForm = ({ action, address, onSubmit }) => {
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
