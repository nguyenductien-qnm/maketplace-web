import {
  Box,
  Chip,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select
} from '@mui/material'
import { Controller } from 'react-hook-form'
import TypographyLabel from '~/components/common/TypographyLabel'

const variations = [
  'Type',
  'Size',
  'Color',
  'Material',
  'Capacity',
  'Power',
  'Configuration',
  'Edition',
  'Pack Size',
  'Style',
  'Weight',
  'Length',
  'Volume',
  'Flavor',
  'Scent',
  'Pattern',
  'Packaging'
]

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
