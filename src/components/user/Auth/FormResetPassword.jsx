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
import { checkTokenResetPassword, resetPassword } from '~/api/auth'
import { useNavigate } from 'react-router-dom'

function FormResetPassword({ token }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [stateVerify, setStateVeify] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm()

  const onSubmitLogin = async (data) => {
    data.token = token
    const result = await resetPassword(data)
    if (result) {
      setTimeout(() => {
        navigate('/auth/login')
      }, 1000)
    }
  }

  useEffect(() => {
    const handleCheckToken = async () => {
      const result = await checkTokenResetPassword({ token })
      if (result.status !== 200) {
        setTimeout(() => {
          navigate('/auth/login')
        }, 1000)
      } else {
        setStateVeify(true)
      }
    }
    handleCheckToken()
  }, [token])

  return (
    <form onSubmit={handleSubmit(onSubmitLogin)}>
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
                error={!!errors['newPassword']}
                {...register('newPassword', {
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
                {...register('repeatPassword', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: watch('newPassword'),
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
