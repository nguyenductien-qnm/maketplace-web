import { Box, Chip, MenuItem, OutlinedInput, Select } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import TypographyLabel from '~/components/user/Common/TypographyLabel'
import { useFormContext } from 'react-hook-form'
import FieldErrorAlert from '~/components/FieldErrorAlert'
import { handleSelectedCategories } from '~/redux/formProduct.slice'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import SkeletonLoaderInput from '~/components/SkeletonLoaderInput'

function CategoriesSelected({ isLoading }) {
  const product_categories = useSelector(
    (state) => state.formProduct.product_categories
  )

  const dispatch = useDispatch()

  const {
    register,
    formState: { errors },
    setValue
  } = useFormContext()

  const categories = useSelector((state) => state.categories.categories)

  const handleChange = (e) => {
    const value = e.target.value
    setValue('product_categories', value)
    dispatch(handleSelectedCategories(value))
  }

  const input = (
    <Box>
      <TypographyLabel>Product categories</TypographyLabel>
      <Select
        {...register('product_categories', {
          required: FIELD_REQUIRED_MESSAGE,
          onChange: handleChange
        })}
        error={!!errors['product_categories']}
        size="small"
        value={product_categories}
        fullWidth
        multiple
        input={<OutlinedInput />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((category_code) => {
              const category = categories.find(
                (c) => c.category_code === category_code
              )
              return category ? (
                <Chip key={category_code} label={category.category_name} />
              ) : null
            })}
          </Box>
        )}
      >
        {categories.length > 0 &&
          categories.map((category) => (
            <MenuItem
              key={category.category_code}
              value={category.category_code}
            >
              {category.category_name}
            </MenuItem>
          ))}
      </Select>
      <FieldErrorAlert errors={errors} fieldName="product_categories" />
    </Box>
  )

  return <Box>{isLoading ? <SkeletonLoaderInput /> : input}</Box>
}
export default CategoriesSelected
