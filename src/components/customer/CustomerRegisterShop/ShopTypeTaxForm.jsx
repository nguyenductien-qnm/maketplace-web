import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InfoIcon from '@mui/icons-material/Info'
import Logo from '~/layouts/user/Header/Logo'
import VisuallyHiddenInput from '~/components/common/VisuallyHiddenInput'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import NotificationDialog from '~/components/common/NotificationDialog'
import TypographyLabel from '~/components/common/TypographyLabel'
import { Controller } from 'react-hook-form'
import { grey, red } from '@mui/material/colors'
import { useState } from 'react'
import {
  FIELD_REQUIRED_MESSAGE,
  NATIONAL_ID_MESSAGE,
  NATIONAL_ID_RULE,
  TAX_CODE_RULE,
  TAX_CODE_MESSAGE
} from '~/utils/validators'

const dialogContent = {
  personal: {
    header: 'Why We Request Your National ID',
    content:
      'We need your National ID to verify your identity and ensure your shop account is secure and compliant with regulations. Your data is securely stored and cannot be changed after submission.'
  },
  business: {
    header: 'Why We Request Your Business License',
    content:
      'We require your business license to validate your shop for invoicing and tax purposes. Your information is kept confidential and cannot be changed after submission.'
  }
}

function ShopTypeTaxForm({ register, watch, control, errors }) {
  const FRAME_IMAGE = (field) => {
    return {
      height: '200px',
      border: '3px dashed',
      borderColor: errors?.[field] ? red[400] : grey[400],
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }
  }

  const REMOVE_IMAGE = {
    position: 'absolute',
    right: '0',
    top: '0',
    backgroundColor: 'white',
    borderRadius: '9999px',
    color: red[600],
    '&:hover': { cursor: 'pointer' }
  }

  const shopType = watch('shop_type')

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
        Shop Type & Tax Information
      </Typography>

      <Box>
        <TypographyLabel>Shop type</TypographyLabel>
        <Controller
          name="shop_type"
          control={control}
          defaultValue=""
          rules={{ required: FIELD_REQUIRED_MESSAGE }}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors['shop_type']}>
              <Select {...field} value={field.value}>
                <MenuItem value="personal">Personal</MenuItem>
                <MenuItem value="business">Business</MenuItem>
              </Select>
              {errors?.shop_type && (
                <FormHelperText>{errors.shop_type.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      {(() => {
        switch (shopType) {
          case 'personal':
            return (
              <Box>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Box flex={1}>
                  <TypographyLabel>National ID</TypographyLabel>
                  <TextField
                    {...register('national_id', {
                      required: FIELD_REQUIRED_MESSAGE,
                      pattern: {
                        value: NATIONAL_ID_RULE,
                        message: NATIONAL_ID_MESSAGE
                      }
                    })}
                    error={!!errors['national_id']}
                    fullWidth
                    helperText={errors?.national_id?.message}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, '')
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, pt: 5 }}>
                  <Box flex={1} sx={{ ...FRAME_IMAGE('national_card_front') }}>
                    <Controller
                      name="national_card_front"
                      control={control}
                      rules={{ required: 'National card is required' }}
                      render={({ field, fieldState }) => (
                        <Box>
                          {field.value ? (
                            <Box>
                              <Box
                                sx={{
                                  height: 180,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  overflow: 'hidden'
                                }}
                              >
                                <img
                                  src={URL.createObjectURL(field.value)}
                                  style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain'
                                  }}
                                />
                              </Box>
                              <HighlightOffOutlinedIcon
                                fontSize="small"
                                onClick={() => field.onChange(null)}
                                sx={{ ...REMOVE_IMAGE }}
                              />
                            </Box>
                          ) : (
                            <Button
                              component="label"
                              role={undefined}
                              variant="contained"
                              tabIndex={-1}
                              startIcon={<CloudUploadIcon />}
                            >
                              Upload ID front
                              <VisuallyHiddenInput
                                type="file"
                                accept="image/*"
                                {...register('national_card_front', {
                                  required: 'National card is required'
                                })}
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (!file || file.length === 0) return
                                  field.onChange(file)
                                }}
                              />
                            </Button>
                          )}
                          {fieldState.error && (
                            <p style={{ color: 'red' }}>
                              {fieldState.error.message}
                            </p>
                          )}
                        </Box>
                      )}
                    />
                  </Box>

                  <Box flex={1} sx={{ ...FRAME_IMAGE('national_card_back') }}>
                    <Controller
                      name="national_card_back"
                      control={control}
                      rules={{ required: 'National card is required' }}
                      render={({ field, fieldState }) => (
                        <Box>
                          {field.value ? (
                            <Box>
                              <Box
                                sx={{
                                  height: 180,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  overflow: 'hidden'
                                }}
                              >
                                <img
                                  src={URL.createObjectURL(field.value)}
                                  style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain'
                                  }}
                                />
                              </Box>
                              <HighlightOffOutlinedIcon
                                fontSize="small"
                                onClick={() => field.onChange(null)}
                                sx={{ ...REMOVE_IMAGE }}
                              />
                            </Box>
                          ) : (
                            <Button
                              component="label"
                              role={undefined}
                              variant="contained"
                              tabIndex={-1}
                              startIcon={<CloudUploadIcon />}
                            >
                              Upload ID front
                              <VisuallyHiddenInput
                                type="file"
                                accept="image/*"
                                {...register('national_card_back', {
                                  required: 'National card is required'
                                })}
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (!file || file.length === 0) return
                                  field.onChange(file)
                                }}
                              />
                            </Button>
                          )}
                          {fieldState.error && (
                            <p style={{ color: 'red' }}>
                              {fieldState.error.message}
                            </p>
                          )}
                        </Box>
                      )}
                    />
                  </Box>
                </Box>

                <Box
                  onClick={() => setOpen(true)}
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    cursor: 'pointer',
                    mt: 2
                  }}
                >
                  <InfoIcon sx={{ fontSize: '16px' }} />
                  <Typography
                    variant="subtitle2"
                    sx={{ ':hover': { textDecoration: 'underLine' } }}
                  >
                    Why we request your national ID
                  </Typography>
                </Box>
              </Box>
            )
          case 'business':
            return (
              <Box>
                <Divider sx={{ mt: 2, mb: 4 }} />
                <Box flex={1}>
                  <TypographyLabel>Tax Code</TypographyLabel>
                  <TextField
                    {...register('tax_code', {
                      required: FIELD_REQUIRED_MESSAGE,
                      pattern: {
                        value: TAX_CODE_RULE,
                        message: TAX_CODE_MESSAGE
                      }
                    })}
                    error={!!errors['tax_code']}
                    fullWidth
                    helperText={errors?.tax_code?.message}
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
                  <Box flex={1}>
                    <TypographyLabel>Issued Date</TypographyLabel>
                    <TextField
                      type="date"
                      {...register('issued_date', {
                        required: FIELD_REQUIRED_MESSAGE
                      })}
                      error={!!errors['issued_date']}
                      fullWidth
                      helperText={errors?.issued_date?.message}
                    />
                  </Box>

                  <Box flex={1}>
                    <TypographyLabel>Issued Place</TypographyLabel>
                    <TextField
                      {...register('issued_place', {
                        required: FIELD_REQUIRED_MESSAGE
                      })}
                      error={!!errors['issued_place']}
                      fullWidth
                      helperText={errors?.issued_place?.message}
                    />
                  </Box>
                </Box>

                <Box
                  flex={1}
                  sx={{ ...FRAME_IMAGE('business_license'), mt: 3 }}
                >
                  <Controller
                    name="business_license"
                    control={control}
                    rules={{ required: 'Business license image is required' }}
                    render={({ field, fieldState }) => (
                      <Box>
                        {field.value ? (
                          <Box>
                            <Box
                              sx={{
                                height: 180,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                overflow: 'hidden'
                              }}
                            >
                              <img
                                src={URL.createObjectURL(field.value)}
                                style={{
                                  maxWidth: '100%',
                                  maxHeight: '100%',
                                  objectFit: 'contain'
                                }}
                              />
                            </Box>
                            <HighlightOffOutlinedIcon
                              fontSize="small"
                              onClick={() => field.onChange(null)}
                              sx={{ ...REMOVE_IMAGE }}
                            />
                          </Box>
                        ) : (
                          <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                          >
                            Upload Business License
                            <VisuallyHiddenInput
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (!file || file.length === 0) return
                                field.onChange(file)
                              }}
                            />
                          </Button>
                        )}
                        {fieldState.error && (
                          <p style={{ color: 'red' }}>
                            {fieldState.error.message}
                          </p>
                        )}
                      </Box>
                    )}
                  />
                </Box>

                <Box
                  onClick={() => setOpen(true)}
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    cursor: 'pointer',
                    mt: 2
                  }}
                >
                  <InfoIcon sx={{ fontSize: '16px' }} />
                  <Typography
                    variant="subtitle2"
                    sx={{ ':hover': { textDecoration: 'underLine' } }}
                  >
                    Why we request your business license
                  </Typography>
                </Box>
              </Box>
            )
        }
      })()}

      {open && (
        <NotificationDialog
          open={open}
          onClose={() => setOpen(false)}
          header={dialogContent[shopType]?.header}
          content={dialogContent[shopType]?.content}
        />
      )}
    </Box>
  )
}

export default ShopTypeTaxForm
