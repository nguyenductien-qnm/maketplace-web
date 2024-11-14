import { Box, Button, TextField, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import Zoom from '@mui/material/Zoom'
import { useForm } from 'react-hook-form'
import FieldErrorAlert from '~/components/FieldErrorAlert'
import {
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'
import CircularProgress from '@mui/material/CircularProgress'

import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { checkTokenResetPasswordAPI, resetPasswordAPI } from '~/api/auth.api'
import { useNavigate } from 'react-router-dom'

function FormResetPassword({ token }) {
  const navigate = useNavigate()
  const [stateVerify, setStateVerify] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm()

  useEffect(() => {
    const handleCheckToken = async () => {
      const result = await checkTokenResetPasswordAPI({ token })
      if (result.status !== 200) {
        setTimeout(() => {
          navigate('/auth/login')
        }, 1000)
      } else {
        setStateVerify(true)
      }
    }
    handleCheckToken()
  }, [token])

  const handleSubmitResetPassword = async (data) => {
    data.token = token
    const res = await resetPasswordAPI(data)
    if (res.status === 404 || res.status === 200) {
      setTimeout(() => {
        navigate('/auth/login')
      }, 1000)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitResetPassword)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        {stateVerify === false ? (
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '20px'
              }}
            >
              <CircularProgress sx={{ color: 'white' }} />
            </Box>
            <Typography sx={{ color: 'white', fontSize: '18px' }}>
              Check token forgot password...
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              height: '400px',
              width: '500px',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              padding: '0 40px'
            }}
          >
            <Typography sx={{ fontSize: '35px', fontWeight: '600' }}>
              Welcome to Bevesi
            </Typography>

            <Box sx={{ width: '100%' }}>
              <TextField
                autoFocus
                fullWidth
                label="New password"
                type="text"
                variant="outlined"
                error={!!errors['new_password']}
                {...register('new_password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'email'} />
            </Box>

            <Box sx={{ width: '100%' }}>
              <TextField
                label="Confirm password"
                type="password"
                fullWidth
                {...register('confirm_password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: watch('new_password'),
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'password'} />
            </Box>

            <Button
              type="submit"
              fullWidth
              sx={{
                backgroundColor: blue[600],
                fontWeight: '600',
                color: 'white',
                fontSize: '20px'
              }}
            >
              Reset Password
            </Button>
          </Box>
        )}
      </Zoom>
    </form>
  )
}
export default FormResetPassword
