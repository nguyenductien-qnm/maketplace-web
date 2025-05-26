import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import TypographyLabel from '~/components/common/TypographyLabel'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'

function WithdrawModal({
  open,
  onClose,
  handleRequestWithdraw,
  balance,
  accounts
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm()

  const defaultAccount =
    accounts?.find((acc) => acc.is_default) || accounts?.[0]

  const onSubmit = (data) => {
    handleRequestWithdraw(data)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Request Withdraw</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Available Balance: ${balance}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth margin="dense" size="small">
            <InputLabel>Select Account</InputLabel>
            <Select
              label="Select Account"
              {...register('account', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.account}
              defaultValue={defaultAccount?._id || ''}
            >
              {accounts?.map((acc) => (
                <MenuItem key={acc._id} value={acc._id}>
                  {acc.account}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.account?.message}</FormHelperText>
          </FormControl>

          <Box>
            <TypographyLabel>Amount</TypographyLabel>
            <Controller
              name="amount"
              control={control}
              rules={{ required: FIELD_REQUIRED_MESSAGE }}
              render={({ field: { ref, ...field } }) => (
                <NumericFormat
                  sx={{ width: '100%' }}
                  {...field}
                  error={!!errors.amount}
                  helperText={errors?.amount?.message}
                  size="small"
                  allowNegative={false}
                  prefix="$"
                  decimalScale={2}
                  fixedDecimalScale
                  thousandSeparator
                  customInput={TextField}
                  onValueChange={(values) => {
                    field.onChange(values.value || '')
                  }}
                />
              )}
            />
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          className="btn-shop-cancel-request-withdraw"
          onClick={onClose}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          className="btn-shop-request-withdraw"
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
        >
          Withdraw
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default WithdrawModal
