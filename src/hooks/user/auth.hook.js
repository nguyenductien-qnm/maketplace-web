import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { loginAPI } from '~/redux/user.slice'
import {
  checkTokenResetPasswordAPI,
  forgotPasswordAPI,
  registerAPI,
  resetPasswordAPI
} from '~/api/auth.api'
import { useEffect, useState } from 'react'
import { navigate } from '~/helpers/navigation'

export const useLogin = () => {
  const dispatch = useDispatch()
  const methods = useForm()

  const onSubmit = methods.handleSubmit(async (data) => {
    const res = await dispatch(
      loginAPI({ data, loadingClass: '.btn-auth-login' })
    )
    if (res.payload?.status === 200) {
      navigate('/home')
    }
  })

  return {
    ...methods,
    onSubmit
  }
}

export const useRegister = () => {
  const methods = useForm()

  const onSubmit = methods.handleSubmit(async (data) => {
    const res = await registerAPI(data, '.btn-auth-register')
    if (res.status === 200) {
      navigate('/auth/login')
    }
  })

  return {
    ...methods,
    onSubmit
  }
}

export const useForgotPassword = () => {
  const methods = useForm()

  const onSubmit = methods.handleSubmit(async (data) => {
    const res = await forgotPasswordAPI(data, '.btn-auth-forgot-password')
    if (res.status === 200) {
      navigate('/auth/login')
    }
  })

  return {
    ...methods,
    onSubmit
  }
}

export const useResetPassword = (token) => {
  const [stateVerify, setStateVerify] = useState(false)

  const methods = useForm()
  const { watch, handleSubmit } = methods

  useEffect(() => {
    const handleCheckToken = async () => {
      try {
        const res = await checkTokenResetPasswordAPI({ token })
        if (res.status === 200) {
          setStateVerify(true)
        }
      } catch (error) {
        setTimeout(() => {
          navigate('/auth/login')
        }, 1000)
      }
    }
    handleCheckToken()
  }, [token])

  const onSubmit = handleSubmit(async (data) => {
    const res = await resetPasswordAPI(
      { ...data, token },
      '.btn-auth-reset-password'
    )
    if (res.status === 200 || res.status === 404) {
      setTimeout(() => {
        navigate('/auth/login')
      }, 1000)
    }
  })

  return {
    ...methods,
    onSubmit,
    stateVerify,
    watch
  }
}
