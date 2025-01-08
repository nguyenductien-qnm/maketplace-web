import * as React from 'react'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TypographyLabel from '~/components/user/Common/TypographyLabel'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeProductStatus } from '~/redux/formProduct.slice'
import SkeletonLoaderInput from '~/components/SkeletonLoaderInput'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import { useFormContext } from 'react-hook-form'
import FieldErrorAlert from '~/components/FieldErrorAlert'

export default function InputStatusProduct({ isLoading }) {
  const product_status = useSelector(
    (state) => state.formProduct.product_status
  )

  const dispatch = useDispatch()

  const {
    register,
    formState: { errors },
    setValue
  } = useFormContext()

  const handleChange = (e) => {
    const value = e.target.value
    setValue('product_status', value)
    dispatch(handleChangeProductStatus(value))
  }

  const input = (
    <Box>
      <TypographyLabel>Product Status</TypographyLabel>
      <Select
        value={product_status}
        error={!!errors['product_status']}
        {...register('product_status', {
          required: FIELD_REQUIRED_MESSAGE,
          onChange: handleChange
        })}
        fullWidth
        size="small"
      >
        <MenuItem value={'Draft'}>Draft</MenuItem>
        <MenuItem value={'Publish'}>Publish</MenuItem>
      </Select>
      <FieldErrorAlert errors={errors} fieldName="product_status" />
    </Box>
  )

  return <Box>{isLoading ? <SkeletonLoaderInput /> : input}</Box>
}
