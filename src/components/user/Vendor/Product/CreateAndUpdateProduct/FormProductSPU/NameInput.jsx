import { Box, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeSPUName } from '~/redux/formProduct.slice'
import TypographyLabel from '~/components/user/Common/TypographyLabel'
import { useFormContext } from 'react-hook-form'
import FieldErrorAlert from '~/components/FieldErrorAlert'
import SkeletonLoaderInput from '~/components/SkeletonLoaderInput'

import {
  FIELD_REQUIRED_MESSAGE,
  NAME_RULE,
  NAME_RULE_MESSAGE
} from '~/utils/validators'

function NameInput({ isLoading }) {
  const product_name = useSelector((state) => state.formProduct.product_name)
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors }
  } = useFormContext()


  const input = (
    <Box>
      <TypographyLabel>Product name</TypographyLabel>
      <TextField
        {...register('product_name', {
          required: FIELD_REQUIRED_MESSAGE,
          pattern: {
            value: NAME_RULE,
            message: NAME_RULE_MESSAGE
          },
          onChange: (e) => {
            dispatch(handleChangeSPUName(e.target.value))
          }
        })}
        error={!!errors['product_name']}
        value={product_name}
        fullWidth
        size="small"
      ></TextField>
      <FieldErrorAlert errors={errors} fieldName="product_name" />
    </Box>
  )

  return <Box>{isLoading ? <SkeletonLoaderInput /> : input}</Box>
}

export default NameInput
