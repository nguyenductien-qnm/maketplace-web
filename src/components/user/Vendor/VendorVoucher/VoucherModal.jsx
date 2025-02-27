import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid2,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Paper
} from '@mui/material'
import { queryProductByOwnerAPI } from '~/api/productSPU.api'
import SearchInput from '../Product/TabProduct/SearchInput'
import { blue } from '@mui/material/colors'
import { useForm } from 'react-hook-form'
import {
  FIELD_REQUIRED_MESSAGE,
  NUMBER_RULE,
  NUMBER_RULE_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/FieldErrorAlert'

const VoucherModal = ({ open, handleClose, action }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset
  } = useForm({
    defaultValues: {
      voucher_applies: 'ALL',
      voucher_type: 'fixed_amount'
    }
  })

  let voucherApplies = watch('voucher_applies')

  const [product, setProduct] = useState()
  const [selectProduct, setSelectProduct] = useState([])

  useEffect(() => {
    const getProduct = async () => {
      if (voucherApplies === 'SPECIFIC') {
        const res = await queryProductByOwnerAPI({ status: 'PUBLIC' })
        const clonedProducts = Array.from(
          { length: 10 },
          () => res?.data?.metadata[0]
        )
        setProduct(clonedProducts)
      }
    }
    getProduct()
  }, [voucherApplies])

  const customHandleSearch = async (searchValue) => {
    const res = await queryProductByOwnerAPI({
      status: 'PUBLIC',
      search: searchValue
    })
    setProduct(res?.data?.metadata)
  }

  const handleSelectProduct = (product) => {
    setSelectProduct((prev) => {
      const findProduct = prev.find((p) => p === product._id)
      if (findProduct) {
        return prev.filter((p) => p !== product._id)
      } else {
        return [...prev, product._id]
      }
    })
  }

  const createVoucher = async (data) => {
    console.log('Dữ liệu form:', data)
  }

  const handleCloseWithReset = () => {
    reset()
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleCloseWithReset} fullWidth maxWidth="sm">
      <DialogTitle>
        {action === 'CREATE' ? 'Create Voucher' : 'Update Voucher'}
      </DialogTitle>
      <form onSubmit={handleSubmit(createVoucher)}>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid2 container spacing={2}>
              {/* Voucher Code */}
              <Grid2 size={6}>
                <Typography variant="body2">CODE Voucher</Typography>
                <TextField
                  size="small"
                  fullWidth
                  {...register('voucher_code', {
                    required: FIELD_REQUIRED_MESSAGE
                  })}
                  error={!!errors['voucher_code']}
                />
                <FieldErrorAlert errors={errors} fieldName={'voucher_code'} />
              </Grid2>

              {/* Voucher Name */}
              <Grid2 size={6}>
                <Typography variant="body2">Voucher Name</Typography>
                <TextField
                  size="small"
                  fullWidth
                  {...register('voucher_name', {
                    required: FIELD_REQUIRED_MESSAGE
                  })}
                  error={!!errors['voucher_name']}
                />
                <FieldErrorAlert errors={errors} fieldName={'voucher_name'} />
              </Grid2>

              {/* Voucher Type */}
              <Grid2 size={6}>
                <Typography variant="body2">Voucher Type</Typography>
                <Select
                  size="small"
                  fullWidth
                  defaultValue="fixed_amount"
                  {...register('voucher_type', {
                    required: FIELD_REQUIRED_MESSAGE
                  })}
                  error={!!errors['voucher_type']}
                >
                  <MenuItem value="fixed_amount">Fixed Amount</MenuItem>
                  <MenuItem value="percent">Percent</MenuItem>
                </Select>
                <FieldErrorAlert errors={errors} fieldName={'voucher_type'} />
              </Grid2>

              {/* Voucher Value */}
              <Grid2 size={6}>
                <Typography variant="body2">Voucher Value</Typography>
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
                />
                <FieldErrorAlert errors={errors} fieldName={'voucher_value'} />
              </Grid2>

              {/* Voucher Start & End Date & Time */}
              <Grid2 size={6}>
                <Typography variant="body2">
                  Voucher Start Date & Time
                </Typography>
                <TextField
                  type="datetime-local"
                  size="small"
                  fullWidth
                  {...register('voucher_start_date', {
                    required: FIELD_REQUIRED_MESSAGE
                  })}
                  error={!!errors['voucher_start_date']}
                />
                <FieldErrorAlert
                  errors={errors}
                  fieldName={'voucher_start_date'}
                />
              </Grid2>

              <Grid2 size={6}>
                <Typography variant="body2">Voucher End Date & Time</Typography>
                <TextField
                  type="datetime-local"
                  size="small"
                  fullWidth
                  {...register('voucher_end_date', {
                    required: FIELD_REQUIRED_MESSAGE
                  })}
                  error={!!errors['voucher_end_date']}
                />
                <FieldErrorAlert
                  errors={errors}
                  fieldName={'voucher_end_date'}
                />
              </Grid2>

              {/* Voucher Quantity */}
              <Grid2 size={6}>
                <Typography variant="body2">Voucher Quantity</Typography>
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
                />
                <FieldErrorAlert
                  errors={errors}
                  fieldName={'voucher_quantity'}
                />
              </Grid2>

              {/* Voucher Min Order Value */}
              <Grid2 size={6}>
                <Typography variant="body2">Voucher Min Order Value</Typography>
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
                />
                <FieldErrorAlert
                  errors={errors}
                  fieldName={'voucher_min_order_value'}
                />
              </Grid2>

              {/* Voucher Applies */}
              <Grid2 size={12}>
                <Typography variant="body2">Voucher Applies</Typography>
                <Select
                  size="small"
                  fullWidth
                  defaultValue="ALL"
                  {...register('voucher_applies', {
                    required: FIELD_REQUIRED_MESSAGE
                  })}
                  error={!!errors['voucher_applies']}
                >
                  <MenuItem value="ALL">All</MenuItem>
                  <MenuItem value="SPECIFIC">Specific</MenuItem>
                </Select>
                <FieldErrorAlert
                  errors={errors}
                  fieldName={'voucher_applies'}
                />
              </Grid2>

              {voucherApplies === 'SPECIFIC' &&
                product &&
                Array.isArray(product) && (
                  <Grid2 size={12} sx={{ mt: 2 }}>
                    <SearchInput customHandleSearch={customHandleSearch} />
                    <Grid2 container spacing={2}>
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
                                : null
                            }}
                          >
                            <img
                              src={p.product_thumb}
                              alt={p.product_name}
                              style={{ maxWidth: '100px', marginRight: '10px' }}
                            />
                            <Typography variant="body2">
                              {p.product_name}
                            </Typography>
                          </Paper>
                        </Grid2>
                      ))}
                    </Grid2>
                  </Grid2>
                )}
            </Grid2>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWithReset} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default VoucherModal
