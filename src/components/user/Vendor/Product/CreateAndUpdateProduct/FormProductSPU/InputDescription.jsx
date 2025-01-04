import { Box, Skeleton, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import TypographyLabel from '~/components/user/Common/TypographyLabel'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import { handleChangeProductDescription } from '~/redux/formProduct.slice'
import { useParams } from 'react-router-dom'
import SkeletonLoaderInput from '~/components/SkeletonLoaderInput'

function InputDescription() {
  const { page } = useParams()

  const product_description = useSelector(
    (state) => state.formProduct.product_description
  )
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors }
  } = useFormContext()

  const input = (
    <Box>
      <TypographyLabel> Product Desciption</TypographyLabel>
      <TextField
        {...register('product_description', {
          required: FIELD_REQUIRED_MESSAGE,
          onChange: (e) => {
            dispatch(handleChangeProductDescription(e.target.value))
          }
        })}
        error={!!errors['product_description']}
        value={product_description}
        fullWidth
        multiline
        rows={10}
      ></TextField>
    </Box>
  )

  return (
    <Box>
      <Box>
        {page == 'create-product' ? (
          input
        ) : product_description ? (
          input
        ) : (
          <SkeletonLoaderInput />
        )}
      </Box>
    </Box>
  )
}
export default InputDescription
