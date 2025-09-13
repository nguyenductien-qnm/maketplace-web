import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TypographyLabel from '~/components/common/TypographyLabel'
import { grey } from '@mui/material/colors'
import { useChangePasswordForm } from '~/hooks/user/user.hook'
import {
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'

function FormChangePassword() {
  const { register, errors, watch, handleChangePassword } =
    useChangePasswordForm()

  return (
    <form onSubmit={handleChangePassword}>
      <Box>
        <Typography
          sx={{ fontSize: '25px', marginBottom: '20px', fontWeight: '600' }}
        >
          Password change
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Box>
            <TypographyLabel>Current password</TypographyLabel>
            <Box>
              <TextField
                type="password"
                {...register('password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
                error={!!errors['password']}
                size="small"
                fullWidth
                helperText={errors?.password?.message}
              />
            </Box>
          </Box>
          <Box>
            <TypographyLabel>New password</TypographyLabel>
            <TextField
              type="password"
              {...register('new_password', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                }
              })}
              error={!!errors['new_password']}
              size="small"
              fullWidth
              helperText={errors?.new_password?.message}
            />
          </Box>
          <Box>
            <TypographyLabel>Confirm new password</TypographyLabel>
            <TextField
              type="password"
              {...register('confirm_password', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                },
                validate: (value) =>
                  value === watch('new_password') || 'Passwords do not match'
              })}
              error={!!errors['confirm_password']}
              size="small"
              fullWidth
              helperText={errors?.confirm_password?.message}
            />
          </Box>
          <Button
            className="btn-user-change-password"
            type="submit"
            sx={{
              textTransform: 'none',
              backgroundColor: grey[200],
              color: 'black',
              fontWeight: '600',
              padding: '10px 20px',
              alignSelf: 'flex-start'
            }}
          >
            Save changes
          </Button>
        </Box>
      </Box>
    </form>
  )
}
export default FormChangePassword
