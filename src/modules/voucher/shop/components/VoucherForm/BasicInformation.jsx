import Card from '@mui/material/Card'
import Grid2 from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import TypographyLabel from '~/components/common/TypographyLabel'
import TypographyTitle from '~/components/common/TypographyTitle'
import InputAdornment from '@mui/material/InputAdornment'
import DividerVertical from '~/components/common/DividerVertical'
import Typography from '@mui/material/Typography'
import {
  voucherStartDateValidator,
  voucherEndDateValidator
} from '../../validators/voucherForm.validator'
import { VOUCHER_BASIC_INFORMATION } from '../../constants/voucherForm.constants'
import { FIELD_REQUIRED_MESSAGE, VOUCHER_CODE_RULE } from '~/utils/validators'

function BasicInformation({ form, ui }) {
  const {
    register,
    watch,
    trigger,
    formState: { errors }
  } = form
  const { isUpdate, voucherStatus } = ui
  const { LABELS, HELP_TEXT } = VOUCHER_BASIC_INFORMATION

  return (
    <Card sx={{ p: 5 }}>
      <TypographyTitle sx={{ mb: 3 }}>{LABELS.TITLE}</TypographyTitle>
      <Grid2 container rowSpacing={3} columnSpacing={2} sx={{ mt: 2 }}>
        <Grid2 size={12}>
          <TypographyLabel>{LABELS.VOUCHER_NAME}</TypographyLabel>
          <TextField
            disabled={isUpdate && voucherStatus === 'EXPIRED'}
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
            disabled={isUpdate && voucherStatus === 'EXPIRED'}
            {...register('voucher_code', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: { value: VOUCHER_CODE_RULE },
              onChange: (e) => (e.target.value = e.target.value.toUpperCase()),
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
              (isUpdate && voucherStatus === 'EXPIRED') ||
              (isUpdate && voucherStatus === 'ONGOING')
            }
            type="datetime-local"
            fullWidth
            {...register('voucher_start_date', {
              ...voucherStartDateValidator({ voucherStatus }),
              onChange: () => {
                if (watch('voucher_end_date')) trigger('voucher_end_date')
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
            disabled={isUpdate && voucherStatus === 'EXPIRED'}
            type="datetime-local"
            fullWidth
            {...register(
              'voucher_end_date',
              voucherEndDateValidator({ watch })
            )}
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
