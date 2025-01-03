import { Box, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeSPUName } from '~/redux/formProduct.slice'
import TypographyLabel from '~/components/user/Common/TypographyLabel'
import { useFormContext } from 'react-hook-form'
import FieldErrorAlert from '~/components/FieldErrorAlert'
import {
  FIELD_REQUIRED_MESSAGE,
  NAME_RULE,
  NAME_RULE_MESSAGE
} from '~/utils/validators'
import Skeleton from '@mui/material/Skeleton'

function NameInput() {
  const product_name = useSelector((state) => state.formProduct.product_name)
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors }
  } = useFormContext()
  return (
    <Box>
      {product_name ? (
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
          <FieldErrorAlert errors={errors} fiel dName="product_name" />
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
export default NameInput
