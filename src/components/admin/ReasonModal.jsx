import { Controller, useForm } from 'react-hook-form'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import TypographyLabel from '../common/TypographyLabel'
import MDEditor from '@uiw/react-md-editor'
import { REASON_RULE, REASON_RULE_MESSAGE } from '~/utils/validators'
import { Typography } from '@mui/material'

function ReasonModal({
  header,
  open,
  onClose,
  onSubmit,
  submitText = 'Confirm',
  submitColor
}) {
  const {
    handleSubmit,
    watch,
    formState: { errors },
    control
  } = useForm()

  const value = watch('reason')

  const submitHandler = (data) => {
    console.log('ok')
    onSubmit(data.reason)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{header}</DialogTitle>
      <DialogContent>
        <TypographyLabel>Reason for this action</TypographyLabel>

        <Controller
          name="reason"
          control={control}
          rules={{
            required: 'Reason is required.',
            minLength: {
              value: 5,
              message: 'Reason must be at least 5 characters.'
            },
            maxLength: {
              value: 255,
              message: 'Reason must not exceed 255 characters.'
            },
            pattern: {
              value: REASON_RULE,
              message: REASON_RULE_MESSAGE
            }
          }}
          render={({ field }) => (
            <>
              <MDEditor
                value={field.value}
                onChange={field.onChange}
                data-color-mode="light"
              />
              <MDEditor.Markdown
                source={field.value}
                style={{ whiteSpace: 'pre-wrap', marginTop: '8px' }}
              />
            </>
          )}
        />
        {errors.reason && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {errors.reason.message}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(submitHandler)}
          variant="contained"
          color={submitColor}
        >
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ReasonModal
