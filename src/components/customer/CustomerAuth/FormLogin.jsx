import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Zoom from '@mui/material/Zoom'
import { blue } from '@mui/material/colors'
import { Link } from 'react-router-dom'
import { useLogin } from '~/hooks/user/auth.hook'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'

function FormLogin() {
  const {
    register,
    onSubmit,
    formState: { errors }
  } = useLogin()

  return (
    <form onSubmit={onSubmit}>
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
            padding: '10px 40px'
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
              helperText={errors.email?.message}
            />
          </Box>

          <Box sx={{ width: '100%' }}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              error={!!errors['password']}
              {...register('password', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                }
              })}
              helperText={errors.password?.message}
            />
          </Box>

          <Link
            to="/auth/forgot-password"
            style={{ color: 'black', fontSize: '14px' }}
          >
            Forgot password?
          </Link>
          <Button
            className="btn-auth-login"
            type="submit"
            fullWidth
            sx={{
              backgroundColor: blue[600],
              fontWeight: '600',
              color: 'white',
              fontSize: '20px'
            }}
          >
            Login
          </Button>
          <Box sx={{ display: 'flex', gap: '4px' }}>
            <Typography>Don't have an account?</Typography>
            <Link
              to="/auth/register"
              style={{ fontWeight: '600', color: 'black' }}
            >
              Register
            </Link>
          </Box>
        </Box>
      </Zoom>
    </form>
  )
}
export default FormLogin
