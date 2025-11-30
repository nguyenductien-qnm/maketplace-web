import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Logo from '~/layouts/user/Header/Logo'
import FormAddress from '~/components/common/FormAddress'
import TypographyLabel from '~/components/common/TypographyLabel'
import NotificationDialog from '~/components/common/NotificationDialog'
import InfoIcon from '@mui/icons-material/Info'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  NAME_RULE,
  NAME_RULE_MESSAGE,
  PHONE_RULE,
  PHONE_RULE_MESSAGE
} from '~/utils/validators'
import { useState } from 'react'

function BasicShopInfoForm({ register, errors, control, getValues, setValue }) {
  const address = {
    province: getValues('province'),
    district: getValues('district'),
    ward: getValues('ward'),
    street: getValues('street')
  }

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
        Basic Shop Information
      </Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box flex={1}>
          <TypographyLabel>Shop Name</TypographyLabel>
          <TextField
            {...register('shop_name', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: { value: NAME_RULE, message: NAME_RULE_MESSAGE }
            })}
            error={!!errors['shop_name']}
            fullWidth
            helperText={errors?.shop_name?.message}
          />
        </Box>

        <Box flex={1}>
          <TypographyLabel>Shop Email</TypographyLabel>
          <TextField
            {...register('shop_email', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE }
            })}
            error={!!errors['shop_email']}
            fullWidth
            helperText={errors?.shop_email?.message}
          />
        </Box>

        <Box flex={1}>
          <TypographyLabel>Shop Phone</TypographyLabel>
          <TextField
            {...register('shop_phone', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: { value: PHONE_RULE, message: PHONE_RULE_MESSAGE }
            })}
            error={!!errors['shop_phone']}
            fullWidth
            helperText={errors?.shop_phone?.message}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, '')
            }}
          />
        </Box>
      </Box>

      <FormAddress
        address={address}
        control={control}
        errors={errors}
        setValue={setValue}
        isLarge={true}
      />

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
          Why we request your address?
        </Typography>
      </Box>

      <NotificationDialog
        open={open}
        onClose={() => setOpen(false)}
        header="Why We Request Your Address"
        content="We need your address to ensure accurate delivery and proper shop management. You can change it later in your settings."
      />
    </Box>
  )
}

export default BasicShopInfoForm
