import { Box, InputLabel, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import FieldErrorAlert from '~/components/FieldErrorAlert'
import TypographyLabel from '~/components/user/Common/TypographyLabel'
import { handleChangeSPUPrice } from '~/redux/formProduct.slice'
import Skeleton from '@mui/material/Skeleton'
import SkeletonLoaderInput from '~/components/SkeletonLoaderInput'

import {
  FIELD_REQUIRED_MESSAGE,
  NUMBER_RULE,
  NUMBER_RULE_MESSAGE
} from '~/utils/validators'

function PriceInput({ page }) {
  const product_price = useSelector((state) => state.formProduct.product_price)
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors }
  } = useFormContext()

  const input = (
    <Box>
      <TypographyLabel>Product price</TypographyLabel>
      <TextField
        {...register('product_price', {
          required: FIELD_REQUIRED_MESSAGE,
          pattern: {
            value: NUMBER_RULE,
            message: NUMBER_RULE_MESSAGE
          },
          onChange: (e) => dispatch(handleChangeSPUPrice(e.target.value))
        })}
        type="number"
        error={!!errors['product_price']}
        fullWidth
        size="small"
        value={product_price}
      ></TextField>
      <FieldErrorAlert errors={errors} fieldName="product_price" />
    </Box>
  )

  return (
    <Box>
      {page == 'create-product' ? (
        input
      ) : product_price ? (
        input
      ) : (
        <SkeletonLoaderInput />
      )}
    </Box>
  )
}
export default PriceInput
