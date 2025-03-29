import { Box, Button, TextField, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import Zoom from '@mui/material/Zoom'
import FieldErrorAlert from '~/components/common/FieldErrorAlert'
import { registerAccountAPI } from '~/api/auth.api'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE
} from '~/utils/validators'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

function FormRegister() {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const handleSubmitRegister = (data) => {
    registerAccountAPI(data, '.btn-auth-register')
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitRegister)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <Box
          sx={{
            minHeight: '400px',
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
          <Typography
            sx={{
              fontSize: '35px',
              fontWeight: '600',
              marginBottom: '10px'
            }}
          >
            Welcome to Bevesi
          </Typography>

          <Box sx={{ width: '100%' }}>
            <TextField
              fullWidth
              error={!!errors['email']}
              label="Email"
              {...register('email', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: EMAIL_RULE,
                  message: EMAIL_RULE_MESSAGE
                }
              })}
            />
            <FieldErrorAlert errors={errors} fieldName={'email'} />
          </Box>

          <Button
            type="submit"
            fullWidth
            className="btn-auth-register"
            sx={{
              backgroundColor: blue[600],
              fontWeight: '600',
              color: 'white',
              fontSize: '20px'
            }}
          >
            Register
          </Button>
          <Box sx={{ display: 'flex', gap: '4px' }}>
            <Typography>Already have an account?</Typography>
            <Link
              to="/auth/login"
              style={{ fontWeight: '600', color: 'black' }}
            >
              Login
            </Link>
          </Box>
        </Box>
      </Zoom>
    </form>
  )
}
export default FormRegister
