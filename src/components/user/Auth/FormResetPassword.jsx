import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Zoom from '@mui/material/Zoom'
import CircularProgress from '@mui/material/CircularProgress'
import {
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'
import { blue } from '@mui/material/colors'
import { useResetPassword } from '~/hooks/auth.hook'

function FormResetPassword({ token }) {
  const {
    register,
    formState: { errors },
    onSubmit,
    watch,
    stateVerify
  } = useResetPassword(token)

  return (
    <form onSubmit={onSubmit}>
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
            <Typography sx={{ fontSize: '35px', fontWeight: '600' }}>
              Welcome to Bevesi
            </Typography>

            <Box sx={{ width: '100%' }}>
              <TextField
                autoFocus
                fullWidth
                label="New password"
                type="password"
                variant="outlined"
                error={!!errors['new_password']}
                {...register(
                  'new_password'
                  //   , {
                  //   required: FIELD_REQUIRED_MESSAGE,
                  //   pattern: {
                  //     value: PASSWORD_RULE,
                  //     message: PASSWORD_RULE_MESSAGE
                  //   }
                  // }
                )}
                // helperText={errors?.new_password.message}
              />
            </Box>

            <Box sx={{ width: '100%' }}>
              <TextField
                label="Confirm password"
                type="password"
                fullWidth
                {...register(
                  'confirm_password'
                  //   , {
                  //   required: FIELD_REQUIRED_MESSAGE,
                  //   pattern: {
                  //     value: watch('new_password'),
                  //     message: PASSWORD_RULE_MESSAGE
                  //   }
                  // }
                )}
                // helperText={errors?.confirm_password.message}
              />
            </Box>

            <Button
              className="btn-auth-reset-password"
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
