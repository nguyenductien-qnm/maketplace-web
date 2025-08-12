import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import TypographyLabel from '~/components/common/TypographyLabel'
import { useForm } from 'react-hook-form'
import {
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'

function UserUpdatePasswordModal({
  open,
  onClose,
  user,
  handleUpdatePassword
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const onsubmit = (data) => {
    const payload = { _id: user?._id, ...data }
    handleUpdatePassword(payload)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update Password</DialogTitle>
      <DialogContent>
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
            error={!!errors.new_password}
            size="small"
            fullWidth
            helperText={errors?.new_password?.message}
          />
        </Box>
        <Box sx={{ mt: 1 }}>
          <TypographyLabel>Confirm password</TypographyLabel>
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
            error={!!errors.confirm_password}
            size="small"
            fullWidth
            helperText={errors?.confirm_password?.message}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          className="btn-admin-user-action"
          onClick={onClose}
          variant="outlined"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          className="btn-admin-user-action"
          color="success"
          variant="contained"
          onClick={handleSubmit(onsubmit)}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserUpdatePasswordModal
