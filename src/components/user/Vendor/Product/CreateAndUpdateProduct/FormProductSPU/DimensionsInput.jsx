import { Box, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import FieldErrorAlert from '~/components/FieldErrorAlert'
import SkeletonLoaderInput from '~/components/SkeletonLoaderInput'
import TypographyLabel from '~/components/user/Common/TypographyLabel'
import {
  handleChangeProductHeight,
  handleChangeProductLength,
  handleChangeProductWeight,
  handleChangeProductWidth
} from '~/redux/formProduct.slice'
import {
  FIELD_REQUIRED_MESSAGE,
  NUMBER_RULE,
  NUMBER_RULE_MESSAGE
} from '~/utils/validators'

function DimensionsInput({ isLoading }) {
  const product_dimensions = useSelector(
    (state) => state.formProduct.product_dimensions
  )

  const {
    register,
    formState: { errors }
  } = useFormContext()

  const dispatch = useDispatch()

  const input = (
    <Box sx={{ display: 'flex', gap: '15px' }}>
      <Box>
        <TypographyLabel>Length</TypographyLabel>
        <TextField
          {...register('product_length', {
            required: FIELD_REQUIRED_MESSAGE,
            pattern: {
              value: NUMBER_RULE,
              message: NUMBER_RULE_MESSAGE
            },
            onChange: (e) => {
              dispatch(handleChangeProductLength(e.target.value))
            }
          })}
          error={!!errors['product_length']}
          fullWidth
          type="number"
          size="small"
          value={product_dimensions?.length}
        ></TextField>
        <FieldErrorAlert errors={errors} fieldName="product_length" />
      </Box>

      <Box>
        <TypographyLabel>Width</TypographyLabel>
        <TextField
          {...register('product_width', {
            required: FIELD_REQUIRED_MESSAGE,
            pattern: {
              value: NUMBER_RULE,
              message: NUMBER_RULE_MESSAGE
            },
            onChange: (e) => {
              dispatch(handleChangeProductWidth(e.target.value))
            }
          })}
          error={!!errors['product_width']}
          fullWidth
          type="number"
          size="small"
          value={product_dimensions?.width}
        ></TextField>
        <FieldErrorAlert errors={errors} fieldName="product_width" />
      </Box>

      <Box>
        <TypographyLabel>Height</TypographyLabel>
        <TextField
          {...register('product_height', {
            required: FIELD_REQUIRED_MESSAGE,
            pattern: {
              value: NUMBER_RULE,
              message: NUMBER_RULE_MESSAGE
            },
            onChange: (e) => {
              dispatch(handleChangeProductHeight(e.target.value))
            }
          })}
          error={!!errors['product_height']}
          fullWidth
          type="number"
          size="small"
          value={product_dimensions?.height}
        ></TextField>
        <FieldErrorAlert errors={errors} fieldName="product_height" />
      </Box>

      <Box>
        <TypographyLabel>Weight</TypographyLabel>
        <TextField
          {...register('product_weight', {
            required: FIELD_REQUIRED_MESSAGE,
            pattern: {
              value: NUMBER_RULE,
              message: NUMBER_RULE_MESSAGE
            },
            onChange: (e) => {
              dispatch(handleChangeProductWeight(e.target.value))
            }
          })}
          error={!!errors['product_weight']}
          fullWidth
          type="number"
          size="small"
          value={product_dimensions?.weight}
        ></TextField>
        <FieldErrorAlert errors={errors} fieldName="product_weight" />
      </Box>
    </Box>
  )
  return <Box>{isLoading ? <SkeletonLoaderInput /> : input}</Box>
}
export default DimensionsInput
