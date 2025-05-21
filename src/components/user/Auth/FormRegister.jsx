import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Zoom from '@mui/material/Zoom'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE
} from '~/utils/validators'
import { blue } from '@mui/material/colors'
import { Link } from 'react-router-dom'
import { useRegister } from '~/hooks/auth.hook'

function FormRegister() {
  const {
    register,
    formState: { errors },
    onSubmit
  } = useRegister()

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
              helperText={errors.email?.message}
            />
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
