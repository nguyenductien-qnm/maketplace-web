import Card from '@mui/material/Card'
import Grid2 from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import TypographyLabel from '~/components/common/TypographyLabel'
import TypographyTitle from '~/components/common/TypographyTitle'
import { VOUCHER_DISCOUNT_SETTING } from '../../constants/voucherForm.constants'
import { Controller } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import {
  voucherValueValidator,
  voucherQuantityValidator,
  voucherMaxDistributeValidator,
  voucherMinOrderValidator,
  voucherMaxDiscountValueValidator
} from '../../validators/voucherForm.validator'

function DiscountSetting({ form, ui }) {
  const {
    register,
    watch,
    control,
    trigger,
    formState: { errors }
  } = form
  const { LABELS } = VOUCHER_DISCOUNT_SETTING

  const { isUpdate, voucherStatus } = ui
  const voucherType = watch('voucher_type')

  return (
    <Card sx={{ p: 5 }}>
      <TypographyTitle sx={{ mb: 3 }}>{LABELS.TITLE}</TypographyTitle>
      <Grid2 container rowSpacing={3} columnSpacing={2} sx={{ mt: 2 }}>
        <Grid2 size={6}>
          <TypographyLabel>{LABELS.VOUCHER_TYPE}</TypographyLabel>
          <Controller
            name="voucher_type"
            control={control}
            rules={{
              required: FIELD_REQUIRED_MESSAGE
            }}
            render={({ field }) => (
              <Select
                disabled={isUpdate}
                fullWidth
                {...field}
                error={!!errors['voucher_type']}
                value={field.value ?? 'percent'}
                onChange={(e) => {
                  field.onChange(e)
                  setTimeout(() => {
                    trigger('voucher_value')
                  }, 0)
                }}
              >
                <MenuItem value="fixed_amount">Fixed Amount</MenuItem>
                <MenuItem value="percent">Percent</MenuItem>
              </Select>
            )}
          />
        </Grid2>

        <Grid2 size={6}>
          <TypographyLabel>{LABELS.VOUCHER_VALUE}</TypographyLabel>
          <TextField
            disabled={
              (isUpdate && voucherStatus == 'EXPIRED') ||
              (isUpdate && voucherStatus == 'ONGOING')
            }
            {...register(
              'voucher_value',
              voucherValueValidator({ voucherType })
            )}
            type="number"
            inputProps={{
              step: 1,
              min: 1,
              max: voucherType === 'percent' ? 99 : 2000,
              onKeyPress: (e) => {
                if (e.key === '.' || e.key === ',') e.preventDefault()
              }
            }}
            fullWidth
            error={!!errors.voucher_value}
            helperText={errors.voucher_value?.message}
          />
        </Grid2>

        {voucherType === 'percent' && (
          <Grid2 size={6}>
            <TypographyLabel>{LABELS.VOUCHER_MAX_DISCOUNT}</TypographyLabel>
            <TextField
              disabled={
                (isUpdate && voucherStatus == 'EXPIRED') ||
                (isUpdate && voucherStatus == 'ONGOING')
              }
              {...register(
                'voucher_max_discount_amount',
                voucherMaxDiscountValueValidator()
              )}
              error={!!errors.voucher_max_discount_amount}
              helperText={errors.voucher_max_discount_amount?.message}
              type="number"
              fullWidth
            />
          </Grid2>
        )}

        <Grid2 size={6}>
          <TypographyLabel>{LABELS.VOUCHER_QUANTITY}</TypographyLabel>
          <TextField
            disabled={isUpdate && voucherStatus == 'EXPIRED'}
            {...register('voucher_quantity', voucherQuantityValidator())}
            fullWidth
            type="number"
            inputProps={{
              step: 1,
              min: 1,
              max: 200000,
              onKeyPress: (e) => {
                if (e.key === '.' || e.key === ',') e.preventDefault()
              }
            }}
            error={!!errors.voucher_quantity}
            helperText={errors.voucher_quantity?.message}
          />
        </Grid2>

        <Grid2 size={6}>
          <TypographyLabel>{LABELS.VOUCHER_MAX_DISTRIBUTE}</TypographyLabel>
          <TextField
            disabled={isUpdate}
            {...register(
              'voucher_max_distribution_per_buyer',
              voucherMaxDistributeValidator()
            )}
            fullWidth
            type="number"
            inputProps={{
              step: 1,
              min: 1,
              max: 5,
              onKeyPress: (e) => {
                if (e.key === '.' || e.key === ',') e.preventDefault()
              }
            }}
            error={!!errors.voucher_max_distribution_per_buyer}
            helperText={errors.voucher_max_distribution_per_buyer?.message}
          />
        </Grid2>

        <Grid2 size={6}>
          <TypographyLabel>{LABELS.VOUCHER_MIN_ORDER_VALUE}</TypographyLabel>
          <TextField
            disabled={
              (isUpdate && voucherStatus == 'EXPIRED') ||
              (isUpdate && voucherStatus == 'ONGOING')
            }
            {...register('voucher_min_order_value', voucherMinOrderValidator())}
            fullWidth
            type="number"
            inputProps={{
              step: 1,
              min: 1,
              max: 2000,
              onKeyPress: (e) => {
                if (e.key === '.' || e.key === ',') e.preventDefault()
              }
            }}
            error={!!errors.voucher_min_order_value}
            helperText={errors.voucher_min_order_value?.message}
          />
        </Grid2>
      </Grid2>
    </Card>
  )
}
export default DiscountSetting
