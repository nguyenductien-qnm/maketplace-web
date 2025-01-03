import {
  Box,
  Chip,
  MenuItem,
  OutlinedInput,
  Select,
  Skeleton
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import TypographyLabel from '~/components/user/Common/TypographyLabel'
import { useFormContext } from 'react-hook-form'
import FieldErrorAlert from '~/components/FieldErrorAlert'
import { hanldeSelectedCategories } from '~/redux/formProduct.slice'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'

function CategoriesSelected() {
  const product_categories = useSelector(
    (state) => state.formProduct.product_categories
  )

  const dispatch = useDispatch()

  const {
    register,
    formState: { errors }
  } = useFormContext()

  const categories = useSelector((state) => state.categories.categories)
  return (
    <Box>
      {product_categories.length != 0 ? (
        <Box>
          <TypographyLabel>Product categories</TypographyLabel>
          <Select
            {...register('product_categories', {
              required: FIELD_REQUIRED_MESSAGE,
              onChange: (e) => {
                dispatch(hanldeSelectedCategories(e.target.value))
              }
            })}
            error={!!errors['product_categories']}
            size="small"
            value={product_categories}
            fullWidth
            multiple
            input={<OutlinedInput />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((id) => {
                  const category = categories.find((c) => c._id === id)
                  return category ? (
                    <Chip key={id} label={category.category_name} />
                  ) : null
                })}
              </Box>
            )}
          >
            {categories.length > 0 &&
              categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.category_name}
                </MenuItem>
              ))}
          </Select>
          <FieldErrorAlert errors={errors} fieldName="product_categories" />
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
export default CategoriesSelected
