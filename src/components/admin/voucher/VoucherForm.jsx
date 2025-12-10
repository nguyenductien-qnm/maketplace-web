import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Grid2 from '@mui/material/Grid2'
import TypographyLabel from '~/components/common/TypographyLabel'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import TypographyTitle from '~/components/common/TypographyTitle'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { modalConfig, modalStyle } from '~/config/modal'
import {
  FIELD_REQUIRED_MESSAGE,
  VOUCHER_CODE_RULE,
  VOUCHER_CODE_RULE_MESSAGE,
  VOUCHER_NAME_RULE,
  VOUCHER_NAME_RULE_MESSAGE
} from '~/utils/validators'
import { Controller } from 'react-hook-form'
import { useAdminVoucherForm } from '~/hooks/admin/voucherForm.hook'
import { FormControl, FormHelperText } from '@mui/material'

function VoucherForm({ voucher, mode, action, open, onclose, onSubmit }) {
  const {
    isSubmitting,
    register,
    watch,
    trigger,
    errors,
    control,
    handleFormSubmit
  } = useAdminVoucherForm({
    action,
    voucher,
    onSubmit
  })
  const voucherType = watch('voucher_type')

  return (
    <Modal open={open} onClose={onclose} {...modalConfig}>
      <Fade in={open}>
        <Box sx={modalStyle(800)}>
          <Box sx={{ flexShrink: 0 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <TypographyTitle>
                {action === 'create' && 'Create Voucher'}
                {action === 'update' && 'Update Voucher'}
              </TypographyTitle>
              <HighlightOffIcon
                color="error"
                onClick={onclose}
                sx={{ cursor: 'pointer' }}
              />
            </Box>
            <Divider sx={{ mt: 1, mb: 2 }} />
          </Box>

          <form onSubmit={handleFormSubmit}>
            <Grid2 container columnSpacing={2} rowSpacing={2}>
              {/* Voucher Name */}
              <Grid2 size={12}>
                <TypographyLabel variant="body2">Voucher Name</TypographyLabel>
                <TextField
                  fullWidth
                  {...register('voucher_name', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: VOUCHER_NAME_RULE,
                      message: VOUCHER_NAME_RULE_MESSAGE
                    }
                  })}
                  error={!!errors['voucher_name']}
                  helperText={errors?.voucher_name?.message}
                />
              </Grid2>

              <Grid2 size={12}>
                <TypographyLabel variant="body2">Voucher CODE</TypographyLabel>
                <TextField
                  placeholder="10 characters maximum"
                  fullWidth
                  {...register('voucher_code', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: VOUCHER_CODE_RULE,
                      message: VOUCHER_CODE_RULE_MESSAGE
                    },
                    onChange: (e) => {
                      e.target.value = e.target.value.toUpperCase()
                    },
                    setValueAs: (value) => value.toUpperCase()
                  })}
                  error={!!errors['voucher_code']}
                  helperText={errors?.voucher_code?.message}
                />
              </Grid2>

              {/* Voucher Start & End Date & Time */}
              <Grid2 size={6}>
                <TypographyLabel variant="body2">
                  Voucher Start Date & Time
                </TypographyLabel>
                <TextField
                  type="datetime-local"
                  fullWidth
                  {...register('voucher_start_date', {
                    required: FIELD_REQUIRED_MESSAGE,
                    onChange: () => {
                      if (watch('voucher_end_date')) trigger('voucher_end_date')
                    },
                    validate: {
                      futureDate: (value) => {
                        // if (voucherStatus === 'ONGOING') return true

                        if (!value) return true
                        const selectedDate = new Date(value)
                        const now = new Date()
                        if (selectedDate <= now)
                          return 'Start date must be in the future.'
                        return true
                      }
                    }
                  })}
                  inputProps={{
                    // ...(voucherStatus !== 'ONGOING' && {
                    min: new Date().toISOString().slice(0, 16)
                    // })
                  }}
                  error={!!errors['voucher_start_date']}
                  helperText={errors?.voucher_start_date?.message}
                />
              </Grid2>

              <Grid2 size={6}>
                <TypographyLabel variant="body2">
                  Voucher End Date & Time
                </TypographyLabel>
                <TextField
                  type="datetime-local"
                  fullWidth
                  {...register('voucher_end_date', {
                    required: FIELD_REQUIRED_MESSAGE,
                    validate: {
                      greaterThanStart: (value) => {
                        if (!value) return true

                        const startDate = watch('voucher_start_date')
                        if (!startDate) return 'Please select start date first'

                        const start = new Date(startDate)
                        const end = new Date(value)

                        const diffInMs = end - start
                        const diffInHours = diffInMs / (1000 * 60 * 60)

                        if (diffInHours < 1)
                          return 'End date must be at least 1 hour after start date'

                        return true
                      }
                    }
                  })}
                  inputProps={{
                    min: new Date(new Date().getTime())
                      .toISOString()
                      .slice(0, 16)
                  }}
                  error={!!errors['voucher_end_date']}
                  helperText={errors?.voucher_end_date?.message}
                />
              </Grid2>

              {/* Voucher Type */}
              <Grid2 size={6}>
                <TypographyLabel variant="body2">Voucher Type</TypographyLabel>
                <Controller
                  name="voucher_type"
                  control={control}
                  rules={{ required: FIELD_REQUIRED_MESSAGE }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors['voucher_type']}>
                      <Select
                        fullWidth
                        {...field}
                        value={field.value || ''}
                        displayEmpty
                      >
                        <MenuItem value="fixed_amount">Fixed Amount</MenuItem>
                        <MenuItem value="percent">Percent</MenuItem>
                      </Select>
                      <FormHelperText>
                        {errors?.voucher_type?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid2>

              {/* Voucher Value */}
              <Grid2 size={6}>
                <TypographyLabel variant="body2">Voucher Value</TypographyLabel>
                <TextField
                  type="number"
                  fullWidth
                  {...register('voucher_value', {
                    required: FIELD_REQUIRED_MESSAGE,

                    validate: (value) => {
                      const numValue = parseFloat(value)
                      if (isNaN(numValue) || !Number.isInteger(numValue)) {
                        return 'Value must be an integer'
                      }

                      if (voucherType === 'percent') {
                        if (numValue < 1 || numValue > 99)
                          return 'Value must be between 1 and 99 for percentage type'
                      } else if (voucherType === 'fixed_amount') {
                        if (numValue < 1 || numValue > 5000)
                          return 'Value must be between $1 and $5000 for fixed amount type'
                      }

                      return true
                    }
                  })}
                  inputProps={{
                    step: 1,
                    min: 1,
                    max: voucherType === 'percent' ? 99 : 5000,
                    onKeyPress: (e) => {
                      if (e.key === '.' || e.key === ',') e.preventDefault()
                    }
                  }}
                  error={!!errors['voucher_value']}
                  helperText={errors?.voucher_value?.message}
                />
              </Grid2>

              {/* Voucher Quantity */}
              <Grid2 size={6}>
                <TypographyLabel variant="body2">
                  Voucher Quantity
                </TypographyLabel>
                <TextField
                  type="number"
                  fullWidth
                  {...register('voucher_quantity', {
                    required: FIELD_REQUIRED_MESSAGE,
                    validate: (value) => {
                      const numValue = parseFloat(value)
                      if (isNaN(numValue) || !Number.isInteger(numValue))
                        return 'Value must be an integer'

                      if (numValue < 1 || numValue > 200000)
                        return 'Value must be between 1 and 200000'

                      return true
                    }
                  })}
                  inputProps={{
                    step: 1,
                    min: 1,
                    max: 200000,
                    onKeyPress: (e) => {
                      if (e.key === '.' || e.key === ',') e.preventDefault()
                    }
                  }}
                  error={!!errors['voucher_quantity']}
                  helperText={errors?.voucher_quantity?.message}
                />
              </Grid2>

              {/* Voucher Min Order Value */}
              <Grid2 size={6}>
                <TypographyLabel variant="body2">
                  Voucher Min Order Value
                </TypographyLabel>
                <TextField
                  type="number"
                  fullWidth
                  {...register('voucher_min_order_value', {
                    required: FIELD_REQUIRED_MESSAGE,

                    validate: (value) => {
                      const numValue = parseFloat(value)
                      if (isNaN(numValue) || !Number.isInteger(numValue)) {
                        return 'Value must be an integer'
                      }

                      if (numValue < 1 || numValue > 10000)
                        return 'Value must be between 1 and 10000'

                      return true
                    }
                  })}
                  inputProps={{
                    step: 1,
                    min: 1,
                    max: 5000,
                    onKeyPress: (e) => {
                      if (e.key === '.' || e.key === ',') e.preventDefault()
                    }
                  }}
                  error={!!errors['voucher_min_order_value']}
                  helperText={errors?.voucher_min_order_value?.message}
                />
              </Grid2>

              <Grid2 size={6}>
                <TypographyLabel>Max Distribution per Buyer</TypographyLabel>
                <TextField
                  {...register('voucher_max_distribution_per_buyer', {
                    required: FIELD_REQUIRED_MESSAGE,
                    validate: (value) => {
                      const numValue = parseFloat(value)
                      if (isNaN(numValue) || !Number.isInteger(numValue))
                        return 'Value must be an integer'

                      if (numValue < 1 || numValue > 5)
                        return 'Value must be between 1 and 5'

                      return true
                    }
                  })}
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
                  helperText={
                    errors.voucher_max_distribution_per_buyer?.message
                  }
                />
              </Grid2>

              {voucherType === 'percent' && (
                <Grid2 size={6}>
                  <TypographyLabel>Max Discount Amount</TypographyLabel>
                  <TextField
                    {...register('voucher_max_discount_amount', {
                      required: FIELD_REQUIRED_MESSAGE
                    })}
                    type="number"
                    fullWidth
                  />
                </Grid2>
              )}

              <Grid2 size={12}>
                <TypographyLabel variant="body2">
                  Voucher Visibility
                </TypographyLabel>
                <Controller
                  name="voucher_visibility"
                  control={control}
                  rules={{ required: FIELD_REQUIRED_MESSAGE }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.voucher_visibility}>
                      <Select {...field} displayEmpty value={field.value || ''}>
                        <MenuItem value="public">Public</MenuItem>
                        <MenuItem value="private">Private</MenuItem>
                      </Select>
                      <FormHelperText>
                        {errors?.voucher_visibility?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid2>
            </Grid2>

            <Box
              sx={{
                pt: '24px',
                display: 'flex',
                justifyContent: 'flex-end',
                flexShrink: 0,
                gap: 1
              }}
            >
              <Button color="secondary" variant="outlined" onClick={onclose}>
                Cancel
              </Button>
              <Button
                className="btn-voucher-form"
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  )
}

export default VoucherForm
