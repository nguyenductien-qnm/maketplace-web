import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import TypographyLabel from '~/components/common/TypographyLabel'
import { useAdminCommissionRateForm } from '~/hooks/admin/commissionRateForm.hook'
import {
  FIELD_REQUIRED_MESSAGE,
  POSITIVE_NUMBER_RULE,
  POSITIVE_NUMBER_RULE_MESSAGE
} from '~/utils/validators'

function CommissionRateForm({
  action,
  open,
  onClose,
  categoriesRoot,
  onSubmit,
  commissionRate
}) {
  const {
    register,
    handleSubmit,
    errors,
    handleFormSubmit,
    isSubmitting,
    control
  } = useAdminCommissionRateForm({ action, commissionRate, onSubmit })

  useEffect(() => {
    console.log(isSubmitting)
  }, [isSubmitting])

  return (
    <Dialog
      open={open}
      onClose={() => {
        if (isSubmitting) return
        onClose()
      }}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        {action == 'create' ? 'Create' : 'Update'} Commission Rate
      </DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Box>
            <TypographyLabel variant="body2">Category</TypographyLabel>
            <Controller
              name="category_code"
              control={control}
              rules={{ required: FIELD_REQUIRED_MESSAGE }}
              render={({ field }) => (
                <Select
                  size="small"
                  fullWidth
                  {...field}
                  error={!!errors['category_code']}
                  value={field.value || ''}
                >
                  {categoriesRoot?.map((c) => (
                    <MenuItem value={c?.category_code}>
                      {c?.category_name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors?.category_code?.message && (
              <Typography variant="caption" color="error">
                {errors?.category_code?.message}
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: 2 }}>
            <TypographyLabel variant="body2">
              Commission Rate (Auto Refund)
            </TypographyLabel>
            <TextField
              size="small"
              type="number"
              inputProps={{ step: 'any' }}
              fullWidth
              {...register('refund_rate_auto', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: POSITIVE_NUMBER_RULE,
                  message: POSITIVE_NUMBER_RULE_MESSAGE
                }
              })}
              error={!!errors['refund_rate_auto']}
              helperText={errors?.refund_rate_auto?.message}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <TypographyLabel variant="body2">
              Commission Rate (Manual Refund)
            </TypographyLabel>
            <TextField
              size="small"
              type="number"
              inputProps={{ step: 'any' }}
              fullWidth
              {...register('refund_rate_manual', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: POSITIVE_NUMBER_RULE,
                  message: POSITIVE_NUMBER_RULE_MESSAGE
                }
              })}
              error={!!errors['refund_rate_manual']}
              helperText={errors?.refund_rate_manual?.message}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            className="btn-cancel-submit-commission-form"
            onClick={onClose}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            className="btn-submit-commission-form"
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
export default CommissionRateForm
