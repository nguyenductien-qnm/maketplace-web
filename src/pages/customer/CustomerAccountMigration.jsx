import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid2 from '@mui/material/Grid2'
import FormAddress from '~/components/common/FormAddress'
import TypographyLabel from '~/components/common/TypographyLabel'
import AccountMigrationFormSkeleton from '~/components/customer/CustomerAccountMigration/AccountMigrationFormSkeleton'
import { navigate } from '~/helpers/navigation'
import { blue } from '@mui/material/colors'
import {
  useOwnerShopStatus,
  useUserAccountMigration
} from '~/hooks/user/user.hook'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PHONE_RULE,
  PHONE_RULE_MESSAGE,
  NAME_RULE,
  NAME_RULE_MESSAGE
} from '~/utils/validators'

function CustomerAccountMigration() {
  const { register, errors, control, handleFormSubmit } =
    useUserAccountMigration()

  const { loading, shopStatus } = useOwnerShopStatus()

  if (shopStatus) navigate('/my-account/dashboard')

  return (
    <Box>
      <Typography sx={{ fontSize: '25px', fontWeight: '600' }}>
        Upgrade account to vendor
      </Typography>
      {loading && <AccountMigrationFormSkeleton />}
      {!loading && (
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            gap: '15px',
            marginTop: '30px'
          }}
          onSubmit={handleFormSubmit}
        >
          <Grid2 container spacing={2}>
            <Grid2 size={4}>
              <TypographyLabel>Shop email</TypographyLabel>
              <TextField
                size="small"
                fullWidth
                {...register('shop_email', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE
                  }
                })}
                error={!!errors['shop_email']}
                helperText={errors?.shop_email?.message}
              />
            </Grid2>

            <Grid2 size={4}>
              <TypographyLabel>Shop phone</TypographyLabel>
              <TextField
                size="small"
                error={!!errors['shop_phone']}
                fullWidth
                {...register('shop_phone', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PHONE_RULE,
                    message: PHONE_RULE_MESSAGE
                  }
                })}
                helperText={errors?.shop_phone?.message}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '')
                }}
              />
            </Grid2>

            <Grid2 size={4}>
              <TypographyLabel>Shop name</TypographyLabel>
              <TextField
                size="small"
                error={!!errors['shop_name']}
                fullWidth
                {...register('shop_name', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: NAME_RULE,
                    message: NAME_RULE_MESSAGE
                  }
                })}
                helperText={errors?.shop_name?.message}
              />
            </Grid2>
          </Grid2>

          <FormAddress control={control} errors={errors} />

          <Button
            className="btn-account-migration"
            type="submit"
            sx={{
              color: 'white',
              backgroundColor: blue[600],
              width: '150px',
              padding: '10px 0',
              marginTop: '10px'
            }}
          >
            Become a vendor
          </Button>
        </form>
      )}
    </Box>
  )
}
export default CustomerAccountMigration
