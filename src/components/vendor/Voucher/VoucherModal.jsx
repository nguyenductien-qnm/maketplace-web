import { useEffect, useState } from 'react'
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
import SearchInput from '~/components/common/SearchInput'
import { blue } from '@mui/material/colors'
import { useForm } from 'react-hook-form'
import {
  FIELD_REQUIRED_MESSAGE,
  NUMBER_RULE,
  NUMBER_RULE_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/common/FieldErrorAlert'
import ProductEmpty from '../Product/Display/ProductEmpty'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'

const VoucherModal = ({
  open,
  handleClose,
  action,
  voucher,
  handleCreateVoucher,
  handleUpdateVoucher
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset
  } = useForm({
    shouldUnregister: true
  })

  const voucherApplies = watch('voucher_applies')
  const voucherStatus = watch('voucher_status')
  const voucherType = watch('voucher_type')

  const [product, setProduct] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [selectProduct, setSelectProduct] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getProduct = async () => {
      if (voucherApplies === 'specific') {
        try {
          setLoading(true)
          const res = await queryProductByOwnerAPI({ status: 'PUBLIC' })
          setProduct(res?.data?.metadata)
        } finally {
          setLoading(false)
        }
      }
    }
    getProduct()
  }, [voucherApplies])

  useEffect(() => {
    if (voucher) {
      setSelectProduct(voucher?.voucher_product_ids)
      reset({
        voucher_name: voucher?.voucher_name,
        voucher_code: voucher?.voucher_code,
        voucher_type: voucher?.voucher_type,
        voucher_value: voucher?.voucher_value,
        voucher_quantity: voucher?.voucher_quantity,
        voucher_min_order_value: voucher?.voucher_min_order_value,
        voucher_applies: voucher?.voucher_applies,
        voucher_start_date: voucher?.voucher_start_date,
        voucher_end_date: voucher?.voucher_end_date,
        voucher_status: voucher?.voucher_status
      })
    } else {
      reset({})
    }
  }, [voucher])

  const handleSearch = async () => {
    try {
      setLoading(true)
      const res = await queryProductByOwnerAPI({
        status: 'PUBLIC',
        search: searchValue
      })
      setProduct(res?.data?.metadata)
    } finally {
      setLoading(false)
    }
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
    if (voucherApplies === 'specific') {
      data.voucher_product_ids = selectProduct
    } else {
      delete data.voucher_product_ids
    }
    let res = null
    if (action === 'CREATE') {
      res = await handleCreateVoucher(data)
    } else if (action === 'UPDATE') {
      data._id = voucher._id

      res = await handleUpdateVoucher(data)
    }
    if (res.status === 200) handleCloseWithReset()
  }

  const handleCloseWithReset = () => {
    reset()
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleCloseWithReset} fullWidth maxWidth="sm">
      <DialogTitle>
        {action === 'CREATE' && 'Create Voucher'}
        {action === 'UPDATE' && 'Update Voucher'}
      </DialogTitle>
      <form onSubmit={handleSubmit(createVoucher)}>
        <DialogContent sx={{ mt: '-20px' }}>
          <Box sx={{ mt: 2 }}>
            <Grid2 container spacing={2}>
              {/* Voucher Code */}
              <Grid2 size={6}>
                <Typography variant="body2">CODE Voucher</Typography>
                <TextField
                  placeholder="8 characters"
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
                  value={voucherType || ''}
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

              <Grid2 size={12}>
                <Typography variant="body2">Voucher status</Typography>
                <Select
                  size="small"
                  value={voucherStatus || ''}
                  fullWidth
                  {...register('voucher_status', {
                    required: FIELD_REQUIRED_MESSAGE
                  })}
                  error={!!errors['voucher_status']}
                >
                  <MenuItem value="public">Public</MenuItem>
                  <MenuItem value="private">Private</MenuItem>
                </Select>
                <FieldErrorAlert
                  errors={errors}
                  fieldName={'voucher_applies'}
                />
              </Grid2>

              {/* Voucher Applies */}
              <Grid2 size={12}>
                <Typography variant="body2">Voucher Applies</Typography>
                <Select
                  size="small"
                  fullWidth
                  value={voucherApplies || ''}
                  {...register('voucher_applies', {
                    required: FIELD_REQUIRED_MESSAGE
                  })}
                  error={!!errors['voucher_applies']}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="specific">Specific</MenuItem>
                </Select>
                <FieldErrorAlert
                  errors={errors}
                  fieldName={'voucher_applies'}
                />
              </Grid2>

              {voucherApplies === 'specific' && (
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
                            <Typography
                              variant="body2"
                              sx={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 5,
                                overflow: 'hidden'
                              }}
                            >
                              {p.product_name}
                            </Typography>
                          </Paper>
                        </Grid2>
                      ))}
                    </Grid2>
                  )}
                </Grid2>
              )}
            </Grid2>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            className="btn-shop-cancel-submit-voucher"
            onClick={handleCloseWithReset}
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

export default VoucherModal
