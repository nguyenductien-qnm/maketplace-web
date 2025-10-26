import { Card, Grid2, MenuItem, Select, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import TypographyLabel from '~/components/common/TypographyLabel'
import TypographyTitle from '~/components/common/TypographyTitle'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'

const LABELS = {
  TITLE: 'Discount Setting',
  VOUCHER_TYPE: 'Voucher Type',
  VOUCHER_VALUE: 'Voucher Value',
  VOUCHER_QUANTITY: 'Voucher Quantity',
  VOUCHER_MAX_DISTRIBUTE: 'Max Distribution per Buyer',
  VOUCHER_MIN_ORDER_VALUE: 'Minimum Order Value'
}

function DiscountSetting({ form }) {
  const { register, watch, control, errors } = form
  return (
    <Card sx={{ p: 5 }}>
      <TypographyTitle sx={{ mb: 3 }}>{LABELS.TITLE}</TypographyTitle>
      <Grid2 container rowSpacing={3} columnSpacing={2} sx={{ mt: 2 }}>
        <Grid2 size={6}>
          <TypographyLabel>{LABELS.VOUCHER_TYPE}</TypographyLabel>
          <Controller
            name="voucher_type"
            control={control}
            rules={{ required: FIELD_REQUIRED_MESSAGE }}
            render={({ field }) => (
              <Select
                fullWidth
                {...field}
                error={!!errors['voucher_type']}
                value={field.value ?? 'percent'}
              >
                <MenuItem value="fixed_amount">Fixed Amount</MenuItem>
                <MenuItem value="percent">Percent</MenuItem>
              </Select>
            )}
          />
        </Grid2>
        <Grid2 size={6}>
          <TypographyLabel>{LABELS.VOUCHER_VALUE}</TypographyLabel>
          <TextField fullWidth />
        </Grid2>
        <Grid2 size={6}>
          <TypographyLabel>{LABELS.VOUCHER_QUANTITY}</TypographyLabel>
          <TextField fullWidth />
        </Grid2>
        <Grid2 size={6}>
          <TypographyLabel>{LABELS.VOUCHER_MAX_DISTRIBUTE}</TypographyLabel>
          <TextField fullWidth />
        </Grid2>
        <Grid2 size={6}>
          <TypographyLabel>{LABELS.VOUCHER_MIN_ORDER_VALUE}</TypographyLabel>
          <TextField fullWidth />
        </Grid2>
      </Grid2>
    </Card>
  )
}
export default DiscountSetting
