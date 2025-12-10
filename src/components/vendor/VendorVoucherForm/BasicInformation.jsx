import Card from '@mui/material/Card'
import Grid2 from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import TypographyLabel from '~/components/common/TypographyLabel'
import TypographyTitle from '~/components/common/TypographyTitle'
import InputAdornment from '@mui/material/InputAdornment'
import DividerVertical from '~/components/common/DividerVertical'
import Typography from '@mui/material/Typography'
import { FIELD_REQUIRED_MESSAGE, VOUCHER_CODE_RULE } from '~/utils/validators'

const LABELS = {
  TITLE: 'Basic Information',
  VOUCHER_NAME: 'Voucher Name',
  VOUCHER_CODE: 'Voucher Code',
  VOUCHER_START_DATE: 'Voucher Start Date & Time',
  VOUCHER_END_DATE: 'Voucher End Date & Time'
}

const HELP_TEXT = {
  VOUCHER_NAME: 'Voucher name is not visible to buyers.',
  VOUCHER_CODE: 'Please enter A-Z, 0-9; 10 characters maximum.'
}

function BasicInformation({ form, ui }) {
  const { register, watch, errors, trigger } = form
  const { isUpdate, voucherStatus } = ui

  return (
    <Card sx={{ p: 5 }}>
      <TypographyTitle sx={{ mb: 3 }}>{LABELS.TITLE}</TypographyTitle>
      <Grid2 container rowSpacing={3} columnSpacing={2} sx={{ mt: 2 }}>
        <Grid2 size={12}>
          <TypographyLabel>{LABELS.VOUCHER_NAME}</TypographyLabel>
          <TextField
            disabled={isUpdate && voucherStatus == 'EXPIRED'}
            {...register('voucher_name', { required: FIELD_REQUIRED_MESSAGE })}
            fullWidth
            helperText={errors?.voucher_name?.message || HELP_TEXT.VOUCHER_NAME}
            error={!!errors['voucher_name']}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <DividerVertical />
                    <Typography sx={{ ml: '10px' }}>
                      {watch('voucher_name')?.length || 0}/100
                    </Typography>
                  </InputAdornment>
                )
              }
            }}
          />
        </Grid2>
        <Grid2 size={12}>
          <TypographyLabel>{LABELS.VOUCHER_CODE}</TypographyLabel>
          <TextField
            disabled={isUpdate && voucherStatus == 'EXPIRED'}
            {...register('voucher_code', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: { value: VOUCHER_CODE_RULE },
              onChange: (e) => {
                e.target.value = e.target.value.toUpperCase()
              },
              setValueAs: (value) => value.toUpperCase()
            })}
            fullWidth
            helperText={errors?.voucher_code?.message || HELP_TEXT.VOUCHER_CODE}
            error={!!errors['voucher_code']}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <DividerVertical />
                    <Typography sx={{ ml: '10px' }}>
                      {watch('voucher_code')?.length || 0}/10
                    </Typography>
                  </InputAdornment>
                )
              }
            }}
          />
        </Grid2>
        <Grid2 size={6}>
          <TypographyLabel>{LABELS.VOUCHER_START_DATE}</TypographyLabel>

          <TextField
            disabled={
              (isUpdate && voucherStatus == 'EXPIRED') ||
              (isUpdate && voucherStatus == 'ONGOING')
            }
            type="datetime-local"
            fullWidth
            {...register('voucher_start_date', {
              required: FIELD_REQUIRED_MESSAGE,
              onChange: () => {
                if (watch('voucher_end_date')) trigger('voucher_end_date')
              },
              validate: {
                futureDate: (value) => {
                  if (voucherStatus === 'ONGOING') return true

                  if (!value) return true
                  const selectedDate = new Date(value)
                  const now = new Date()
                  if (selectedDate <= now)
                    return 'Start date must be in the future.'
                  return true
                }
              }
            })}
            inputProps={{
              ...(voucherStatus !== 'ONGOING' && {
                min: new Date().toISOString().slice(0, 16)
              })
            }}
            error={!!errors['voucher_start_date']}
            helperText={errors?.voucher_start_date?.message}
          />
        </Grid2>
        <Grid2 size={6}>
          <TypographyLabel>{LABELS.VOUCHER_END_DATE}</TypographyLabel>
          <TextField
            disabled={isUpdate && voucherStatus == 'EXPIRED'}
            type="datetime-local"
            fullWidth
            {...register('voucher_end_date', {
              required: FIELD_REQUIRED_MESSAGE,
              validate: {
                greaterThanStart: (value) => {
                  if (!value) return true

                  const startDate = watch('voucher_start_date')
                  if (!startDate) return 'Please select start date first'

                  const start = new Date(startDate)
                  const end = new Date(value)

                  const diffInMs = end - start
                  const diffInHours = diffInMs / (1000 * 60 * 60)

                  if (diffInHours < 1)
                    return 'End date must be at least 1 hour after start date'

                  return true
                }
              }
            })}
            inputProps={{
              min: new Date(new Date().getTime()).toISOString().slice(0, 16)
            }}
            error={!!errors['voucher_end_date']}
            helperText={errors?.voucher_end_date?.message}
          />
        </Grid2>
      </Grid2>
    </Card>
  )
}
export default BasicInformation
