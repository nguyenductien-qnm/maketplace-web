import { Box, Button, TextField, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import Zoom from '@mui/material/Zoom'
import { useForm } from 'react-hook-form'
import FieldErrorAlert from '~/components/FieldErrorAlert'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE
} from '~/utils/validators'

import { forgotPasswordAPI } from '~/api/auth.api'

function FormForgotPassword() {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const onSubmitLogin = (data) => {
    forgotPasswordAPI(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitLogin)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
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
              label="Email"
              type="text"
              variant="outlined"
              error={!!errors['email']}
              {...register('email', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE }
              })}
            />
            <FieldErrorAlert errors={errors} fieldName={'email'} />
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
            Forgot Password
          </Button>
        </Box>
      </Zoom>
    </form>
  )
}
export default FormForgotPassword
