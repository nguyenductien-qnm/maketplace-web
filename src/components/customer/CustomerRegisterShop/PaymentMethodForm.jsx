import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Logo from '~/layouts/user/Header/Logo'
import TypographyLabel from '~/components/common/TypographyLabel'
import NotificationDialog from '~/components/common/NotificationDialog'
import InfoIcon from '@mui/icons-material/Info'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE
} from '~/utils/validators'

function PaymentMethodForm({ register, control, errors }) {
  const [open, setOpen] = useState(false)
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      <Logo />
      <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>
        Payment Method & Refund
      </Typography>

      <Box flex={1}>
        <TypographyLabel>Paypal Email</TypographyLabel>
        <TextField
          {...register('paypal_email', {
            required: FIELD_REQUIRED_MESSAGE,
            pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE }
          })}
          error={!!errors['paypal_email']}
          fullWidth
          helperText={errors?.paypal_email?.message}
        />
      </Box>

      <Box>
        <TypographyLabel>Refund Type</TypographyLabel>
        <Controller
          name="shop_refund_type"
          control={control}
          defaultValue="auto"
          rules={{ required: FIELD_REQUIRED_MESSAGE }}
          render={({ field }) => (
            <FormControl fullWidth>
              <Select fullWidth {...field} value={field.value}>
                <MenuItem value="auto">Refund auto</MenuItem>
                <MenuItem value="manual">Refund manual</MenuItem>
              </Select>
              {errors?.shop_refund_type && (
                <FormHelperText>
                  {errors.shop_refund_type.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      <Box
        onClick={() => setOpen(true)}
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        <InfoIcon sx={{ fontSize: '16px' }} />
        <Typography
          variant="subtitle2"
          sx={{ ':hover': { textDecoration: 'underLine' } }}
        >
          Refund type information
        </Typography>
      </Box>

      <NotificationDialog
        open={open}
        onClose={() => setOpen(false)}
        header="Refund Type Options"
        content={`There are two refund types available:

1. Manual: Refunds are processed manually.  
2. Auto: Refunds are processed automatically and incur a lower platform fee.

Please choose the option that best suits your needs.`}
      />
    </Box>
  )
}

export default PaymentMethodForm
