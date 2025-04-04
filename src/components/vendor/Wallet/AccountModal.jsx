import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE } from '~/utils/validators'

function AccountModal({ open, onClose, handleAddAccount }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    handleAddAccount(data)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add PayPal Account</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            size="small"
            fullWidth
            margin="dense"
            label="PayPal Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: EMAIL_RULE,
                message: EMAIL_RULE_MESSAGE
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <FormControlLabel
            control={<Checkbox {...register('isDefault')} size="small" />}
            label={
              <span style={{ fontSize: '0.85rem' }}>
                Set as default account
              </span>
            }
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          className="btn-shop-cancel-add-payment-method"
          onClick={onClose}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          className="btn-shop-add-payment-method"
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AccountModal
