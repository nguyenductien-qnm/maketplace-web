import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import TypographyLabel from '~/components/common/TypographyLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import TypographyTitle from '~/components/common/TypographyTitle'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { modalConfig, modalStyle } from '~/config/modal'
import { Controller, useForm } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'

const REPORT_REASONS = [
  { value: 'scam', label: 'Product shows signs of a scam' },
  { value: 'counterfeit', label: 'Counterfeit / fake product' },
  { value: 'unknown_origin', label: 'Product with unknown origin' },
  { value: 'unclear_image', label: 'Product image is unclear' },
  {
    value: 'offensive_content',
    label: 'Product contains offensive or potentially offensive content'
  },
  { value: 'name_mismatch', label: 'Product name does not match the image' },
  { value: 'fake_orders', label: 'Product shows signs of fake orders' },
  {
    value: 'external_transaction',
    label: 'Product contains images or info from external transactions'
  },
  {
    value: 'prohibited',
    label: 'Product is prohibited (wild animals, 18+, etc.)'
  },
  { value: 'other', label: 'Other' }
]

function ReportProductModal({ open, onClose, handleSubmitReportProduct }) {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit
  } = useForm()

  const handleSubmitForm = handleSubmit((data) => {
    handleSubmitReportProduct(data)
  })

  return (
    <Modal open={open} onClose={onClose} {...modalConfig}>
      <Fade in={open}>
        <Box sx={modalStyle(600)}>
          <form onSubmit={handleSubmitForm}>
            <Box
              sx={{
                p: '0px 0px 8px 0px',
                paddingTop: 0,
                flexShrink: 0
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <TypographyTitle>Report Product</TypographyTitle>
                <HighlightOffIcon
                  color="error"
                  onClick={onClose}
                  sx={{ cursor: 'pointer' }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                mt: 2
              }}
            >
              <Box>
                <TypographyLabel>Report Reason</TypographyLabel>
                <Controller
                  name="report_reason"
                  control={control}
                  rules={{ required: FIELD_REQUIRED_MESSAGE }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      fullWidth
                      error={!!errors['report_reason']}
                    >
                      {REPORT_REASONS.map((reason) => (
                        <MenuItem key={reason.value} value={reason.value}>
                          {reason.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors?.report_reason?.message && (
                  <Typography variant="caption" color="error">
                    {errors?.report_reason?.message}
                  </Typography>
                )}
              </Box>

              <Box sx={{ mt: 2 }}>
                <TypographyLabel>Report Description</TypographyLabel>
                <TextField
                  {...register('report_description', {
                    required: FIELD_REQUIRED_MESSAGE,
                    minLength: {
                      value: 10,
                      message: 'Description must be at least 10 characters'
                    },
                    maxLength: {
                      value: 50,
                      message: 'Description must be at most 50 characters'
                    }
                  })}
                  multiline
                  rows={5}
                  fullWidth
                  placeholder="Report Description (10-50 character allowed)"
                  error={!!errors['report_description']}
                  helperText={errors.report_description?.message}
                />
              </Box>
            </Box>

            <Box
              sx={{
                p: '24px 0px 0px 0px',
                display: 'flex',
                justifyContent: 'flex-end',
                flexShrink: 0,
                gap: 1
              }}
            >
              <Button color="secondary" variant="outlined" onClick={onClose}>
                Close
              </Button>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  )
}
export default ReportProductModal
