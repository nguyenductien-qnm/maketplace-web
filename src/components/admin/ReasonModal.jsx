import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import TypographyLabel from '../common/TypographyLabel'
import ReactQuill from 'react-quill'
import { Controller, useForm } from 'react-hook-form'
import { REASON_RULE, REASON_RULE_MESSAGE } from '~/utils/validators'
import 'react-quill/dist/quill.snow.css'

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
    formState: { errors },
    control
  } = useForm()

  const submitHandler = (data) => {
    onSubmit(data.reason)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{header}</DialogTitle>
      <DialogContent sx={{ height: '310px' }}>
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
              <ReactQuill
                theme="snow"
                value={field.value}
                onChange={field.onChange}
                style={{ height: '200px' }}
              />
              {errors.reason && (
                <p style={{ color: 'red' }}>{errors.reason.message}</p>
              )}
            </>
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button
          className="btn-reason-modal"
          onClick={onClose}
          variant="outlined"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          className="btn-reason-modal"
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
