import { Button, Card, Grid2, MenuItem, Select, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import TypographyLabel from '~/components/common/TypographyLabel'
import AddIcon from '@mui/icons-material/Add'
import TypographyTitle from '~/components/common/TypographyTitle'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'

const LABELS = {
  TITLE: 'Applicable & Visibility',
  VOUCHER_APPLY: 'Voucher Apply',
  VOUCHER_VISIBILITY: 'Voucher Visibility'
}

function VoucherApplicable({ form }) {
  const { register, watch, control, errors } = form

  const voucherApply = watch('voucher_apply')

  return (
    <Card sx={{ p: 5 }}>
      <TypographyTitle sx={{ mb: 3 }}>{LABELS.TITLE}</TypographyTitle>
      <Grid2 container rowSpacing={3} columnSpacing={2} sx={{ mt: 2 }}>
        <Grid2 size={12}>
          <TypographyLabel>{LABELS.VOUCHER_VISIBILITY}</TypographyLabel>
          <Controller
            name="voucher_visibility"
            control={control}
            rules={{ required: FIELD_REQUIRED_MESSAGE }}
            render={({ field }) => (
              <Select
                fullWidth
                {...field}
                error={!!errors['voucher_visibility']}
                value={field.value ?? 'public'}
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="private">Private</MenuItem>
              </Select>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <TypographyLabel>{LABELS.VOUCHER_APPLY}</TypographyLabel>
          <Controller
            name="voucher_apply"
            control={control}
            rules={{ required: FIELD_REQUIRED_MESSAGE }}
            render={({ field }) => (
              <Select
                fullWidth
                {...field}
                error={!!errors['voucher_apply']}
                value={field.value}
              >
                <MenuItem value="all">All Product</MenuItem>
                <MenuItem value="specific">Specific Product</MenuItem>
              </Select>
            )}
          />
        </Grid2>
        {voucherApply == 'specific' && (
          <Grid2>
            <Button variant="outlined" sx={{ width: '200px', height: '50px' }}>
              <AddIcon />
              Add product
            </Button>
          </Grid2>
        )}
      </Grid2>
    </Card>
  )
}
export default VoucherApplicable
