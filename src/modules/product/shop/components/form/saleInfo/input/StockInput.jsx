import TextField from '@mui/material/TextField'
import {
  FIELD_REQUIRED_MESSAGE,
  PRODUCT_STOCK_MAX,
  PRODUCT_STOCK_MESSAGE,
  PRODUCT_STOCK_MIN
} from '~/utils/validators'
function StockInput({ register, name, error, helperText, ...props }) {
  return (
    <TextField
      fullWidth
      type="number"
      {...register(name, {
        required: FIELD_REQUIRED_MESSAGE,
        min: {
          value: PRODUCT_STOCK_MIN,
          message: PRODUCT_STOCK_MESSAGE
        },
        max: {
          value: PRODUCT_STOCK_MAX,
          message: PRODUCT_STOCK_MESSAGE
        },
        validate: (value) =>
          Number.isInteger(Number(value)) || 'Stock must be a whole number'
      })}
      error={!!error}
      helperText={helperText}
      {...props}
    />
  )
}
export default StockInput
