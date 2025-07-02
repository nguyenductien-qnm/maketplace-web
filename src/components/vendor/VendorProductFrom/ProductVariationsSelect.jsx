import {
  Box,
  Chip,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Typography
} from '@mui/material'
import { Controller } from 'react-hook-form'

const TypographyLabel = ({ children }) => (
  <Typography fontWeight={500} mb={1}>
    {children}
  </Typography>
)
const variations = ['Type', 'Size', 'Color', 'Material']

const ProductVariationsSelect = ({ methods, classifications }) => {
  return (
    <Box sx={{ marginTop: '20px' }}>
      <TypographyLabel>Product variations</TypographyLabel>
      <FormControl fullWidth>
        <Controller
          name="product_classifications"
          control={methods.control}
          render={({ field }) => (
            <Select
              {...field}
              size="small"
              multiple
              value={classifications}
              onChange={(event) =>
                methods.setValue('product_classifications', event.target.value)
              }
              input={<OutlinedInput id="select-multiple-chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {variations.map((variation) => (
                <MenuItem key={variation} value={variation}>
                  {variation}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
    </Box>
  )
}

export default ProductVariationsSelect
