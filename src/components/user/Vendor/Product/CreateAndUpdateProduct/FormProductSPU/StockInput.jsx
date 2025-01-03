import { Box, InputLabel, Skeleton, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import FieldErrorAlert from '~/components/FieldErrorAlert'
import TypographyLabel from '~/components/user/Common/TypographyLabel'
import { handleChangeSPUStock } from '~/redux/formProduct.slice'
import {
  FIELD_REQUIRED_MESSAGE,
  NUMBER_RULE,
  NUMBER_RULE_MESSAGE
} from '~/utils/validators'

function StockInput() {
  const product_stock = useSelector((state) => state.formProduct.product_stock)

  const {
    register,
    formState: { errors }
  } = useFormContext()

  const dispatch = useDispatch()
  return (
    <Box>
      {product_stock ? (
        <Box>
          <TypographyLabel>Product stock</TypographyLabel>
          <TextField
            {...register('product_stock', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: {
                value: NUMBER_RULE,
                message: NUMBER_RULE_MESSAGE
              },
              onChange: (e) => {
                dispatch(handleChangeSPUStock(e.target.value))
              }
            })}
            error={!!errors['product_stock']}
            fullWidth
            type="number"
            size="small"
            value={product_stock}
          ></TextField>
          <FieldErrorAlert errors={errors} fieldName="product_stock" />
        </Box>
      ) : (
        <Box>
          <Skeleton variant="text" width="20%" />
          <Skeleton variant="rounded" height={40} />
        </Box>
      )}
    </Box>
  )
}
export default StockInput
