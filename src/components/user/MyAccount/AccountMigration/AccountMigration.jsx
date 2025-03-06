import { Box, Button, TextField, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormAddress from '~/components/FormAddress'
import TypographyLabel from '../../Common/TypographyLabel'
import generateURL from '~/utils/generateURL'
import { accountMigrationAPI } from '~/redux/user.slice'
import { useDispatch } from 'react-redux'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PHONE_RULE,
  PHONE_RULE_MESSAGE,
  NAME_RULE,
  NAME_RULE_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/FieldErrorAlert'
import { checkShopURLAPI } from '~/api/shop.api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function AccountMigration() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    watch,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
    clearErrors,
    setError,
    getValues
  } = useForm()

  const [availableShopSlug, setAvailableShopSlug] = useState(true)

  const [tempAddress, setTempAddress] = useState({
    selectedProvince: {},
    selectedDistrict: {},
    selectedWard: {}
  })

  const handleAddressChange = (address) => {
    setTempAddress(address)
  }

  const handleChangeShopName = async (e) => {
    const shopName = e.target.value.trim()

    if (!shopName) {
      setValue('shop_slug', '')
      return
    }

    const shopSlug = generateURL(shopName)
    setValue('shop_slug', shopSlug)
    await checkShopURL()
  }

  const handleAccountMigration = async (data) => {
    if (!availableShopSlug) {
      toast.error('This shop name is available.')
      return
    }

    data.province = tempAddress?.selectedProvince
    data.district = tempAddress?.selectedDistrict
    data.ward = tempAddress?.selectedWard

    const res = await dispatch(accountMigrationAPI(data))
    if (res.payload.status == 200) {
      setTimeout(() => {
        navigate('/my-account/dashboard')
      }, 500)
    }
  }

  const checkShopURL = async () => {
    try {
      const currentSlug = getValues('shop_slug')
      if (!currentSlug) return
      const res = await checkShopURLAPI({ shop_slug: currentSlug })
      if (res) {
        clearErrors(['shop_slug'])
        setAvailableShopSlug(true)
      }
    } catch (error) {
      setError('shop_slug', {
        type: 'manual',
        message: 'This URL is already taken.'
      })
      setAvailableShopSlug(false)
    }
  }

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
        onSubmit={handleSubmit(handleAccountMigration)}
      >
        <Box>
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
          />
          <FieldErrorAlert errors={errors} fieldName="shop_email" />
        </Box>

        <Box>
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
          />
          <FieldErrorAlert errors={errors} fieldName="shop_phone" />
        </Box>

        <Box>
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
            onBlur={(e) => {
              handleChangeShopName(e)
            }}
          />
          <FieldErrorAlert errors={errors} fieldName="shop_name" />
        </Box>

        <Box>
          <TypographyLabel>Shop URL</TypographyLabel>
          <TextField
            size="small"
            fullWidth
            {...register('shop_slug', {
              required: FIELD_REQUIRED_MESSAGE
            })}
            helperText={errors['shop_slug']?.message || ''}
            error={!!errors['shop_slug']}
            onBlur={(e) => {
              checkShopURL()
            }}
          />
        </Box>

        <FormAddress
          clearErrors={clearErrors}
          register={register}
          watch={watch}
          errors={errors}
          reset={reset}
          setValue={setValue}
          handleAddressChange={handleAddressChange}
          actionType="create"
        />

        <Button
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
    </Box>
  )
}
export default AccountMigration
