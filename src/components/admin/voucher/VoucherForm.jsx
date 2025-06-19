import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import TypographyLabel from '~/components/common/TypographyLabel'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Grid2 from '@mui/material/Grid2'
import SearchInput from '~/components/common/SearchInput'
import FieldErrorAlert from '~/components/common/FieldErrorAlert'
import ProductEmpty from '~/components/vendor/VendorProduct/ProductEmpty'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import {
  FIELD_REQUIRED_MESSAGE,
  NAME_RULE,
  NAME_RULE_MESSAGE,
  NUMBER_RULE,
  NUMBER_RULE_MESSAGE,
  VOUCHER_CODE_RULE,
  VOUCHER_CODE_RULE_MESSAGE
} from '~/utils/validators'
import { blue } from '@mui/material/colors'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'

function VoucherForm({ voucher, mode, action, open, onclose, onSubmit }) {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset
  } = useForm({
    defaultValues: {
      voucher_type: 'percent',
      voucher_status: 'public'
    }
  })

  useEffect(() => {
    if (voucher) reset(voucher)
  }, [voucher])

  const submitHandler = (data) => {
    onSubmit(data)
  }

  return (
    <Dialog open={open} onClose={onclose} fullWidth maxWidth="sm">
      <DialogTitle>
        {action === 'create' && 'Create Voucher'}
        {action === 'update' && 'Update Voucher'}
      </DialogTitle>
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent sx={{ mt: '-20px' }}>
          <Box sx={{ mt: 2 }}>
            <Grid2 container spacing={2}>
              {/* Voucher Code */}
              <Grid2 size={6}>
                <TypographyLabel variant="body2">CODE Voucher</TypographyLabel>
                <TextField
                  placeholder="8 characters"
                  size="small"
                  fullWidth
                  {...register('voucher_code', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: VOUCHER_CODE_RULE,
                      message: VOUCHER_CODE_RULE_MESSAGE
                    }
                  })}
                  error={!!errors['voucher_code']}
                  helperText={errors?.voucher_code?.message}
                />
              </Grid2>

              {/* Voucher Name */}
              <Grid2 size={6}>
                <TypographyLabel variant="body2">Voucher Name</TypographyLabel>
                <TextField
                  size="small"
                  fullWidth
                  {...register('voucher_name', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: NAME_RULE,
                      message: NAME_RULE_MESSAGE
                    }
                  })}
                  error={!!errors['voucher_name']}
                  helperText={errors?.voucher_name?.message}
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
                    <Select
                      size="small"
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
                <FieldErrorAlert errors={errors} fieldName={'voucher_type'} />
              </Grid2>

              {/* Voucher Value */}
              <Grid2 size={6}>
                <TypographyLabel variant="body2">Voucher Value</TypographyLabel>
                <TextField
                  type="number"
                  size="small"
                  fullWidth
                  {...register('voucher_value', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: NUMBER_RULE,
                      message: NUMBER_RULE_MESSAGE
                    }
                  })}
                  error={!!errors['voucher_value']}
                  helperText={errors?.voucher_value?.message}
                />
              </Grid2>

              {/* Voucher Start & End Date & Time */}
              <Grid2 size={6}>
                <TypographyLabel variant="body2">
                  Voucher Start Date & Time
                </TypographyLabel>
                <TextField
                  type="datetime-local"
                  size="small"
                  fullWidth
                  {...register('voucher_start_date', {
                    required: FIELD_REQUIRED_MESSAGE
                  })}
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
                  size="small"
                  fullWidth
                  {...register('voucher_end_date', {
                    required: FIELD_REQUIRED_MESSAGE
                  })}
                  error={!!errors['voucher_end_date']}
                  helperText={errors?.voucher_end_date?.message}
                />
              </Grid2>

              {/* Voucher Quantity */}
              <Grid2 size={6}>
                <TypographyLabel variant="body2">
                  Voucher Quantity
                </TypographyLabel>
                <TextField
                  type="number"
                  size="small"
                  fullWidth
                  {...register('voucher_quantity', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: NUMBER_RULE,
                      message: NUMBER_RULE_MESSAGE
                    }
                  })}
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
                  size="small"
                  fullWidth
                  {...register('voucher_min_order_value', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: NUMBER_RULE,
                      message: NUMBER_RULE_MESSAGE
                    }
                  })}
                  error={!!errors['voucher_min_order_value']}
                  helperText={errors?.voucher_min_order_value?.message}
                />
              </Grid2>

              <Grid2 size={12}>
                <TypographyLabel variant="body2">
                  Voucher status
                </TypographyLabel>
                <Controller
                  name="voucher_status"
                  control={control}
                  rules={{ required: FIELD_REQUIRED_MESSAGE }}
                  render={({ field }) => (
                    <Select
                      size="small"
                      fullWidth
                      {...field}
                      error={!!errors['voucher_type']}
                      value={field.value ?? 'public'}
                    >
                      <MenuItem value="public">Public</MenuItem>
                      <MenuItem value="private">Private</MenuItem>
                    </Select>
                  )}
                />
                <FieldErrorAlert errors={errors} fieldName={'voucher_status'} />
              </Grid2>

              {/* Voucher Applies */}
              {mode === 'vendor' && (
                <>
                  <Grid2 size={12}>
                    <TypographyLabel variant="body2">
                      Voucher Applies
                    </TypographyLabel>
                    <Controller
                      name="voucher_applies"
                      control={control}
                      rules={{ required: FIELD_REQUIRED_MESSAGE }}
                      render={({ field }) => (
                        <Select
                          size="small"
                          fullWidth
                          {...field}
                          error={!!errors['voucher_type']}
                          value={field.value ?? 'all'}
                        >
                          <MenuItem value="all">All</MenuItem>
                          <MenuItem value="specific">Specific</MenuItem>
                        </Select>
                      )}
                    />
                  </Grid2>

                  {/* {voucherApplies === 'specific' && (
                <Grid2 size={12} sx={{ mt: 2 }}>
                  <SearchInput
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    handleSearch={handleSearch}
                  />
                  {loading && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: '50px'
                      }}
                    >
                      <CircularIndeterminate />
                    </Box>
                  )}
                  {!loading && product.length == 0 && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: '50px'
                      }}
                    >
                      <ProductEmpty />
                    </Box>
                  )}

                  {!loading && Array.isArray(product) && product.length > 0 && (
                    <Grid2 container spacing={2} sx={{ mt: '50px' }}>
                      {product.map((p, index) => (
                        <Grid2
                          onClick={() => handleSelectProduct(p)}
                          size={6}
                          key={index}
                        >
                          <Paper
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              p: 2,
                              border: selectProduct.includes(p._id)
                                ? '2px solid'
                                : null,
                              borderColor: selectProduct.includes(p._id)
                                ? blue[600]
                                : null,
                              '&:hover': {
                                cursor: 'pointer'
                              }
                            }}
                          >
                            <img
                              src={p.product_thumb}
                              alt={p.product_name}
                              style={{ maxWidth: '100px', marginRight: '10px' }}
                            />
                            <TypographyLabel
                              variant="body2"
                              sx={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 5,
                                overflow: 'hidden'
                              }}
                            >
                              {p.product_name}
                            </TypographyLabel>
                          </Paper>
                        </Grid2>
                      ))}
                    </Grid2>
                  )}
                </Grid2>
              )} */}
                </>
              )}
            </Grid2>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            className="btn-shop-cancel-submit-voucher"
            onClick={onclose}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            className="btn-shop-submit-voucher"
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default VoucherForm
