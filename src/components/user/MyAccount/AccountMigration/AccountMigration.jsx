import { Box, Button, styled, TextField, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getUserInfoAPI } from '~/api/user'
import FormAddress from '~/components/FormAddress'
import TypographyLabel from '../../Common/TypographyLabel'

function AccountMigration() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm()

  useEffect(() => {
    const getAndSetUserInfo = async () => {
      const res = await getUserInfoAPI()
      const userInfo = res.data.metadata
      reset({
        user_name: userInfo.user_name,
        user_phone: userInfo.user_phone
      })
    }
    getAndSetUserInfo()
  }, [])

  return (
    <Box>
      <Typography sx={{ fontSize: '25px', fontWeight: '600' }}>
        Update account to vendor
      </Typography>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          gap: '15px',
          marginTop: '30px'
        }}
      >
        <Box>
          <TypographyLabel>Full name</TypographyLabel>
          <TextField size="small" fullWidth {...register('user_name')} />
        </Box>
        <Box>
          <TypographyLabel>Phone number</TypographyLabel>
          <TextField size="small" fullWidth {...register('user_phone')} />
        </Box>
        <Box>
          <TypographyLabel>Shop name</TypographyLabel>
          <TextField size="small" fullWidth {...register('shop_name')} />
        </Box>
        <Box>
          <TypographyLabel>Shop URL</TypographyLabel>
          <TextField size="small" fullWidth {...register('shop_url')} />
        </Box>

        <FormAddress />

        <Button
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
    </Box>
  )
}
export default AccountMigration
