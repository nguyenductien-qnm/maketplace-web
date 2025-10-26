import { Card, Grid2, TextField } from '@mui/material'
import TypographyLabel from '~/components/common/TypographyLabel'
import TypographyTitle from '~/components/common/TypographyTitle'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'

const LABELS = {
  TITLE: 'Basic Information',
  VOUCHER_NAME: 'Voucher Name',
  VOUCHER_CODE: 'Voucher Code',
  VOUCHER_START_DATE: 'Voucher Start Date & Time',
  VOUCHER_END_DATE: 'Voucher End Date & Time'
}

const HELP_TEXT = {
  VOUCHER_NAME: 'Voucher name is not visible to buyers.',
  VOUCHER_CODE: 'Please enter A-Z, 0-9; 5 characters maximum.'
}

function BasicInformation({ form }) {
  const { register, watch, control, errors } = form
  return (
    <Card sx={{ p: 5 }}>
      <TypographyTitle sx={{ mb: 3 }}>{LABELS.TITLE}</TypographyTitle>
      <Grid2 container rowSpacing={3} columnSpacing={2} sx={{ mt: 2 }}>
        <Grid2 size={12}>
          <TypographyLabel>{LABELS.VOUCHER_NAME}</TypographyLabel>
          <TextField
            {...register('voucher_name')}
            fullWidth
            helperText={HELP_TEXT.VOUCHER_NAME}
          />
        </Grid2>
        <Grid2 size={12}>
          <TypographyLabel>{LABELS.VOUCHER_CODE}</TypographyLabel>
          <TextField
            {...register('voucher_code')}
            fullWidth
            helperText={HELP_TEXT.VOUCHER_CODE}
          />
        </Grid2>
        <Grid2 size={6}>
          <TypographyLabel>{LABELS.VOUCHER_START_DATE}</TypographyLabel>
          <TextField
            type="datetime-local"
            fullWidth
            {...register('voucher_start_date', {
              required: FIELD_REQUIRED_MESSAGE
            })}
            error={!!errors['voucher_start_date']}
            helperText={errors?.voucher_start_date?.message}
          />
        </Grid2>
        <Grid2 size={6}>
          <TypographyLabel>{LABELS.VOUCHER_END_DATE}</TypographyLabel>
          <TextField
            type="datetime-local"
            fullWidth
            {...register('voucher_end_date', {
              required: FIELD_REQUIRED_MESSAGE
            })}
            error={!!errors['voucher_end_date']}
            helperText={errors?.voucher_end_date?.message}
          />
        </Grid2>
      </Grid2>
    </Card>
  )
}
export default BasicInformation
